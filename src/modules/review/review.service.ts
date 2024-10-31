import Product from '../../models/product.model'
import { ReviewRepository } from '../../repositories'
import { ErrorMessages } from '../../shared/constants/errorMessages'
import { BadRequestError, NotFoundError } from '../../shared/errors/errors'
import { ID } from '../../shared/types'
import { ProductService } from '../product/product.service'
import { CreateReviewDTO, UpdateReviewDTO } from './review.dtos'

export class ReviewService {
    private reviewRepository: ReviewRepository
    private productService: ProductService
    // private orderRepository: OrderRepository

    constructor() {
        this.reviewRepository = new ReviewRepository()
        this.productService = new ProductService()
        // this.orderRepository = new OrderRepository()
    }

    async getAllReviews(filter: Record<string, any> = {}) {
        return this.reviewRepository.findAll({
            filter,
            populate: [
                { path: 'createdBy', select: '_id fullname' },
                { path: 'product', select: '_id name' },
            ],
        })
    }

    async getReview(id: ID) {
        return this.reviewRepository.findById(id)
    }

    async createReview(body: CreateReviewDTO, product: ID, user: ID) {
        const { review, rating } = body

        const productFound = await Product.findById(product)
        if (!productFound) {
            throw new NotFoundError(ErrorMessages.PRODUCT_NOT_FOUND)
        }

        // const userOrder = await this.orderRepository.findOne({
        //     user: user,
        //     product: product,
        // })
        // if (!userOrder) {
        //     throw new BadRequestError(
        //         ErrorMessages.YOU_HAVE_NOT_PURCHASED_THIS_PRODUCT,
        //     )
        // }

        const existingReview = await this.reviewRepository.exists({
            createdBy: user,
            product,
        })
        if (existingReview) {
            throw new BadRequestError(
                ErrorMessages.YOU_HAVE_ALREADY_REVIEWED_THIS_PRODUCT,
            )
        }

        const newReview = await this.reviewRepository.create({
            createdBy: user,
            product,
            review,
            rating,
            // order: user,
        })

        await this.calcAverageRatings(product)

        return newReview
    }

    async updateReview(id: ID, userId: ID, body: UpdateReviewDTO) {
        const review = await this.reviewRepository.findOne({
            _id: id,
            createdBy: userId,
        })

        if (!review) {
            throw new NotFoundError(ErrorMessages.REVIEW_NOT_FOUND)
        }

        const updatedReview = await this.reviewRepository.updateById(id, body)
        await this.calcAverageRatings(updatedReview.product)

        return updatedReview
    }

    async deleteReview(id: ID, userId: ID) {
        const review = await this.reviewRepository.findOne({
            _id: id,
            createdBy: userId,
        })

        if (!review) {
            throw new NotFoundError(ErrorMessages.REVIEW_NOT_FOUND)
        }

        const deletedReview = await this.reviewRepository.deleteById(id)
        await this.calcAverageRatings(deletedReview.product)

        return deletedReview
    }

    async calcAverageRatings(productId: ID) {
        const stats = await this.reviewRepository.calcAverageRatings(productId)

        const updateData = {
            feedbacks: stats.length > 0 ? stats[0].nRating : 0,
            averageRating: stats.length > 0 ? stats[0].avgRating : 0,
        }

        await this.productService.updateProductRatings(productId, updateData)
    }
}
