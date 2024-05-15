import mongoose, { Model, Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'
import User from './user.model'

export interface IBrand extends AbstractDocument {
    name: string
    createdBy: ID
    image?: string
}

const brandSchema = new mongoose.Schema<IBrand>(
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
            required: false, // for now
        },
    },
    { timestamps: true },
)

const Brand: Model<IBrand> = mongoose.model<IBrand>('Brand', brandSchema)

export default Brand
