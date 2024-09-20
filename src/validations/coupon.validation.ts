import { z } from 'zod'
import { IDSchema } from './id.schema'

export const couponValidationSchema = z.object({
    code: z.string().min(1, 'Coupon code is required.'),
    startDate: z
        .date()
        .refine(date => !isNaN(date.getTime()), 'Start date is required.'),
    endDate: z
        .date()
        .refine(date => !isNaN(date.getTime()), 'End date is required.'),
    discount: z.number().positive('Discount amount is required.'),
    user: IDSchema,
})
