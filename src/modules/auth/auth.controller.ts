import { NextFunction, Request, Response } from 'express'
import { EmailService } from '../../shared/helpers/email'
import { welcomeHtmlTemplate } from '../../shared/utils'
import { AuthService } from './auth.service'

export class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.authService.signUp(req.body, res)
            const emailService = new EmailService()
            const html = welcomeHtmlTemplate(user.fullname)
            emailService.sendWelcomeEmail(user.email, html)
            res.status(201).json({
                status: 'success',
                user,
            })
        } catch (error) {
            next(error)
        }
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
