/* eslint-disable no-shadow */
require("dotenv").config({ path: '../config.env' });
const { Stripe } = require('stripe')
const asyncHandler = require('../utils/asyncHandler')
const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Product = require('../models/productModel')
const AppError = require('../utils/appErrors');
const Coupon = require('../models/couponModel');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const endPointSecret = process.env.STRIPE_ENDPOINT_SECRET

exports.createOrder = asyncHandler(async (req, res, next) => {

  //get teh coupon
  const { coupon } = req.query;

  const couponFound = await Coupon.findOne({
    code: coupon?.toUpperCase(),
  });
  if (couponFound?.isExpired) {
    throw new Error("Coupon has expired");
  }
  if (!couponFound) {
    throw new Error("Coupon does exists");
  }

  const discount = couponFound.discount / 100;

  const { orderItems, shippingAddress, totalPrice } = req.body;
  if (!orderItems || orderItems.length < 1) {
    return next(new AppError('No cart items provided', 400));
  }

  //Find the user
  const user = await User.findById(req.user.id);
  //Check if user has shipping address
  if (!user?.hasShippingAddress) {
    return next(new AppError("Please provide shipping address"));
  }

  const order = await Order.create({
    user: user._id,
    orderItems,
    shippingAddress,
    totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
  });

  //Update the product qty
  const products = await Product.find({ _id: { $in: orderItems } });
  orderItems.map(async (order) => {
    const product = products?.find((product) => product?._id?.toString() === order?._id?.toString());
    if (product) {
      product.totalSold += order.qty;
    }
    await product.save();
  });

  //push order into user
  user.orders.push(order._id);
  await user.save({ validateBeforeSave: false });

  //convert order items to have same structure that stripe need
  const convertedOrders = orderItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item?.name,
        description: item?.description,
      },
      unit_amount: item.price * 100,
    },
    quantity: item?.qty,
  }));
  const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderId: JSON.stringify(order?._id),
    },
    mode: "payment",
    success_url: "http://localhost:8000/success",
    cancel_url: "http://localhost:8000/cancel",
  });
  res.send({ url: session.url });

})

exports.getAllorders = asyncHandler(async (req, res, next) => {
  //find all orders
  const orders = await Order.find().populate("user");
  res.json({
    success: true,
    message: "All orders",
    orders,
  });
});

exports.getSingleOrder = asyncHandler(async (req, res, next) => {
  //get the id from params
  const { id } = req.params
  const order = await Order.findById(id);
  //send response
  res.status(200).json({
    success: true,
    message: "Single order",
    order,
  });
});

exports.updateOrder = asyncHandler(async (req, res) => {
  //get the id from params
  const { id } = req.params
  //update
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Order updated",
    updatedOrder,
  });
});

exports.webhookCheckout = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endPointSecret);
    console.log("event");
  } catch (err) {
    console.log("err", err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  if (event.type === "checkout.session.completed") {
    //update the order
    const session = event.data.object;
    const { orderId } = session.metadata;
    const paymentStatus = session.payment_status;
    const paymentMethod = session.payment_method_types[0];
    const totalAmount = session.amount_total;
    const { currency } = session
    //find the order
    const order = await Order.findByIdAndUpdate(
      JSON.parse(orderId),
      {
        totalPrice: totalAmount / 100,
        currency,
        paymentMethod,
        paymentStatus,
      },
      {
        new: true,
      }
    );
    console.log(order);
  } else {
    return;
  }
  response.send();
}

exports.getOrderStats = asyncHandler(async (req, res) => {
  //get order stats
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        minimumSale: {
          $min: "$totalPrice",
        },
        totalSales: {
          $sum: "$totalPrice",
        },
        maxSale: {
          $max: "$totalPrice",
        },
        avgSale: {
          $avg: "$totalPrice",
        },
      },
    },
  ]);
  //get the date
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const saleToday = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);
  //send response
  res.status(200).json({
    success: true,
    message: "Sum of orders",
    orders,
    saleToday,
  });
});