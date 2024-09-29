import crypto from 'crypto'
import { Response } from 'express'
import { UserRepository } from '../../repositories'
import { RefreshTokenRepository } from '../../repositories/refreshToken.repository'
import {
    BadRequestError,
    ConflictError,
    NotFoundError,
    UnauthorizedError,
} from '../../shared/errors/errors'
import { EmailService } from '../../shared/helpers/email'
import { comparePassword, hashPassword } from '../../shared/helpers/password'
import { ID } from '../../shared/types'
import { resetHtmlTemplate } from '../../shared/utils'
import { clearCookieToken } from '../../shared/utils/cookies'
import {
    createJwtToken,
    createPasswordResetToken,
    createRefreshToken,
    setTokensOnResponse,
    verifyRefreshToken,
} from '../../shared/utils/token'
import {
    LoginResponse,
    ResetPasswordBody,
    SignUpBody,
    SignUpResponse,
} from './auth.types'

export class AuthService {
    private userRepository: UserRepository
    private refreshTokenRepository: RefreshTokenRepository
    private emailService: EmailService

    constructor() {
        this.userRepository = new UserRepository()
        this.emailService = new EmailService()
        this.refreshTokenRepository = new RefreshTokenRepository()
    }

    // Sign up a new user
    async signUp(data: SignUpBody, res: Response): Promise<SignUpResponse> {
        const { email } = data
        if (email) {
            const existingUser = await this.userRepository.findOne({ email })
            if (existingUser) {
                throw new ConflictError('Email already exists')
            }
        }

        const user = this.userRepository.init(data)
        user.password = await hashPassword(data.password)
        user.passwordConfirm = undefined

        const newUser = await this.userRepository.create(user)

        const accessToken = createJwtToken(newUser._id, newUser.role)
        const refreshToken = createRefreshToken(newUser._id, user.role)

        await this.refreshTokenRepository.create({
            userId: newUser._id,
            token: refreshToken,
        })

        setTokensOnResponse(res, accessToken, refreshToken)

        return {
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            role: newUser.role,
            active: newUser.active,
            hasShippingAddress: newUser.hasShippingAddress,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            accessToken,
            refreshToken,
        }
    }

    async login(
        email: string,
        password: string,
        res: Response,
    ): Promise<LoginResponse> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new BadRequestError('Wrong email or password')

        const isPasswordCorrect = await comparePassword(password, user.password)
        if (!isPasswordCorrect)
            throw new BadRequestError('Wrong email or password')

        const accessToken = createJwtToken(user._id, user.role)
        const refreshToken = createRefreshToken(user._id, user.role)

        await this.refreshTokenRepository.create({
            userId: user._id,
            token: refreshToken,
        })

        // Set tokens in cookies
        setTokensOnResponse(res, accessToken, refreshToken)

        return {
            accessToken,
            refreshToken,
            user: {
                _id: user._id,
                fullname: user.fullname,
                role: user.role,
                active: user.active,
            },
        }
    }

    async logout(userId: ID, res: Response): Promise<void> {
        await this.refreshTokenRepository.deleteByUserId(userId)
        clearCookieToken(res)
    }

    async refreshToken(
        oldRefreshToken: string,
        res: Response,
    ): Promise<LoginResponse> {
        const tokenPayload = verifyRefreshToken(oldRefreshToken)
        if (!tokenPayload) throw new UnauthorizedError('Invalid refresh token')

        const { id: userId } = tokenPayload

        const user = await this.userRepository.findById(userId)
        if (!user) throw new NotFoundError('User not found')

        const storedRefreshToken = await this.refreshTokenRepository.findOne({
            userId,
            token: oldRefreshToken,
        })
        if (!storedRefreshToken) {
            throw new UnauthorizedError('Refresh token is not valid')
        }

        const newAccessToken = createJwtToken(user._id, user.role)
        const newRefreshToken = createRefreshToken(user._id, user.role)

        await this.refreshTokenRepository.findOneAndUpdate(
            { _id: storedRefreshToken._id },
            { token: newRefreshToken },
        )

        setTokensOnResponse(res, newAccessToken, newRefreshToken)

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user: {
                _id: user._id,
                fullname: user.fullname,
                role: user.role,
                active: user.active,
            },
        }
    }

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

    async resetPassword(
        token: string,
        data: ResetPasswordBody,
    ): Promise<LoginResponse> {
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex')
        const user = await this.userRepository.findByResetToken({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        })

        if (!user) throw new BadRequestError('Invalid or expired token')

        user.password = await hashPassword(data.password)
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save()

        const jwttoken = createJwtToken(user._id, user.role)

        return {
            accessToken: jwttoken,
            refreshToken: jwttoken,
            user: {
                _id: user._id,
                fullname: user.fullname,
                role: user.role,
                active: user.active,
            },
        }
    }
}
