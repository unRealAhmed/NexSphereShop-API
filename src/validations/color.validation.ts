import { z } from 'zod'
import { IDSchema } from './id.schema'

// ----------------------
// Shared Schemas
// ----------------------

const nameSchema = z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(100, { message: 'Name must not exceed 100 characters.' })

const hexCodeSchema = z
    .string()
    .length(7, {
        message: 'Hex code must be exactly 7 characters (including #).',
    })
    .regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, {
        message: 'Hex code must be a valid hex color format.',
    })

const createColorSchema = z.object({
    name: nameSchema,
    hexCode: hexCodeSchema,
    createdBy: IDSchema,
})

const updateColorSchema = z.object({
    name: nameSchema.optional(),
    hexCode: hexCodeSchema.optional(),
})

// ----------------------
// Aggregated Color Schemas
// ----------------------

export const colorSchemas = {
    createColor: {
        body: createColorSchema,
    },
    updateColor: {
        body: updateColorSchema,
    },
    findColorById: {
        params: z.object({
            id: IDSchema,
        }),
    },
}
