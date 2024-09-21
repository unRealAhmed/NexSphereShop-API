import express from 'express'
import { extractUserFromToken } from '../../app/middlewares/auth'
import { validate } from '../../app/middlewares/validation.middleware'
import { createRoute } from '../../shared/helpers/routeHelper'
import { userSchemas } from '../../validations'
import { AuthController } from './auth.controller'

const authRouter = express.Router()
const authController = new AuthController()

// User Signup
createRoute(
    authRouter,
    'post',
    '/signup',
    validate(userSchemas.registration),
    authController.signUp.bind(authController),
)

// User Login
createRoute(
    authRouter,
    'post',
    '/login',
    validate(userSchemas.login),
    authController.login.bind(authController),
)

// User Logout
createRoute(
    authRouter,
    'post',
    '/logout',
    extractUserFromToken,
    authController.logout.bind(authController),
)

// Forgot Password
createRoute(
    authRouter,
    'post',
    '/forgot-password',
    validate(userSchemas.login),
    authController.forgotPassword.bind(authController),
)

// Reset Password
createRoute(
    authRouter,
    'patch',
    '/reset-password/:token',
    validate(userSchemas.updatePassword),
    authController.resetPassword.bind(authController),
)

export default authRouter
