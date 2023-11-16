const express = require('express')
const { protect } = require('../controllers/authController')
const { getAllorders, getSingleOrder, createOrder, updateOrder } = require('../controllers/orderController')

const router = express.Router()

router.use(protect)

router.route('/').post(createOrder).get(getAllorders)
router.route('/:id').get(getSingleOrder).patch(updateOrder)

module.exports = router

