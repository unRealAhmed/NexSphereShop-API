const express = require('express')
const { protect, restrictTo } = require('../controllers/authController')
const { getAllCategories, getSingleCategory, updateCategory, deleteCategory, createCategory } = require('../controllers/categoryController')

const router = express.Router()

router.use(protect, restrictTo('admin'))

router.route('/').get(getAllCategories).post(createCategory);
router.route('/:id').get(getSingleCategory).patch(updateCategory).delete(deleteCategory);

module.exports = router