import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { ID } from '../types'

interface ITokenPayload {
    id: ID
    fullname: string
    role: string
    active: boolean
    iat: number
    exp: number
}

// Helper to extract and validate user info from token
export function extractUserFromToken(
    req: Request,
): { userId: ID; fullname: string; role: string; active: boolean } | null {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1]

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY!,
            ) as unknown as ITokenPayload

            return {
                userId: decoded.id,
                fullname: decoded.fullname,
                role: decoded.role,
                active: decoded.active,
            }
        } catch (error) {
            return null // Token expired or invalid
        }
    }

    return null // No token found
}
