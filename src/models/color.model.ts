import mongoose, { Model, Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'
import User from './user.model'

export interface IColor extends AbstractDocument {
    name: string
    user: ID
}

const colorSchema = new Schema<IColor>(
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
    },
    { timestamps: true },
)

const Color: Model<IColor> = mongoose.model<IColor>('Color', colorSchema)

export default Color
