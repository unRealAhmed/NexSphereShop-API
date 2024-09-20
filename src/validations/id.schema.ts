import { Types } from 'mongoose'
import { z } from 'zod'

export const IDSchema = z.string().refine(
    value => {
        return Types.ObjectId.isValid(value)
    },
    {
        message: 'Invalid ObjectId format.',
    },
)
export const IDArraySchema = z
    .array(IDSchema)
    .nonempty('At least one ID is required.')
