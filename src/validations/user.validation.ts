import { z } from 'zod'
import { IDSchema } from './id.schema'

export const passwordSchema = z
    .string()
    .min(6, 'Password must be at least 6 characters long.')
export const emailSchema = z
    .string()
    .email({ message: 'Invalid email address.' })
export const fullnameSchema = z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters long.' })
    .max(50, { message: 'Full name must not exceed 50 characters.' })

export const passwordConfirmationFields = {
    password: passwordSchema,
    passwordConfirm: z.string(),
}

export const passwordConfirmationSchema = z
    .object({
        password: passwordSchema,
        passwordConfirm: z.string(),
    })
    .refine(data => data.password === data.passwordConfirm, {
        message: 'Passwords must match.',
        path: ['passwordConfirm'],
    })

export const userSchemas = {
    registration: {
        body: z
            .object({
                fullname: fullnameSchema,
                email: emailSchema,
                ...passwordConfirmationFields,
            })
            .refine(data => data.password === data.passwordConfirm, {
                message: 'Passwords must match.',
                path: ['passwordConfirm'],
            }),
    },
    login: {
        body: z.object({
            email: emailSchema,
            password: passwordSchema,
        }),
    },
    update: {
        body: z.object({
            fullname: fullnameSchema.optional(),
            email: emailSchema.optional(),
            shippingAddress: z
                .object({
                    firstName: z.string().optional(),
                    lastName: z.string().optional(),
                    address: z.string().optional(),
                    city: z.string().optional(),
                    postalCode: z.string().optional(),
                    province: z.string().optional(),
                    country: z.string().optional(),
                    phone: z.string().optional(),
                })
                .optional(),
        }),
    },
    updatePassword: {
        body: passwordConfirmationSchema,
    },
    findAllUsers: {
        query: z.object({
            active: z.boolean().optional(),
            role: z.string().optional(),
            email: emailSchema.optional(),
        }),
    },
    findUser: {
        params: z.object({
            userId: IDSchema,
        }),
    },
}
