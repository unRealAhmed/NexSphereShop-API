import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    // Sign up a new user

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

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { oldPassword, newPassword } = req.body
            const updatedUser = await this.userService.changePassword(
                req.user!.userId,
                oldPassword,
                newPassword,
            )
            res.status(200).json({
                status: 'success',
                data: updatedUser,
            })
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
            res.status(200).json({
                status: 'success',
                data: updatedUser,
            })
        } catch (error) {
            next(error)
        }
    }
}
