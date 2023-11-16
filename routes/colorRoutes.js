const express = require('express')
const { protect, restrictTo } = require('../controllers/authController')
const { getAllColors, getSingleColor, updateColor, deleteColor, createColor } = require('../controllers/colorController')

const router = express.Router()

router.get('/', getAllColors)
router.get('/:id', getSingleColor)

router.use(protect, restrictTo('admin'))

router.post('/', createColor)
router.route('/:id').patch(updateColor).delete(deleteColor);

module.exports = router