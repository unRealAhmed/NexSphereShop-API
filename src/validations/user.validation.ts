import { z } from 'zod';

// ----------------------
// Shared Schemas
// ----------------------

const passwordSchema = z
    .string()
    .min(6, 'Password must be at least 6 characters long.');

const emailSchema = z
    .string()
    .email({ message: 'Invalid email address.' });

const fullnameSchema = z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters long.' })
    .max(50, { message: 'Full name must not exceed 50 characters.' });

const passwordConfirmationFields = {
    password: passwordSchema,
    passwordConfirm: z.string(),
};

// ----------------------
// Specific Schemas
// ----------------------

const registrationSchema = z
    .object({
        fullname: fullnameSchema,
        email: emailSchema,
        ...passwordConfirmationFields,
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Passwords must match.',
        path: ['passwordConfirm'],
    });

const createUserSchema = z
    .object({
        fullname: fullnameSchema,
        email: emailSchema,
        ...passwordConfirmationFields,
        role: z.enum(['admin', 'user'], { required_error: 'Role is required.' }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Passwords must match.',
        path: ['passwordConfirm'],
    });

const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

const updateUserSchema = z.object({
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
});

const updateShippingAddressSchema = z.object({
    shippingAddress: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        postalCode: z.string().optional(),
        province: z.string().optional(),
        country: z.string().optional(),
        phone: z.string().optional(),
    }),
});

const updateCurrentUserSchema = z.object({
    fullname: fullnameSchema.optional(),
    email: emailSchema.optional(),
    shippingAddress: updateShippingAddressSchema.optional()
});

const updatePasswordSchema = z
    .object({
        oldPassword: passwordSchema,
        newPassword: passwordSchema,
        passwordConfirm: z.string(),
    })
    .refine((data) => data.newPassword === data.passwordConfirm, {
        message: 'New passwords must match.',
        path: ['passwordConfirm'],
    });

const assignRoleSchema = z.object({
    role: z.enum(['admin', 'user'], { required_error: 'Role is required.' }),
});

/*
export const findAllUsersSchema = z.object({
  query: z.object({
    active: z.boolean().optional(),
    role: z.enum(['admin', 'user']).optional(),
    email: emailSchema.optional(),
  }),
});
*/

// ----------------------
// Aggregated User Schemas
// ----------------------

export const userSchemas = {
    registration: {
        body: registrationSchema, //without role
    },

    createUser: {
        body: createUserSchema, //with role
    },

    login: {
        body: loginSchema,
    },

    updateUser: {
        body: updateUserSchema,
    },

    updateCurrentUser: {
        body: updateCurrentUserSchema,
    },

    updatePassword: {
        body: updatePasswordSchema,
    },

    updateShippingAddress: {
        body: updateShippingAddressSchema,
    },

    assignRole: {
        body: assignRoleSchema,
    },

    /*
    findAllUsers: {
      query: findAllUsersSchema,
    },
    */
};
