const mongoose = require('mongoose')

const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User information is required for the order."],
    },
    orderItems: [
      {
        type: Object,
        required: [true, "Order items are required."],
      },
    ],
    shippingAddress: {
      type: Object,
      required: [true, "Shipping address is required."],
    },
    orderNumber: {
      type: String,
      default: randomTxt + randomNumbers,
    },
    // for stripe payment
    paymentStatus: {
      type: String,
      default: "Not paid",
    },
    paymentMethod: {
      type: String,
      default: "Not specified",
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    currency: {
      type: String,
      default: "Not specified",
    },
    // For admin
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema)

module.exports = Order