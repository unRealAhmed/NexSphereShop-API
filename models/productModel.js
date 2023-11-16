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
    averageRating: {
      type: Number,
      default: 0,
      set: (val) => +val.toFixed(1),
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
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
    toObject: { virtuals: true }
  }
);

productSchema.virtual("qtyLeft").get(function () {
  const product = this;
  return product.totalQty - product.totalSold;
});

// Create a virtual field for reviews associated with the product
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

// Pre middleware to populate user and reviews fields
productSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: 'user',
    select: 'fullname',
  }).populate({
    path: 'reviews',
    select: 'review rating',
  })
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
