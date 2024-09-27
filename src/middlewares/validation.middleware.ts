import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodEffects, ZodError } from 'zod'

type ZodSchema = AnyZodObject | ZodEffects<AnyZodObject>

export const validate =
    (
        schema: Partial<{
            body: ZodSchema
            params: ZodSchema
            query: ZodSchema
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
                return next(err)
            }
            next(err)
        }
    }
