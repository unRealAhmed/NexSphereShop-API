import express from 'express'
import { extractUserFromToken } from '../../app/middlewares/auth'
import { validate } from '../../app/middlewares/validation.middleware'
import { userSchemas } from '../../validations'
import { AuthController } from './auth.Controller'

const authRouter = express.Router()

const authController = new AuthController()

// User Login
authRouter.post(
    '/login',
    validate(userSchemas.login),
    authController.login.bind(authController),
)

// User Logout
authRouter.post(
    '/logout',
    extractUserFromToken,
    authController.logout.bind(authController),
)

// Forgot Password
authRouter.post(
    '/forgot-password',
    validate(userSchemas.login),
    authController.forgotPassword.bind(authController),
)

// Reset Password
authRouter.patch(
    '/reset-password/:token',
    validate(userSchemas.updatePassword),
    authController.resetPassword.bind(authController),
)

export default authRouter
