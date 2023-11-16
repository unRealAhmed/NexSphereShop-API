const express = require('express')
const { protect, restrictTo } = require('../controllers/authController')
const { getAllCategories, getSingleCategory, updateCategory, deleteCategory, createCategory } = require('../controllers/categoryController')

const router = express.Router()

router.get('/', getAllCategories)
router.get('/:id', getSingleCategory)

router.use(protect, restrictTo('admin'))

router.post('/', createCategory)
router.route('/:id').patch(updateCategory).delete(deleteCategory);

module.exports = router