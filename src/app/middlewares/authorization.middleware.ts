import { NextFunction, Request, Response } from 'express'
import { ForbiddenError, UnauthorizedError } from '../../shared/errors/errors'
import { extractUserFromToken } from '../../shared/helpers/auth'

export function authorizeRoles(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = extractUserFromToken(req)

        if (!user) {
            throw new UnauthorizedError()
        }

        if (!allowedRoles.includes(user.role)) {
            throw new ForbiddenError()
        }

        res.locals.user = user

        next()
    }
}
