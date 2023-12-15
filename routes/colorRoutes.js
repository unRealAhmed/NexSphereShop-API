const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const { getAllColors, getSingleColor, updateColor, deleteColor, createColor } = require('../controllers/colorController');
const validationMiddleware = require('../middleware/validationFunction');

const {
  colorValidationSchema,
} = require('../validation/colorValidation');

const router = express.Router();

router.get('/', getAllColors);
router.get('/:id', getSingleColor);

router.use(protect, restrictTo('admin'));

router.post('/', validationMiddleware(colorValidationSchema), createColor);

router.route('/:id').patch(validationMiddleware(colorValidationSchema), updateColor).delete(deleteColor);

module.exports = router;
