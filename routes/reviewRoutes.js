const express = require('express');
const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setReviewUserIds,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');
const validationMiddleware = require('../middleware/validationFunction');
const {
  reviewValidationSchema,
} = require('../validation/reviewValidation');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(
    restrictTo('user'),
    setReviewUserIds,
    validationMiddleware(reviewValidationSchema),
    createReview
  );

router
  .route('/:id')
  .get(getReview)
  .patch(
    validationMiddleware(reviewValidationSchema),
    updateReview
  )
  .delete(
    deleteReview
  );

module.exports = router;
