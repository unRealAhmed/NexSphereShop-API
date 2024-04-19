import express from 'express'
import { extractUserFromToken } from '../../middlewares/auth'
import { validate } from '../../middlewares/validation.middleware'
import { createRoute } from '../../shared/helpers/routeHelper'
import { brandSchemas } from '../../validations'
import { BrandController } from './brand.controller'

const router = express.Router()
const brandController = new BrandController()

createRoute(
    router,
    'post',
    '/',
    extractUserFromToken,
    validate(brandSchemas.createBrand),
    brandController.createBrand.bind(brandController),
)

createRoute(
    router,
    'get',
    '/',
    brandController.getAllBrands.bind(brandController),
)

createRoute(
    router,
    'get',
    '/:id',
    validate(brandSchemas.findBrandById),
    brandController.getBrand.bind(brandController),
)

createRoute(
    router,
    'patch',
    '/:id',
    extractUserFromToken,
    validate(brandSchemas.updateBrand),
    brandController.updateBrand.bind(brandController),
)

createRoute(
    router,
    'delete',
    '/:id',
    extractUserFromToken,
    brandController.deleteBrand.bind(brandController),
)

export default router
