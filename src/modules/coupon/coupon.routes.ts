import express from 'express'
import { extractUserFromToken } from '../../middlewares/auth'
import { validate } from '../../middlewares/validation.middleware'
import { createRoute } from '../../shared/helpers/routeHelper'
import { couponSchemas } from '../../validations'
import { CouponController } from './coupon.Controller'

const router = express.Router()
const couponController = new CouponController()

// 1. Create Coupon
createRoute(
    router,
    'post',
    '/',
    extractUserFromToken,
    validate(couponSchemas.createCoupon),
    couponController.createCoupon.bind(couponController),
)

// 2. Get All Coupons
createRoute(
    router,
    'get',
    '/',
    couponController.getAllCoupons.bind(couponController),
)

// 3. Find One Coupon by ID
createRoute(
    router,
    'get',
    '/:id',
    validate(couponSchemas.findCouponById),
    couponController.getCoupon.bind(couponController),
)

// 4. Update Coupon
createRoute(
    router,
    'patch',
    '/:id',
    extractUserFromToken,
    validate(couponSchemas.updateCoupon),
    couponController.updateCoupon.bind(couponController),
)

// 5. Delete Coupon
createRoute(
    router,
    'delete',
    '/:id',
    extractUserFromToken,
    couponController.deleteCoupon.bind(couponController),
)

// 6. Apply Coupon
createRoute(
    router,
    'post',
    '/apply/:code',
    validate(couponSchemas.applyCoupon),
    couponController.applyCoupon.bind(couponController),
)

// 7. Deactivate Expired Coupons
// createRoute(
//     router,
//     'patch',
//     '/deactivate-expired',
//     extractUserFromToken,
//     couponController.deactivateExpiredCoupons.bind(couponController),
// )

export default router
