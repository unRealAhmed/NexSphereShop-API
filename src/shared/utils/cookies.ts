import { Response } from 'express'

export function setCookieToken(res: Response, token: string): void {
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Set secure cookies in production
        sameSite: 'strict' as const,
        maxAge: 60 * 60 * 1000,
    }

    res.cookie('jwt', token, options)
}

export function clearCookieToken(res: Response): void {
    res.cookie('jwt', 'loggedout', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 5 * 1000, // Expire in 5 seconds
    })
}
