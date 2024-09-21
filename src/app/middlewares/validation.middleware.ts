import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validate =
    (
        schema: Partial<{
            body: AnyZodObject
            params: AnyZodObject
            query: AnyZodObject
        }>,
    ) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schema.body) schema.body.parse(req.body)
            if (schema.params) schema.params.parse(req.params)
            if (schema.query) schema.query.parse(req.query)

            next()
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    status: 'fail',
                    errors: err.errors.map(e => ({
                        field: e.path.join('.'),
                        message: e.message,
                    })),
                })
            }
            next(err)
        }
    }
