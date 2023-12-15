const Joi = require('joi');

const reviewValidationSchema = Joi.object({
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.pattern.base': 'Invalid user ID format',
      'any.required': 'User information is required for the review',
      'string.empty': 'User information is required for the review',
    }),
  product: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.base': 'Product ID must be a string',
      'string.pattern.base': 'Invalid product ID format',
      'any.required': 'Product information is required for the review',
      'string.empty': 'Product information is required for the review',
    }),
  review: Joi.string()
    .required()
    .messages({
      'string.base': 'Review must be a string',
      'any.required': 'Please add a message for your review',
      'string.empty': 'Please add a message for your review',
    }),
  rating: Joi.number()
    .required()
    .min(1)
    .max(5)
    .messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating must not exceed 5',
      'any.required': 'Please add a rating between 1 and 5',
    }),
});

module.exports = reviewValidationSchema;
