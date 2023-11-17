const express = require('express')
const { createCoupon, getAllCoupons, getCoupon, updateCoupon, deleteCoupon } = require('../controllers/couponController')
const { protect, restrictTo } = require('../controllers/authController')


const router = express.Router();

router.get("/", getAllCoupons);
router.get("/:id", getCoupon);

router.use(protect, restrictTo("admin"))

router.post("/", createCoupon);
router.route("/:id").patch(updateCoupon).delete(deleteCoupon)

module.exports = router;