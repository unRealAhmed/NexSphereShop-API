import { z } from 'zod'
import { IDSchema } from './id.schema'

export const orderItemSchema = z.object({
    product: IDSchema,
    quantity: z.number().min(1, 'Quantity must be at least 1.'),
    price: z.number().min(0, 'Price must be greater than or equal to 0.'),
})

export const shippingAddressSchema = z.object({
    address: z.string().min(1, 'Address is required.'),
    city: z.string().min(1, 'City is required.'),
    postalCode: z.string().min(1, 'Postal code is required.'),
    country: z.string().min(1, 'Country is required.'),
})

export const orderValidationSchema = z.object({
    user: IDSchema,
    orderItems: z.array(orderItemSchema).nonempty('Order items are required.'),
    shippingAddress: shippingAddressSchema,
    orderNumber: z.string().optional(),
    paymentStatus: z.enum(['Not paid', 'Paid', 'Failed']).optional(),
    paymentMethod: z.string().optional(),
    totalPrice: z.number().min(0, 'Total price must be at least 0.').optional(),
    currency: z.string().optional(),
    status: z
        .enum(['pending', 'processing', 'shipped', 'delivered'])
        .optional(),
    deliveredAt: z.date().optional(),
})
