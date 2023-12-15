const express = require('express');
const { protect } = require('../controllers/authController');
const { getAllorders, getSingleOrder, createOrder, updateOrder, getOrderStats }
  = require('../controllers/orderController');
const validationMiddleware = require('../middleware/validationFunction');

const {
  orderValidationSchema,
} = require('../validation/orderValidation');

const router = express.Router();

router.use(protect);
router.get('/sales/stats', getOrderStats);

router.post('/', validationMiddleware(orderValidationSchema), createOrder);

router.route('/:id').get(getSingleOrder).patch(validationMiddleware(orderValidationSchema), updateOrder);

router.route('/').get(getAllorders);

module.exports = router;
