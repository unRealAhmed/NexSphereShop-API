const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const { getAll, getOne, updateOne, deleteOne } = require("./resourceController");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appErrors");

//
exports.getAllReviews = getAll(Review)
exports.getReview = getOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);

exports.setReviewUserIds = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = asyncHandler(async (req, res, next) => {
  const productId = req.body.product;
  const { user } = req;

  // Check if the product ID is present in the request body
  if (!req.body.product) {
    throw new AppError('Product ID is required for creating a review.', 400);
  }
  const productFound = await Product.findById(productId)
  if (!productFound) {
    return next(new AppError(("Product Not Found")))
  }
  //check
  // Check if the user has already reviewed the product
  const existingReview = await Review.findOne({ product: productId, user: user._id });

  if (existingReview) {
    throw new AppError('You have already reviewed this product.', 400);
  }

  // If not, proceed with creating the review
  const newReview = await Review.create({
    ...req.body,
    user: user._id,
    product: productId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});