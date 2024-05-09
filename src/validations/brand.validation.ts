import { z } from 'zod'
import { IDSchema } from './id.schema'

// ----------------------
// Shared Schemas
// ----------------------

const nameSchema = z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(100, { message: 'Name must not exceed 100 characters.' })

const imageSchema = z
    .string()
    .url({ message: 'Image must be a valid URL.' })
    .optional() // Make it optional

// ----------------------
// Specific Schemas
// ----------------------

const createBrandSchema = z.object({
    name: nameSchema,
    image: imageSchema,
})

const updateBrandSchema = z.object({
    name: nameSchema.optional(),
    image: imageSchema.optional(),
})

// ----------------------
// Aggregated Brand Schemas
// ----------------------

export const brandSchemas = {
    createBrand: {
        body: createBrandSchema,
    },
    updateBrand: {
        body: updateBrandSchema,
    },
    findBrandById: {
        params: z.object({
            id: IDSchema,
        }),
    },
}
