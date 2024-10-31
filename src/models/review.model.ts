import mongoose, { Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'
import Order from './order.model' // Import the Order model
import Product from './product.model'
import User from './user.model'

export interface IReview extends AbstractDocument {
    createdBy: ID
    product: ID
    order: ID
    review: string
    rating: number
}

const reviewSchema = new Schema<IReview>(
    {
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: User.name,
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: Product.name,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        order: {
            type: Schema.Types.ObjectId,
            ref: Order.name,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

reviewSchema.index({ product: 1, createdBy: 1 }, { unique: true })

const Review = mongoose.model<IReview>('Review', reviewSchema)

export default Review
