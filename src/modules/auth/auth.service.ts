import crypto from 'crypto'
import { Response } from 'express'
import { UserRepository } from '../../repositories'
import {
    BadRequestError,
    ConflictError,
    NotFoundError,
} from '../../shared/errors/errors'
import { EmailService } from '../../shared/helpers/email'
import {
    comparePassword,
    createPasswordResetToken,
    hashPassword,
} from '../../shared/helpers/password'
import { resetHtmlTemplate } from '../../shared/utils'
import { clearCookieToken, setCookieToken } from '../../shared/utils/cookies'
import { createJwtToken } from '../../shared/utils/token'
import { LoginResponse, SignUpBody, SignUpResponse } from './auth.types'

export class AuthService {
    private userRepository: UserRepository
    // private userService: UserService
    private emailService: EmailService

    constructor() {
        this.userRepository = new UserRepository()
        this.emailService = new EmailService()
        // this.userService = new UserService()
    }

    // Sign up a new user
    async signUp(data: SignUpBody, res: Response): Promise<SignUpResponse> {
        const { email } = data
        if (email) {
            const existingUser = await this.userRepository.findOne({ email })
            console.log(existingUser)
            if (existingUser) {
                throw new ConflictError('Email already exists')
            }
        }

        const user = this.userRepository.init(data)
        user.password = await hashPassword(data.password)
        const newUser = await this.userRepository.create(user)

        const token = createJwtToken(user._id, user.role)
        setCookieToken(res, token)

        return {
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            role: newUser.role,
            active: newUser.active,
            hasShippingAddress: newUser.hasShippingAddress,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            token,
        }
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

        const token = createJwtToken(user._id, user.role)
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
        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new NotFoundError('User with this email not found')

        const { resetToken, hashedToken, expiresAt } =
            createPasswordResetToken()
        user.passwordResetToken = hashedToken
        user.passwordResetExpires = expiresAt
        await user.save()

        const resetURL = `${protocol}://${host}/api/v1/users/resetPassword/${resetToken}`
        const html = resetHtmlTemplate(resetURL)

        this.emailService.sendPasswordResetEmail(user.email, resetURL, html)
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

        const jwttoken = createJwtToken(user._id, user.role)

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
