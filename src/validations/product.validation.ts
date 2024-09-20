import { z } from 'zod'
import { IDSchema } from './id.schema'

export const productSchemaZod = z.object({
    name: z.string().min(1, 'Please provide a name for the product.'),
    description: z
        .string()
        .min(1, 'Please provide a description for the product.'),
    brand: IDSchema,
    category: IDSchema,
    sizes: z.array(z.enum(['S', 'M', 'L', 'XL', 'XXL'])),
    colors: z.array(z.string()).min(1, 'Please provide at least one color.'),
    averageRating: z
        .number()
        .optional()
        .default(0)
        .refine(val => val >= 0 && val <= 5, {
            message: 'Rating must be between 0 and 5.',
        }),
    feedback: z.number().optional().default(0),
    user: IDSchema,
    images: z
        .array(z.string().min(1))
        .min(1, 'Please provide at least one image.'),
    price: z.number().min(0, 'Please provide a valid price.'),
    totalQuantity: z.number().min(0, 'Total quantity must be at least 0.'),
    totalSoldQuantity: z.number().optional().default(0),
})
