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

const router = express.Router({ mergeParams: true });
// Middleware: Protect all routes below this point
router.use(protect);

// Routes for handling reviews
router
  .route('/')
  .get(getAllReviews)
  .post(
    restrictTo('user'),
    setReviewUserIds,
    createReview
  );

router
  .route('/:id')
  .get(getReview)
  .patch(
    updateReview
  )
  .delete(
    deleteReview
  );

module.exports = router;