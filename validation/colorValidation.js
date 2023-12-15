const Joi = require('joi');

const colorValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'Color name must be a string',
      'any.required': 'Please provide the color name',
      'string.empty': 'Please provide the color name',
    }),
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.pattern.base': 'Invalid user ID format',
      'any.required': 'Please provide a user ID for the color',
      'string.empty': 'Please provide a user ID for the color',
    }),
});

module.exports = colorValidationSchema;
