import { Request } from 'express'
import { IReview } from '../../models'
import Product from '../../models/product.model'
import { ReviewRepository } from '../../repositories'
import { BadRequestError, NotFoundError } from '../../shared/errors/errors'
import { ID } from '../../shared/types'
import { ProductService } from '../product/product.service'

export class ReviewService {
    private reviewRepository: ReviewRepository
    private productService: ProductService

    constructor() {
        this.reviewRepository = new ReviewRepository()
        this.productService = new ProductService()
    }

    async getAllReviews(filter: Record<string, any> = {}) {
        return this.reviewRepository.findAll({
            filter,
            populate: [
                { path: 'user', select: '_id fullname' },
                { path: 'product', select: '_id name' },
            ],
        })
    }

    async getReview(id: ID) {
        return this.reviewRepository.findById(id)
    }

    async createReview(req: Request, product: ID, user: ID) {
        const { review, rating } = req.body

        const productFound = await Product.findById(product)
        if (!productFound) {
            throw new NotFoundError('Product not found')
        }

        const existingReview = await this.reviewRepository.exists({
            user,
            product,
        })
        if (existingReview) {
            throw new BadRequestError('You have already reviewed this product.')
        }

        const newReview = await this.reviewRepository.create({
            user,
            product,
            review,
            rating,
        })

        await this.calcAverageRatings(product)

        return newReview
    }

    async updateReview(id: ID, updateData: Partial<IReview>) {
        const updatedReview = await this.reviewRepository.updateById(
            id,
            updateData,
        )

        await this.calcAverageRatings(updatedReview.product)

        return updatedReview
    }

    async deleteReview(id: ID) {
        const deletedReview = await this.reviewRepository.deleteById(id)

        await this.calcAverageRatings(deletedReview.product)

        return deletedReview
    }

    async calcAverageRatings(productId: ID) {
        const stats = await this.reviewRepository.calcAverageRatings(productId)

        if (stats.length > 0) {
            await this.productService.updateProduct(productId, {
                feedbacks: stats[0].nRating,
                averageRating: stats[0].avgRating,
            })
        } else {
            await this.productService.updateProduct(productId, {
                feedbacks: 0,
                averageRating: 0,
            })
        }
    }
}
