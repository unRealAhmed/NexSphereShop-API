import { z } from 'zod'
import { IDSchema } from './id.schema'

// ----------------------
// Shared Schemas
// ----------------------

const codeSchema = z
    .string()
    .min(1, { message: 'Coupon code is required.' })
    .max(50, { message: 'Coupon code must not exceed 50 characters.' })

const discountSchema = z
    .number()
    .nonnegative({ message: 'Discount must be a non-negative number.' })
    .max(100, { message: 'Discount must not exceed 100%.' })

const isoDateSchema = (fieldName: string) =>
    z.string().refine(date => !isNaN(Date.parse(date)), {
        message: `${fieldName} must be a valid ISO date.`,
    })
// ----------------------
// Specific Schemas
// ----------------------

const createCouponSchema = z.object({
    code: codeSchema,
    startDate: isoDateSchema('Start date'),
    endDate: isoDateSchema('End date'),
    discount: discountSchema,
})

const updateCouponSchema = z.object({
    code: codeSchema.optional(),
    startDate: isoDateSchema('Start date').optional(),
    endDate: isoDateSchema('End date').optional(),
    discount: discountSchema.optional(),
    isActive: z.boolean().optional(),
})

const applyCouponSchema = z.object({
    code: codeSchema,
})

// ----------------------
// Aggregated Coupon Schemas
// ----------------------

export const couponSchemas = {
    createCoupon: {
        body: createCouponSchema,
    },
    updateCoupon: {
        body: updateCouponSchema,
    },
    applyCoupon: {
        params: applyCouponSchema,
    },
    findCouponById: {
        params: z.object({
            id: IDSchema,
        }),
    },
}
