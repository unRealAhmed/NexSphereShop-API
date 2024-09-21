import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserRepository } from '../../repositories'
import { UnauthorizedError } from '../../shared/errors/errors'
import { ID } from '../../shared/types'
interface ITokenPayload {
    id: ID
    fullname: string
    role: string
    active: boolean
    iat: number
    exp: number
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user?: {
                userId: ID
                fullname: string
                role: string
                active: boolean
            }
        }
    }
}

export async function extractUserFromToken(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    let token: string | undefined
    const userRepository = new UserRepository()
    // Check Authorization header first
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]
    }

    if (!token && req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if (!token) {
        return next(new UnauthorizedError('Invalid token', res))
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY!,
        ) as ITokenPayload

        const user = await userRepository.findById(decoded.id)
        if (!user || !user.active) {
            return next(
                new UnauthorizedError('User not found or inactive', res),
            )
        }

        req.user = {
            userId: user._id,
            fullname: user.fullname,
            role: user.role,
            active: user.active,
        }

        return next()
    } catch (error) {
        return next(new UnauthorizedError('Invalid or expired token', res))
    }
}
