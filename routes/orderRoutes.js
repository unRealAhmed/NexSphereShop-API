const express = require('express')
const { protect } = require('../controllers/authController')
const { getAllorders, getSingleOrder, createOrder, updateOrder, getOrderStats } = require('../controllers/orderController')

const router = express.Router()

router.use(protect)
router.get("/sales/stats", getOrderStats);
router.route('/').post(createOrder).get(getAllorders)
router.route('/:id').get(getSingleOrder).patch(updateOrder)

module.exports = router

