const express = require('express');
const { createCoupon, getAllCoupons, getCoupon, updateCoupon, deleteCoupon } = require('../controllers/couponController');
const { protect, restrictTo } = require('../controllers/authController');
const validationMiddleware = require('../middleware/validationFunction');

const {
  couponValidationSchema,
} = require('../validation/couponValidation');

const router = express.Router();

router.get('/', getAllCoupons);
router.get('/:id', getCoupon);

router.use(protect, restrictTo('admin'));

router.post('/', validationMiddleware(couponValidationSchema), createCoupon);

router.route('/:id').patch(validationMiddleware(couponValidationSchema), updateCoupon).delete(deleteCoupon);

module.exports = router;
