import express from 'express'
import { extractUserFromToken } from '../../app/middlewares/auth'
import { validate } from '../../app/middlewares/validation.middleware'
import { userSchemas } from '../../validations'
import { UserController } from './user.controller'

const userRouter = express.Router()

const userController = new UserController()

// User Signup
userRouter.post(
    '/signup',
    validate(userSchemas.registration),
    userController.signUp.bind(userController),
)

// Update Current User Profile
userRouter.patch(
    '/update',
    extractUserFromToken,
    validate(userSchemas.update),
    userController.updateCurrentUser.bind(userController),
)

// Change Password
userRouter.patch(
    '/change-password',
    extractUserFromToken,
    validate(userSchemas.updatePassword),
    userController.changePassword.bind(userController),
)

// Update Shipping Address
userRouter.patch(
    '/update-shipping-address',
    extractUserFromToken,
    validate(userSchemas.update),
    userController.updateShippingAddress.bind(userController),
)

export default userRouter
