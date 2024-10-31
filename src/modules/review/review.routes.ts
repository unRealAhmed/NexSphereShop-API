import express from 'express'
import { extractUserFromToken } from '../../middlewares/auth'
import { validate } from '../../middlewares/validation.middleware'
import { createRoute } from '../../shared/helpers/routeHelper'
import { reviewSchemas } from '../../validations'
import { ReviewController } from './review.controller'

const router = express.Router()
const reviewController = new ReviewController()

// 1. Create Review
createRoute(
    router,
    'post',
    '/:productId',
    extractUserFromToken,
    validate(reviewSchemas.createReview),
    reviewController.createReview.bind(reviewController),
)

// 2. Get All Reviews
createRoute(
    router,
    'get',
    '/',
    reviewController.getAllReviews.bind(reviewController),
)

// 3. Find One Review by ID
createRoute(
    router,
    'get',
    '/:id',
    validate(reviewSchemas.getReviewById),
    reviewController.getReview.bind(reviewController),
)

// 4. Update Review
createRoute(
    router,
    'patch',
    '/:id',
    extractUserFromToken,
    validate(reviewSchemas.updateReview),
    reviewController.updateReview.bind(reviewController),
)

// 5. Delete Review
createRoute(
    router,
    'delete',
    '/:id',
    extractUserFromToken,
    reviewController.deleteReview.bind(reviewController),
)

export default router
