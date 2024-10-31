import { z } from 'zod'
import { IDSchema } from './id.schema'

// ----------------------
// Shared Schemas
// ----------------------

const reviewSchema = z
    .string()
    .min(3, { message: 'Review must be at least 3 characters long.' })
    .max(500, { message: 'Review must not exceed 500 characters.' })

const ratingSchema = z
    .number()
    .min(1, { message: 'Rating must be at least 1.' })
    .max(5, { message: 'Rating must not exceed 5.' })

// ----------------------
// Specific Schemas
// ----------------------

const createReviewSchema = z.object({
    review: reviewSchema,
    rating: ratingSchema,
})

const updateReviewSchema = z.object({
    review: reviewSchema.optional(),
    rating: ratingSchema.optional(),
})

// ----------------------
// Aggregated Review Schemas
// ----------------------

export const reviewSchemas = {
    createReview: {
        body: createReviewSchema,
        params: z.object({
            productId: IDSchema,
        }),
    },
    updateReview: {
        body: updateReviewSchema,
        params: z.object({
            id: IDSchema,
        }),
    },
    getReviewById: {
        params: z.object({
            id: IDSchema,
        }),
    },
}
