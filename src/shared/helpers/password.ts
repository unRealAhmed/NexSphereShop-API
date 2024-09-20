import bcrypt from 'bcryptjs'
import crypto from 'crypto'

export const hashPassword = function (password: string) {
    return bcrypt.hash(password, 12)
}

export const comparePassword = function (
    plainPassword: string,
    hashedPassword: string,
) {
    return bcrypt.compare(plainPassword, hashedPassword)
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
