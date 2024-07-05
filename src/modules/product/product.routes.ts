import express from 'express'
import { extractUserFromToken } from '../../middlewares/auth'
import { validate } from '../../middlewares/validation.middleware'
import { createRoute } from '../../shared/helpers/routeHelper'
import { productSchemas } from '../../validations'
import { ProductController } from './product.controller'

const router = express.Router()
const productController = new ProductController()

// 1. Create Product
createRoute(
    router,
    'post',
    '/',
    extractUserFromToken,
    validate(productSchemas.createProduct),
    productController.createProduct.bind(productController),
)

// 2. Get All Products
createRoute(
    router,
    'get',
    '/',
    productController.getAllProducts.bind(productController),
)

// 3. Find One Product by ID
createRoute(
    router,
    'get',
    '/:id',
    validate(productSchemas.findProductById),
    productController.getProduct.bind(productController),
)

// 4. Update Product
createRoute(
    router,
    'patch',
    '/:id',
    extractUserFromToken,
    validate(productSchemas.updateProduct),
    productController.updateProduct.bind(productController),
)

// 5. Delete Product
createRoute(
    router,
    'delete',
    '/:id',
    extractUserFromToken,
    productController.deleteProduct.bind(productController),
)

createRoute(
    router,
    'patch',
    '/:id/discount',
    extractUserFromToken,
    validate(productSchemas.applyDiscount),
    productController.applyDiscount.bind(productController),
)

// 7. Remove Discount from Product
createRoute(
    router,
    'patch',
    '/:id/discount/remove',
    extractUserFromToken,
    productController.removeDiscount.bind(productController),
)

export default router
