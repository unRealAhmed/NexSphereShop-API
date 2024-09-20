import mongoose, { Model, Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'
import Order from './order.model'

export interface IUser extends AbstractDocument {
    fullname: string
    email: string
    password: string
    passwordConfirm: string
    role: 'admin' | 'user'
    active: boolean
    orders: ID[]
    // wishLists: ID[]
    hasShippingAddress: boolean
    shippingAddress?: {
        firstName?: string
        lastName?: string
        address?: string
        city?: string
        postalCode?: string
        province?: string
        country?: string
        phone?: string
    }
    passwordChangedAt?: Date
    passwordResetToken?: string
    passwordResetExpires?: Date
}

const userSchema = new Schema<IUser>(
    {
        fullname: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: true,
            validate: {
                validator: function (el: string) {
                    return el === this.password
                },
            },
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: Order.name,
            },
        ],
        // wishLists: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: Wishlist.name,
        //     },
        // ],
        hasShippingAddress: {
            type: Boolean,
            default: false,
        },
        shippingAddress: {
            firstName: { type: String },
            lastName: { type: String },
            address: { type: String },
            city: { type: String },
            postalCode: { type: String },
            province: { type: String },
            country: { type: String },
            phone: { type: String },
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    },
)

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default User
