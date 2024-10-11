import mongoose, { Model, Schema } from 'mongoose'
import { ID } from '../shared/types'
import {
    ProductStatusEnum,
    ProductStatusType,
    ProductStatusValues,
} from '../shared/types/product.status'
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
    images?: string[]
    price: number
    originalPrice: number
    totalQuantity: number
    totalSoldQuantity: number
    discount?: number
    lowStockThreshold?: number
    status: ProductStatusType
    createdBy: ID
    updatedBy: ID
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
        images: [
            { type: String, required: false, default: '/uploads/example.jpeg' },
        ],
        price: { type: Number, required: true },
        originalPrice: { type: Number, required: true },
        totalQuantity: { type: Number, required: true },
        totalSoldQuantity: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        lowStockThreshold: { type: Number },
        status: {
            type: String,
            enum: ProductStatusValues,
            default: ProductStatusEnum.AVAILABLE,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: User.name,
            required: false,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: User.name,
            required: false,
        },
    },
    { timestamps: true },
)

const Product: Model<IProduct> = mongoose.model<IProduct>(
    'Product',
    productSchema,
)
export default Product
