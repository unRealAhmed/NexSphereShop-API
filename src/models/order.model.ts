import mongoose, { Model, Schema } from 'mongoose'
import { ID } from '../shared/types'
import { AbstractDocument } from './abstract.model'
import Product from './product.model'
import User from './user.model'

interface IOrderItem {
    product: ID
    quantity: number
    price: number
}

interface IShippingAddress {
    address: string
    city: string
    postalCode: string
    country: string
}

export interface IOrder extends AbstractDocument {
    user: ID
    orderItems: IOrderItem[]
    shippingAddress: IShippingAddress
    orderNumber: string
    paymentStatus: string
    paymentMethod: string
    totalPrice: number
    currency: string
    status: 'pending' | 'processing' | 'shipped' | 'delivered'
    deliveredAt?: Date
}

const randomTxt = Math.random().toString(36).substring(7).toUpperCase()
const randomNumbers = Math.floor(1000 + Math.random() * 90000)

const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: User.name,
            required: true,
        },
        orderItems: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: Product.name,
                    required: true,
                },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        orderNumber: {
            type: String,
            default: randomTxt + randomNumbers,
        },
        paymentStatus: {
            type: String,
            default: 'Not paid',
        },
        paymentMethod: {
            type: String,
            default: 'Not specified',
        },
        totalPrice: {
            type: Number,
            default: 0.0,
        },
        currency: {
            type: String,
            default: 'Not specified',
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'processing', 'shipped', 'delivered'],
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
)

const Order: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema)

export default Order
