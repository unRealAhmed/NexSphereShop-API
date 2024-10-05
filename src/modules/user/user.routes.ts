import express from 'express'
import { extractUserFromToken } from '../../middlewares/auth'
import { validate } from '../../middlewares/validation.middleware'
import { createRoute } from '../../shared/helpers/routeHelper'
import { userSchemas } from '../../validations'
import { UserController } from './user.controller'

const router = express.Router()
const userController = new UserController()

// 1. Create User
createRoute(
    router,
    'post',
    '/create',
    validate(userSchemas.registration),
    userController.createUser.bind(userController),
)

// 2. Find All Users
createRoute(
    router,
    'get',
    '/users',
    userController.findAllUsers.bind(userController),
)

// 3. Find All Admins
createRoute(
    router,
    'get',
    '/admins',
    userController.findAllAdmins.bind(userController),
)

// 4. Find One User by ID
createRoute(
    router,
    'get',
    '/:userId',
    userController.findById.bind(userController),
)

// 5. Update User
createRoute(
    router,
    'patch',
    '/:userId',
    validate(userSchemas.updateUser),
    userController.updateUser.bind(userController),
)

// 6. Get Current User (Me)
createRoute(
    router,
    'get',
    '/me',
    extractUserFromToken,
    userController.getMe.bind(userController),
)

// 7. Delete User
createRoute(
    router,
    'delete',
    '/:userId',
    userController.deleteUser.bind(userController),
)

// 8. Assign Role to User
createRoute(
    router,
    'patch',
    '/:userId/role',
    validate(userSchemas.assignRole),
    userController.assignRole.bind(userController),
)

// 9. Update Current User
createRoute(
    router,
    'patch',
    '/me',
    extractUserFromToken,
    validate(userSchemas.updateCurrentUser),
    userController.updateCurrentUser.bind(userController),
)

// 10. Change Password
createRoute(
    router,
    'patch',
    '/me/change-password',
    extractUserFromToken,
    validate(userSchemas.updatePassword),
    userController.changePassword.bind(userController),
)

// 11. Update Shipping Address
createRoute(
    router,
    'patch',
    '/me/shipping-address',
    extractUserFromToken,
    validate(userSchemas.updateShippingAddress),
    userController.updateShippingAddress.bind(userController),
)

export default router
