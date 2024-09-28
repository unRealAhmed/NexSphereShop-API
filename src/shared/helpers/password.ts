import bcrypt from 'bcryptjs'

export const hashPassword = function (password: string) {
    return bcrypt.hash(password, 12)
}

export const comparePassword = function (
    plainPassword: string,
    hashedPassword: string,
) {
    return bcrypt.compare(plainPassword, hashedPassword)
}
