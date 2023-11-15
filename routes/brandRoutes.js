const express = require('express')
const { protect, restrictTo } = require('../controllers/authController')
const { getAllBrands, getSingleBrand, updateBrand, deleteBrand, createBrand } = require('../controllers/brandController')

const router = express.Router()

router.use(protect, restrictTo('admin'))

router.route('/').get(getAllBrands).post(createBrand);
router.route('/:id').get(getSingleBrand).patch(updateBrand).delete(deleteBrand);

module.exports = router