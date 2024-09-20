import mongoose, { Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'

export interface IReview extends AbstractDocument {
    user: ID
    product: ID
    review: string
    rating: number
}

const reviewSchema = new Schema<IReview>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
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
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
)

// Unique index to ensure one review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true })

const Review = mongoose.model<IReview>('Review', reviewSchema)

export default Review
