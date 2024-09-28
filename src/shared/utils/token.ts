import crypto from 'crypto'
import { Response } from 'express'
import jwt from 'jsonwebtoken'

import { ID } from '../types/id.type'

export function createJwtToken(userId: ID, role: string): string {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET_KEY!, {
        expiresIn: '15m',
    })
}

export function createRefreshToken(userId: ID, role: string): string {
    return jwt.sign({ id: userId, role }, process.env.JWT_REFRESH_SECRET_KEY!, {
        expiresIn: '15d',
    })
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
            id: ID
            role: string
        }
    } catch (error) {
        return null
    }
}

export function verifyRefreshToken(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY!) as {
            id: ID
            role: string
        }
    } catch {
        return null
    }
}

export function setTokensOnResponse(
    res: Response,
    accessToken: string,
    refreshToken: string,
): void {
    res.cookie('jwt', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, // 15 minutes
    })
    res.cookie('refreshJwt', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    })
}

export function createPasswordResetToken(): {
    resetToken: string
    hashedToken: string
    expiresAt: Date
} {
    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    return { resetToken, hashedToken, expiresAt }
}
