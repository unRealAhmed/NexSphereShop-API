import express from 'express'
import { extractUserFromToken } from '../../middlewares/auth'
import { validate } from '../../middlewares/validation.middleware'
import { createRoute } from '../../shared/helpers/routeHelper'
import { userSchemas } from '../../validations'
import { AuthController } from './auth.controller'

const router = express.Router()
const authController = new AuthController()

createRoute(
    router,
    'post',
    '/signup',
    validate(userSchemas.registration),
    authController.signUp.bind(authController),
)

createRoute(
    router,
    'post',
    '/login',
    validate(userSchemas.login),
    authController.login.bind(authController),
)

createRoute(
    router,
    'post',
    '/logout',
    extractUserFromToken,
    authController.logout.bind(authController),
)

createRoute(
    router,
    'post',
    '/forgot-password',
    validate(userSchemas.login),
    authController.forgotPassword.bind(authController),
)

createRoute(
    router,
    'patch',
    '/reset-password/:token',
    validate(userSchemas.updatePassword),
    authController.resetPassword.bind(authController),
)

export default router
