require("dotenv").config({ path: '../config.env' });
// const { Stripe } = require('stripe')
const asyncHandler = require('../utils/asyncHandler')
const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Product = require('../models/productModel')
const AppError = require('../utils/appErrors');


// const stripe = new Stripe()

exports.createOrder = asyncHandler(async (req, res, next) => {
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
    totalPrice,
  });

  //Update the product qty
  const products = await Product.find({ _id: { $in: orderItems } });
  // eslint-disable-next-line no-shadow
  orderItems.map(async (order) => {
    // eslint-disable-next-line no-shadow
    const product = products?.find((product) => product?._id?.toString() === order?._id?.toString());
    if (product) {
      product.totalSold += order.qty;
    }
    await product.save();
  });

  //push order into user
  user.orders.push(order._id);
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    order
  })

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