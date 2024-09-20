// import ValidationError from '@utils/validationError'
// import { NextFunction, Request, Response } from 'express'

// const validationMiddleware =
//     validationSchema => (req: Request, res: Response, next: NextFunction) => {
//         const { error } = validationSchema.validate(req.body)

//         if (error) {
//             const validationErrors = error.details.map(err => err.message)
//             next(new ValidationError(validationErrors))
//         } else {
//             next()
//         }
//     }

// export default validationMiddleware
