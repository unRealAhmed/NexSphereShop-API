import { NextFunction, Request, Response } from 'express'
import { AuthService } from './auth.service'

export class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const response = await this.authService.login(email, password, res)
            res.status(200).json({
                status: 'success',
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    // Logout user
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            await this.authService.logout(res)
            res.status(200).json({
                status: 'success',
                message: 'Successfully logged out',
            })
        } catch (error) {
            next(error)
        }
    }

    // Forgot Password
    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body
            const protocol = req.protocol
            const host = req.get('host')!
            await this.authService.forgotPassword(email, protocol, host)
            res.status(200).json({
                status: 'success',
                message: 'Password reset token sent to email',
            })
        } catch (error) {
            next(error)
        }
    }

    // Reset Password
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.params
            const { newPassword } = req.body
            const response = await this.authService.resetPassword(
                token,
                newPassword,
            )
            res.status(200).json({
                status: 'success',
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
}
