import jwt from 'jsonwebtoken'
import { ID } from '../types/id.type'

export function createJwtToken(userId: ID): string {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY!, {
        expiresIn: '1h',
    })
}

export function verifyJwtToken(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET_KEY!)
}
