const express = require('express')
const { protect, restrictTo } = require('../controllers/authController')
const { getAllBrands, getSingleBrand, updateBrand, deleteBrand, createBrand } = require('../controllers/brandController')

const router = express.Router()

router.get('/', getAllBrands)
router.get('/:id', getSingleBrand)

router.use(protect, restrictTo('admin'))

router.post('/', createBrand)
router.route('/:id').patch(updateBrand).delete(deleteBrand);


module.exports = router