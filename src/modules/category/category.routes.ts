import express from 'express'
import { extractUserFromToken } from '../../middlewares/auth'
import { validate } from '../../middlewares/validation.middleware'
import { createRoute } from '../../shared/helpers/routeHelper'
import { categorySchemas } from '../../validations'
import { CategoryController } from './category.controller'

const router = express.Router()
const categoryController = new CategoryController()

createRoute(
    router,
    'post',
    '/',
    extractUserFromToken,
    validate(categorySchemas.createCategory),
    categoryController.createCategory.bind(categoryController),
)

createRoute(
    router,
    'get',
    '/',
    categoryController.getAllCategories.bind(categoryController),
)

createRoute(
    router,
    'get',
    '/:id',
    validate(categorySchemas.findCategoryById),
    categoryController.getCategory.bind(categoryController),
)

createRoute(
    router,
    'patch',
    '/:id',
    extractUserFromToken,
    validate(categorySchemas.updateCategory),
    categoryController.updateCategory.bind(categoryController),
)

createRoute(
    router,
    'delete',
    '/:id',
    extractUserFromToken,
    categoryController.deleteCategory.bind(categoryController),
)

export default router
