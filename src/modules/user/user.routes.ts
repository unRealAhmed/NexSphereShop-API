import express from 'express'
import { extractUserFromToken } from '../../app/middlewares/auth'
import { validate } from '../../app/middlewares/validation.middleware'
import { createRoute } from '../../shared/helpers/routeHelper'
import { userSchemas } from '../../validations'
import { UserController } from './user.controller'

const userRouter = express.Router()
const userController = new UserController()

userRouter.use(extractUserFromToken)

// Update Current User Profile
createRoute(
    userRouter,
    'patch',
    '/update',
    validate(userSchemas.update),
    userController.updateCurrentUser.bind(userController),
)

// Change Password
createRoute(
    userRouter,
    'patch',
    '/change-password',
    validate(userSchemas.updatePassword),
    userController.changePassword.bind(userController),
)

// Update Shipping Address
createRoute(
    userRouter,
    'patch',
    '/update-shipping-address',
    validate(userSchemas.update),
    userController.updateShippingAddress.bind(userController),
)

export default userRouter
