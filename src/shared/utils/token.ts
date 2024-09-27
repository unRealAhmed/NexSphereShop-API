import jwt from 'jsonwebtoken'
import { ID } from '../types/id.type'

export function createJwtToken(userId: ID, role: string): string {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET_KEY!, {
        expiresIn: '1h',
    })
}

export function verifyJwtToken(token: string): unknown {
    return jwt.verify(token, process.env.JWT_SECRET_KEY!)
}
