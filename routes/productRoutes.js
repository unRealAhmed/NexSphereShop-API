const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
const upload = require('../utils/fileUpload');
const validationMiddleware = require('../middleware/validationFunction');
const {
  productValidationSchema,
} = require('../validation/productValidation');

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.use('/:productId/reviews', reviewRouter);

router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);

router.use(protect, restrictTo('admin'));

router.post('/', validationMiddleware(productValidationSchema), upload.array('images'), createProduct);

router.route('/:id').patch(validationMiddleware(productValidationSchema), updateProduct).delete(deleteProduct);

module.exports = router;
