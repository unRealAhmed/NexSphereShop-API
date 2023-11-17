const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
const upload = require('../utils/fileUpload');
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();
// Route for handling reviews associated with a product
router.use('/:productId/reviews', reviewRouter);

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);

// Protected routes (require authentication and admin access)
router.use(protect, restrictTo('admin'));

router.post('/', upload.array('images'), createProduct);

router
  .route('/:id')
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;