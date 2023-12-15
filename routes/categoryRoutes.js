const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const { getAllCategories, getSingleCategory, updateCategory, deleteCategory, createCategory } = require('../controllers/categoryController');
const upload = require('../utils/fileUpload');
const validationMiddleware = require('../middleware/validationFunction');

const {
  categoryValidationSchema,
} = require('../validation/categoryValidation');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getSingleCategory);

router.use(protect, restrictTo('admin'));

router.post('/', validationMiddleware(categoryValidationSchema), upload.single('image'), createCategory);

router
  .route('/:id')
  .patch(validationMiddleware(categoryValidationSchema), updateCategory)
  .delete(deleteCategory);

module.exports = router;
