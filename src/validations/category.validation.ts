import { z } from 'zod'
import { IDArraySchema, IDSchema } from './id.schema'

export const categorySchema = z.object({
    name: z.string().min(1, 'Category name is required.'),
    user: IDSchema,
    image: z.string().optional(),
    products: IDArraySchema,
})
