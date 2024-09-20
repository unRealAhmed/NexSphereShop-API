import mongoose, { Model, Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'
import Brand from './brand.model'
import Category from './category.model'
import User from './user.model'

export interface IProduct extends AbstractDocument {
    name: string
    description: string
    brand: ID
    category: ID
    sizes: string[]
    colors: string[]
    averageRating: number
    feedbacks: number
    user: ID
    images: string[]
    price: number
    totalQuantity: number
    totalSoldQuantity: number
}

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        brand: { type: Schema.Types.ObjectId, ref: Brand.name, required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: Category.name,
            required: true,
        },
        sizes: {
            type: [String],
            enum: ['S', 'M', 'L', 'XL', 'XXL'],
            required: true,
        },
        colors: { type: [String], required: true },
        averageRating: {
            type: Number,
            default: 0,
            set: (val: number) => +val.toFixed(1),
        },
        feedbacks: { type: Number, default: 0 },
        user: { type: Schema.Types.ObjectId, ref: User.name, required: true },
        images: [
            { type: String, required: true, default: '/uploads/example.jpeg' },
        ],
        price: { type: Number, required: true },
        totalQuantity: { type: Number, required: true },
        totalSoldQuantity: { type: Number, default: 0 },
    },
    { timestamps: true },
)

const Product: Model<IProduct> = mongoose.model<IProduct>(
    'Product',
    productSchema,
)
export default Product
