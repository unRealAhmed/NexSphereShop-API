import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '../../shared/errors/errors'
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
            const userId = req.user?.userId
            await this.authService.logout(userId!, res)
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
            if (!email)
                return next(
                    new BadRequestError('please enter an email address'),
                )
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
            const { password } = req.body
            const response = await this.authService.resetPassword(
                token,
                password,
            )
            res.status(200).json({
                status: 'success',
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshJwt
            if (!refreshToken) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Refresh token missing',
                })
            }

            const response = await this.authService.refreshToken(
                refreshToken,
                res,
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
