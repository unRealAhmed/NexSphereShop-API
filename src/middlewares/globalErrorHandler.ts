/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { CustomError } from '../shared/errors/CustomError'

export const globalErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            status: 'fail',
            errors: err.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message,
            })),
        })
    }

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    console.error('Unexpected Error:', err)

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    })
}
