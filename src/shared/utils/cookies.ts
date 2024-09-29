import { Response } from 'express'

export function setCookieToken(res: Response, token: string): void {
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict' as const,
        maxAge: 60 * 60 * 1000,
    }

    res.cookie('jwt', token, options)
}

export function clearCookieToken(res: Response): void {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    })
    res.clearCookie('refreshJwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    })
}
