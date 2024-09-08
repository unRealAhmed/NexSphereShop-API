import { z } from 'zod'
import { ProductStatusValues } from '../shared/types/product.status'
import { IDSchema } from './id.schema'

// ----------------------
// Shared Schemas
// ----------------------

const nameSchema = z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(100, { message: 'Name must not exceed 100 characters.' })

const descriptionSchema = z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long.' })
    .max(500, { message: 'Description must not exceed 500 characters.' })

const sizesSchema = z
    .array(z.enum(['S', 'M', 'L', 'XL', 'XXL']))
    .nonempty({ message: 'At least one size is required.' })

const colorsSchema = z
    .array(z.string().min(1, { message: 'At least one color is required.' }))
    .nonempty({ message: 'At least one color is required.' })

const priceSchema = z
    .number()
    .positive({ message: 'Price must be a positive number.' })

const totalQuantitySchema = z
    .number()
    .int()
    .nonnegative({ message: 'Total quantity must be a non-negative integer.' })

const discountSchema = z
    .number()
    .nonnegative({ message: 'Discount must be a non-negative number.' })
    .optional()

const applyDiscountSchema = z.object({
    discount: z
        .number()
        .nonnegative()
        .max(100, 'Discount must not exceed 100%'),
})

const lowStockThresholdSchema = z
    .number()
    .nonnegative({
        message: 'Low stock threshold must be a non-negative number.',
    })
    .optional()

const statusSchema = z.enum(ProductStatusValues).optional()

// ----------------------
// Specific Schemas
// ----------------------

const createProductSchema = z.object({
    name: nameSchema,
    description: descriptionSchema,
    brand: IDSchema,
    category: IDSchema,
    sizes: sizesSchema,
    colors: colorsSchema,
    price: priceSchema,
    totalQuantity: totalQuantitySchema,
    discount: discountSchema,
    lowStockThreshold: lowStockThresholdSchema,
    status: statusSchema,
    images: z.array(z.string()).optional(),
})

const updateProductSchema = z.object({
    name: nameSchema.optional(),
    description: descriptionSchema.optional(),
    brand: IDSchema.optional(),
    category: IDSchema.optional(),
    sizes: sizesSchema.optional(),
    colors: colorsSchema.optional(),
    price: priceSchema.optional(),
    totalQuantity: totalQuantitySchema.optional(),
    discount: discountSchema.optional(),
    lowStockThreshold: lowStockThresholdSchema.optional(),
    status: statusSchema.optional(),
    images: z.array(z.string()).optional(),
})

// ----------------------
// Aggregated Product Schemas
// ----------------------

export const productSchemas = {
    createProduct: {
        body: createProductSchema,
    },
    updateProduct: {
        body: updateProductSchema,
    },
    applyDiscount: {
        body: applyDiscountSchema,
    },
    // findAllProducts: {
    //     query: z.object({
    //         // Add any query parameters you need to validate
    //     }),
    // },
    findProductById: {
        params: z.object({
            id: IDSchema,
        }),
    },
}
