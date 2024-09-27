import express from 'express'
import { extractUserFromToken } from '../../middlewares/auth'
import { validate } from '../../middlewares/validation.middleware'
import { createRoute } from '../../shared/helpers/routeHelper'
import { userSchemas } from '../../validations'
import { UserController } from './user.controller'

const router = express.Router()
const userController = new UserController()

router.use(extractUserFromToken)

createRoute(
    router,
    'patch',
    '/update',
    validate(userSchemas.update),
    userController.updateCurrentUser.bind(userController),
)

createRoute(
    router,
    'patch',
    '/change-password',
    validate(userSchemas.updatePassword),
    userController.changePassword.bind(userController),
)

createRoute(
    router,
    'patch',
    '/update-shipping-address',
    validate(userSchemas.update),
    userController.updateShippingAddress.bind(userController),
)

export default router
