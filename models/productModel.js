const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for the product.'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for the product.'],
    },
    brand: {
      type: String,
      required: [true, 'Please provide a brand for the product.'],
    },
    category: {
      type: String,
      ref: 'Category',
      required: [true, 'Please provide a category for the product.'],
    },
    sizes: {
      type: [String],
      enum: {
        values: ['S', 'M', 'L', 'XL', 'XXL'],
        message: 'Invalid size. Choose from S, M, L, XL, XXL.',
      },
      required: [true, 'Please provide at least one size for the product.'],
    },
    colors: {
      type: [String],
      required: [true, 'Please provide at least one color for the product.'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please provide a user ID for the product.'],
      ref: 'User',
    },
    images: [
      {
        type: String,
        required: [true, 'Please provide at least one image for the product.'],
        default: '/uploads/example.jpeg'
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    price: {
      type: Number,
      required: [true, 'Please provide a price for the product.'],
    },
    totalQty: {
      type: Number,
      required: [true, 'Please provide the total quantity for the product.'],
    },
    totalSold: {
      type: Number,
      required: [true, 'Please provide the total sold quantity for the product.'],
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
