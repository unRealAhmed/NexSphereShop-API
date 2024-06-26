import { z } from 'zod'
import { IDSchema } from './id.schema'

// ----------------------
// Shared Schemas
// ----------------------

const nameSchema = z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(100, { message: 'Name must not exceed 100 characters.' })

// ----------------------
// Specific Schemas
// ----------------------

const createCategorySchema = z.object({
    name: nameSchema,
})

const updateCategorySchema = z.object({
    name: nameSchema.optional(),
})

// ----------------------
// Aggregated Category Schemas
// ----------------------

export const categorySchemas = {
    createCategory: {
        body: createCategorySchema,
    },
    updateCategory: {
        body: updateCategorySchema,
    },
    findCategoryById: {
        params: z.object({
            id: IDSchema,
        }),
    },
}
