import { z } from 'zod'
import { IDArraySchema, IDSchema } from './id.schema'

export const brandSchema = z.object({
    name: z.string().min(1, 'Brand name is required.'),
    user: IDSchema,
    products: IDArraySchema,
})
