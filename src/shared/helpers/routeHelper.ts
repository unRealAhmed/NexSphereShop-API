/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response, Router } from 'express'

type Middleware = (req: Request, res: Response, next: NextFunction) => void

export const createRoute = (
    router: Router,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    path: string,
    ...middlewares: Middleware[]
) => {
    return router[method](path, ...middlewares)
}
