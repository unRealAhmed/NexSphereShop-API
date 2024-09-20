import { z } from 'zod'
import { IDSchema } from './id.schema'

export const colorValidationSchema = z.object({
    name: z.string().min(1, 'Please provide the color name.'),
    user: IDSchema,
})
