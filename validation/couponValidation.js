const Joi = require('joi');

const couponValidationSchema = Joi.object({
  code: Joi.string()
    .required()
    .messages({
      'string.base': 'Coupon code must be a string',
      'any.required': 'Coupon code is required',
      'string.empty': 'Coupon code is required',
    }),
  startDate: Joi.date()
    .required()
    .messages({
      'date.base': 'Start date must be a valid date',
      'any.required': 'Start date is required',
    }),
  endDate: Joi.date()
    .required()
    .messages({
      'date.base': 'End date must be a valid date',
      'any.required': 'End date is required',
    }),
  discount: Joi.number()
    .required()
    .messages({
      'number.base': 'Discount amount must be a number',
      'any.required': 'Discount amount is required',
    }),
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.pattern.base': 'Invalid user ID format',
      'any.required': 'User reference is required',
      'string.empty': 'User reference is required',
    }),
});

module.exports = couponValidationSchema;
