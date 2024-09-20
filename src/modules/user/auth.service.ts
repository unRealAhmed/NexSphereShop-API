import crypto from 'crypto'
import { Response } from 'express'
import { UserRepository } from '../../repositories'
import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
} from '../../shared/errors/errors'
import { EmailService } from '../../shared/helpers/email'
import {
    comparePassword,
    createPasswordResetToken,
    hashPassword,
} from '../../shared/helpers/password'
import { LoginResponse } from '../../shared/types/login.response'
import { resetHtmlTemplate } from '../../shared/utils'
import { clearCookieToken, setCookieToken } from '../../shared/utils/cookies'
import { createJwtToken } from '../../shared/utils/token'

export class AuthService {
    private userRepository: UserRepository
    // private userService: UserService
    private emailService: EmailService

    constructor() {
        this.userRepository = new UserRepository()
        this.emailService = new EmailService()
        // this.userService = new UserService()
    }

    // Login method
    async login(
        email: string,
        password: string,
        res: Response,
    ): Promise<LoginResponse> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new BadRequestError('Invalid email or password')

        const isPasswordCorrect = await comparePassword(password, user.password)
        if (!isPasswordCorrect)
            throw new BadRequestError('Invalid email or password')

        const token = createJwtToken(user._id)
        setCookieToken(res, token)

        return {
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                role: user.role,
                active: user.active,
            },
        }
    }

    // Logout method
    async logout(res: Response): Promise<void> {
        clearCookieToken(res)
    }

    // Forgot Password method
    async forgotPassword(
        email: string,
        protocol: string,
        host: string,
    ): Promise<void> {
        // Find the user by email
        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new NotFoundError('User with this email not found')

        // Create password reset token
        const { resetToken, hashedToken, expiresAt } =
            createPasswordResetToken()
        user.passwordResetToken = hashedToken
        user.passwordResetExpires = expiresAt
        await user.save()

        // Construct reset URL
        const resetURL = `${protocol}://${host}/api/v1/users/resetPassword/${resetToken}`
        const html = resetHtmlTemplate(protocol, host, resetToken)

        // Send the email
        try {
            await this.emailService.sendPasswordResetEmail(
                user.email,
                resetURL,
                html,
            )
        } catch (error) {
            // Reset the token fields if email fails to send
            user.passwordResetToken = undefined
            user.passwordResetExpires = undefined
            await user.save()

            throw new InternalServerError(
                'There was an error sending the email. Please try again later.',
            )
        }
    }

    // Reset Password method
    async resetPassword(
        token: string,
        newPassword: string,
    ): Promise<LoginResponse> {
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex')
        const user = await this.userRepository.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        })

        if (!user) throw new BadRequestError('Invalid or expired token')

        user.password = await hashPassword(newPassword)
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save()

        const jwttoken = createJwtToken(user._id)

        return {
            token: jwttoken,
            user: {
                _id: user._id,
                fullname: user.fullname,
                role: user.role,
                active: user.active,
            },
        }
    }
}
