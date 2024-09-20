import { z } from 'zod'
import { IDSchema } from './id.schema'

export const reviewSchema = z.object({
    user: IDSchema,
    product: IDSchema,
    review: z.string().min(1, 'Review message is required.'),
    rating: z
        .number()
        .min(1, 'Rating must be at least 1.')
        .max(5, 'Rating must not exceed 5.'),
})

export type ReviewValidation = z.infer<typeof reviewSchema>
