import { z } from 'zod'

export const userRegistrationSchema = z
    .object({
        fullname: z
            .string()
            .min(3, {
                message: 'Full name must be at least 3 characters long.',
            })
            .max(50, { message: 'Full name must not exceed 50 characters.' }),
        email: z.string().email({ message: 'Invalid email address.' }),
        password: z.string().min(6, {
            message: 'Password must be at least 6 characters long.',
        }),
        passwordConfirm: z.string().min(6, {
            message:
                'Password confirmation must be at least 6 characters long.',
        }),
    })
    .refine(data => data.password === data.passwordConfirm, {
        message: 'Passwords must match.',
        path: ['passwordConfirm'],
    })

export const userLoginSchema = z.object({
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
})

export const userUpdateSchema = z.object({
    fullname: z
        .string()
        .min(3, 'Full name must be at least 3 characters long.')
        .max(50, 'Full name must be at most 50 characters long.')
        .optional(),
    email: z.string().email('Invalid email address.').optional(),
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
})

export const updatePasswordSchema = z
    .object({
        password: z.string().min(6, {
            message: 'Password must be at least 6 characters long.',
        }),
        passwordConfirm: z.string().min(6, {
            message:
                'Password confirmation must be at least 6 characters long.',
        }),
    })
    .refine(data => data.password === data.passwordConfirm, {
        message: 'Passwords must match.',
        path: ['passwordConfirm'],
    })
