const Joi = require('joi');

const categoryValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'Category name must be a string',
      'any.required': 'Please provide a name for the category',
      'string.empty': 'Please provide a name for the category',
    }),
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.pattern.base': 'Invalid user ID format',
      'any.required': 'Please provide a user ID for the category',
      'string.empty': 'Please provide a user ID for the category',
    }),
  image: Joi.string().allow('').optional(),
  products: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
});

module.exports = categoryValidationSchema;
