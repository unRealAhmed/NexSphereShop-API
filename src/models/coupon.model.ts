import mongoose, { Model, Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'
import User from './user.model'

export interface ICoupon extends AbstractDocument {
    code: string
    startDate: Date
    endDate: Date
    discount: number
    createdBy: ID
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
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: User.name,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Coupon: Model<ICoupon> = mongoose.model<ICoupon>('Coupon', couponSchema)

export default Coupon
