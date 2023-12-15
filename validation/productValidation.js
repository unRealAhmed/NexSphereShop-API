const Joi = require('joi');

const productValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'Product name must be a string',
      'any.required': 'Please provide a name for the product',
      'string.empty': 'Please provide a name for the product',
    }),
  description: Joi.string()
    .required()
    .messages({
      'string.base': 'Product description must be a string',
      'any.required': 'Please provide a description for the product',
      'string.empty': 'Please provide a description for the product',
    }),
  brand: Joi.string()
    .required()
    .messages({
      'string.base': 'Brand must be a string',
      'any.required': 'Please provide a brand for the product',
      'string.empty': 'Please provide a brand for the product',
    }),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.base': 'Category ID must be a string',
      'string.pattern.base': 'Invalid category ID format',
      'any.required': 'Please provide a category for the product',
      'string.empty': 'Please provide a category for the product',
    }),
  sizes: Joi.array()
    .items(Joi.string().valid('S', 'M', 'L', 'XL', 'XXL'))
    .required()
    .messages({
      'array.base': 'Sizes must be an array',
      'any.required': 'Please provide at least one size for the product',
      'array.empty': 'Please provide at least one size for the product',
    }),
  colors: Joi.array()
    .items(Joi.string())
    .required()
    .messages({
      'array.base': 'Colors must be an array',
      'any.required': 'Please provide at least one color for the product',
      'array.empty': 'Please provide at least one color for the product',
    }),
  averageRating: Joi.number(),
  numOfReviews: Joi.number(),
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.pattern.base': 'Invalid user ID format',
      'any.required': 'Please provide a user ID for the product',
      'string.empty': 'Please provide a user ID for the product',
    }),
  images: Joi.array()
    .items(Joi.string())
    .required()
    .messages({
      'array.base': 'Images must be an array',
      'any.required': 'Please provide at least one image for the product',
      'array.empty': 'Please provide at least one image for the product',
    }),
  price: Joi.number()
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'any.required': 'Please provide a price for the product',
    }),
  totalQty: Joi.number()
    .required()
    .messages({
      'number.base': 'Total quantity must be a number',
      'any.required': 'Please provide the total quantity for the product',
    }),
  totalSold: Joi.number()
    .default(0),
});

module.exports = productValidationSchema;
