const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const { getAllBrands, getSingleBrand, updateBrand, deleteBrand, createBrand } = require('../controllers/brandController');
const validationMiddleware = require('../middleware/validationFunction');

const {
  brandValidationSchema,
} = require('../validation/brandValidation');

const router = express.Router();

router.get('/', getAllBrands);
router.get('/:id', getSingleBrand);

router.use(protect, restrictTo('admin'));

router.post('/', validationMiddleware(brandValidationSchema), createBrand);

router.route('/:id').patch(updateBrand).delete(deleteBrand);

module.exports = router;
