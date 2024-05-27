import mongoose, { Model, Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'
import User from './user.model'

export interface ICategory extends AbstractDocument {
    name: string
    createdBy: ID
    image?: string
    deleted: boolean
}

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: User.name,
            required: true,
        },
        image: {
            type: String,
            // required: false, // Removed the required validation
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
)

const Category: Model<ICategory> = mongoose.model<ICategory>(
    'Category',
    categorySchema,
)

export default Category
