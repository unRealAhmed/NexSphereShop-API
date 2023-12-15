const Joi = require('joi');

const orderValidationSchema = Joi.object({
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.pattern.base': 'Invalid user ID format',
      'any.required': 'User information is required for the order',
      'string.empty': 'User information is required for the order',
    }),
  orderItems: Joi.array()
    .items(Joi.object().required())
    .required()
    .messages({
      'array.base': 'Order items must be an array',
      'any.required': 'Order items are required',
      'array.empty': 'Order items are required',
    }),
  shippingAddress: Joi.object()
    .required()
    .messages({
      'object.base': 'Shipping address must be an object',
      'any.required': 'Shipping address is required',
      'object.empty': 'Shipping address is required',
    }),
  orderNumber: Joi.string(),
  paymentStatus: Joi.string()
    .default('Not paid'),
  paymentMethod: Joi.string()
    .default('Not specified'),
  totalPrice: Joi.number()
    .default(0.0),
  currency: Joi.string()
    .default('Not specified'),
  status: Joi.string()
    .default('pending')
    .valid('pending', 'processing', 'shipped', 'delivered'),
  deliveredAt: Joi.date(),
});

module.exports = orderValidationSchema;
