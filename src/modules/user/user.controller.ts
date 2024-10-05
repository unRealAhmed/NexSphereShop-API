import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'
import { convertToObjectId } from '../../shared/helpers/convertToObjectId'

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    // 1. Create User
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.createUser(req.body)
            res.status(201).json({
                status: 'success',
                data: user,
            })
        } catch (error) {
            next(error)
        }
    }

    // 2. Find All Users
    async findAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.findAllUsers(req.query)
            res.status(200).json({
                status: 'success',
                data: users,
            })
        } catch (error) {
            next(error)
        }
    }

    // 3. Find All Admins
    async findAllAdmins(req: Request, res: Response, next: NextFunction) {
        try {
            const admins = await this.userService.findAllAdmins()
            res.status(200).json({
                status: 'success',
                data: admins,
            })
        } catch (error) {
            next(error)
        }
    }

    // 4. Find One User by ID
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.findById(convertToObjectId(req.params.userId))
            res.status(200).json({
                status: 'success',
                data: user,
            })
        } catch (error) {
            next(error)
        }
    }

    // 5. Update User
    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedUser = await this.userService.updateUser(
                convertToObjectId(req.params.userId),
                req.body,
            )
            res.status(200).json({
                status: 'success',
                data: updatedUser,
            })
        } catch (error) {
            next(error)
        }
    }

    // 6. Get Me (Current User)
    async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.getMe(req.user!.userId)
            res.status(200).json({
                status: 'success',
                data: user,
            })
        } catch (error) {
            next(error)
        }
    }

    // 7. Delete User
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            await this.userService.deleteUser(convertToObjectId(req.params.userId))
            res.status(204).json({
                status: 'success',
                data: null,
            })
        } catch (error) {
            next(error)
        }
    }

    // 8. Assign Role to User
    async assignRole(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedUser = await this.userService.assignRole(
                convertToObjectId(req.params.userId),
                req.body.role,
            )
            res.status(200).json({
                status: 'success',
                data: updatedUser,
            })
        } catch (error) {
            next(error)
        }
    }

    // Update Current User (Already Present)
    async updateCurrentUser(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedUser = await this.userService.updateCurrentUser(
                req.user!.userId,
                req.body,
            )
            res.status(200).json({
                status: 'success',
                data: updatedUser,
            })
        } catch (error) {
            next(error)
        }
    }

    // Change Password (Already Present)
    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedUser = await this.userService.changePassword(
                req.user!.userId,
                req.body
            )
            res.status(200).json({
                status: 'success',
                data: updatedUser,
            })
        } catch (error) {
            next(error)
        }
    }

    // Update Shipping Address (Already Present)
    async updateShippingAddress(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const updatedUser = await this.userService.updateShippingAddress(
                req.user!.userId,
                req.body.shippingAddress,
            )
            res.status(200).json({
                status: 'success',
                data: updatedUser,
            })
        } catch (error) {
            next(error)
        }
    }
}
