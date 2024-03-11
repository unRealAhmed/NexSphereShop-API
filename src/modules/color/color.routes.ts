import express from 'express'
import { extractUserFromToken } from '../../middlewares/auth'
import { validate } from '../../middlewares/validation.middleware'
import { createRoute } from '../../shared/helpers/routeHelper'
import { colorSchemas } from '../../validations'
import { ColorController } from './color.controller'

const router = express.Router()
const colorController = new ColorController()

createRoute(
    router,
    'post',
    '/',
    extractUserFromToken,
    validate(colorSchemas.createColor),
    colorController.createColor.bind(colorController),
)

createRoute(
    router,
    'get',
    '/',
    colorController.getAllColors.bind(colorController),
)

createRoute(
    router,
    'get',
    '/:id',
    validate(colorSchemas.findColorById),
    colorController.getColor.bind(colorController),
)

createRoute(
    router,
    'patch',
    '/:id',
    extractUserFromToken,
    validate(colorSchemas.updateColor),
    colorController.updateColor.bind(colorController),
)

createRoute(
    router,
    'delete',
    '/:id',
    extractUserFromToken,
    colorController.deleteColor.bind(colorController),
)

export default router
