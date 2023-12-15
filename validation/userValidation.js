const Joi = require('joi');

const userValidationSchema = Joi.object({
  fullname: Joi.string()
    .required()
    .min(3)
    .max(50)
    .messages({
      'string.base': 'Full name must be a string',
      'any.required': 'Please provide your full name',
      'string.empty': 'Please provide your full name',
      'string.min': 'Name must be at least {#limit} characters long',
      'string.max': 'Name cannot exceed {#limit} characters',
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io'] } })
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Please provide a valid email',
      'any.required': 'Please provide your email address',
      'string.empty': 'Please provide your email address',
    }),
  password: Joi.string()
    .required()
    .min(6)
    .messages({
      'string.base': 'Password must be a string',
      'any.required': 'Please provide a password',
      'string.empty': 'Please provide a password',
      'string.min': 'Password must be at least {#limit} characters long',
    }),
  passwordConfirm: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Please confirm your password',
    }),
  role: Joi.string()
    .valid('admin', 'user')
    .default('user'),
  hasShippingAddress: Joi.boolean()
    .default(false),
  shippingAddress: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    postalCode: Joi.string(),
    province: Joi.string(),
    country: Joi.string(),
    phone: Joi.string(),
  }),
});

const updateProfileSchema = Joi.object({
  fullname: Joi.string()
    .min(3)
    .max(50)
    .messages({
      'string.base': 'Full name must be a string',
      'string.min': 'Name must be at least {#limit} characters long',
      'string.max': 'Name cannot exceed {#limit} characters',
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io'] } })
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Please provide a valid email',
    }),
});

const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'string.base': 'Current password must be a string',
      'any.required': 'Please provide your current password',
      'string.empty': 'Please provide your current password',
    }),
  newPassword: Joi.string()
    .required()
    .min(6)
    .messages({
      'string.base': 'New password must be a string',
      'any.required': 'Please provide a new password',
      'string.empty': 'Please provide a new password',
      'string.min': 'New password must be at least {#limit} characters long',
    }),
  newPasswordConfirm: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'New passwords do not match',
      'any.required': 'Please confirm your new password',
    }),
});

const shippingAddressSchema = Joi.object({
  firstName: Joi.string().allow(''),
  lastName: Joi.string().allow(''),
  address: Joi.string().allow(''),
  city: Joi.string().allow(''),
  postalCode: Joi.string().allow(''),
  province: Joi.string().allow(''),
  country: Joi.string().allow(''),
  phone: Joi.string().allow(''),
});

module.exports = { userValidationSchema, updatePasswordSchema, updateProfileSchema, shippingAddressSchema };
