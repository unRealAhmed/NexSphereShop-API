import { NextFunction, Request, Response } from 'express'
import { convertToObjectId } from '../../shared/helpers/convertToObjectId'
import { UserService } from './user.service'

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.createUser(req.body)
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    async findAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.findAllUsers(req.query)
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    async findAllAdmins(req: Request, res: Response, next: NextFunction) {
        try {
            const admins = await this.userService.findAllAdmins()
            res.status(200).json(admins)
        } catch (error) {
            next(error)
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.findById(
                convertToObjectId(req.params.userId),
            )
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedUser = await this.userService.updateUser(
                convertToObjectId(req.params.userId),
                req.body,
            )
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }

    async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.getMe(req.user!.userId)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            await this.userService.deleteUser(
                convertToObjectId(req.params.userId),
            )
            res.status(204).json({
                status: 'success',
                data: null,
            })
        } catch (error) {
            next(error)
        }
    }

    async assignRole(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedUser = await this.userService.assignRole(
                convertToObjectId(req.params.userId),
                req.body.role,
            )
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }

    async updateCurrentUser(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedUser = await this.userService.updateCurrentUser(
                req.user!.userId,
                req.body,
            )
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedUser = await this.userService.changePassword(
                req.user!.userId,
                req.body,
            )
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }

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
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }
}
