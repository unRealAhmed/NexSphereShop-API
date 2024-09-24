import mongoose, { Model, Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'

export interface ICoupon extends AbstractDocument {
    code: string
    startDate: Date
    endDate: Date
    discount: number
    user: ID
}

const couponSchema = new Schema<ICoupon>(
    {
        code: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
)

const Coupon: Model<ICoupon> = mongoose.model<ICoupon>('Coupon', couponSchema)

export default Coupon
