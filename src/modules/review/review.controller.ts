import { NextFunction, Request, Response } from 'express'
import { convertToObjectId } from '../../shared/helpers/convertToObjectId'
import { ReviewService } from './review.service'

export class ReviewController {
    private reviewService: ReviewService

    constructor() {
        this.reviewService = new ReviewService()
    }

    async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.userId
            const productId = req.params.productId

            const review = await this.reviewService.createReview(
                req.body,
                convertToObjectId(productId),
                userId!,
            )
            return res.status(201).json(review)
        } catch (error) {
            next(error)
        }
    }

    async getAllReviews(req: Request, res: Response, next: NextFunction) {
        try {
            const reviews = await this.reviewService.getAllReviews(req.query)
            return res.status(200).json(reviews)
        } catch (error) {
            next(error)
        }
    }

    async getReview(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const review = await this.reviewService.getReview(
                convertToObjectId(id),
            )

            return res.status(200).json(review)
        } catch (error) {
            next(error)
        }
    }

    async updateReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.id
            const userId = req.user?.userId

            const updatedReview = await this.reviewService.updateReview(
                convertToObjectId(reviewId),
                userId!,
                req.body,
            )

            return res.status(200).json(updatedReview)
        } catch (error) {
            next(error)
        }
    }

    async deleteReview(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.id
            const userId = req.user?.userId

            await this.reviewService.deleteReview(
                convertToObjectId(reviewId),
                userId!,
            )
            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}
