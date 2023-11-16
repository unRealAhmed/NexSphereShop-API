const mongoose = require('mongoose')
const Product = require('./productModel')

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
    review: {
      type: String,
      required: [true, "Please add a message for your review."],
    },
    rating: {
      type: Number,
      required: [true, "Please add a rating between 1 and 5."],
      min: [1, "Rating must be at least 1."],
      max: [5, "Rating must not exceed 5."],
    },
  },
  {
    timestamps: true, toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Virtual populate for user and exclude updatedAt field
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'fullname',
  }).select('-updatedAt');
  next();
});

// Static method to calculate and update average ratings for a product
reviewSchema.statics.calcAverageRatings = async function (productId) {
  // Aggregate reviews to calculate average ratings
  const stats = await this.aggregate([
    {
      $match: { product: productId }
    },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  // Update the product with calculated ratings
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      numOfReviews: stats[0].nRating,
      averageRating: stats[0].avgRating
    });
  } else {
    // If there are no reviews, set default ratings
    await Product.findByIdAndUpdate(productId, {
      numOfReviews: 0,
      averageRating: 0
    });
  }
};

reviewSchema.post('save', function () {
  // Calculate and update ratings when a review is saved
  this.constructor.calcAverageRatings(this.product);
});

// // Middleware executed before finding and updating a review, stores original review
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.originalReview = await this.model.findOne(this.getQuery()); // retrieve the current review
  next();
});

// // Middleware executed after finding and updating a review, calculates and updates ratings
reviewSchema.post(/^findOneAnd/, async function () {
  await this.originalReview.constructor.calcAverageRatings(this.originalReview.product);
});

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
