import mongoose, { Model, Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'

export interface IBrand extends AbstractDocument {
    name: string
    user: ID
    products?: ID[]
}

const brandSchema = new mongoose.Schema<IBrand>(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
    },
    { timestamps: true },
)

const Brand: Model<IBrand> = mongoose.model<IBrand>('Brand', brandSchema)

export default Brand
