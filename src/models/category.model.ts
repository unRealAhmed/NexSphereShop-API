import mongoose, { Model, Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'
import Product from './product.model'
import User from './user.model'

export interface ICategory extends AbstractDocument {
    name: string
    user: ID
    image?: string
    products?: ID[]
}

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: User.name,
            required: true,
        },
        image: {
            type: String,
            // required: false, // Removed the required validation
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: Product.name,
            },
        ],
    },
    { timestamps: true },
)

const Category: Model<ICategory> = mongoose.model<ICategory>(
    'Category',
    categorySchema,
)

export default Category
