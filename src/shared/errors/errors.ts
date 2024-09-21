import { Response } from 'express'
import { CustomError } from './CustomError'

export class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
        super(message, 404)
    }
}

export class BadRequestError extends CustomError {
    constructor(message = 'Bad request') {
        super(message, 400)
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message = 'Unauthorized', res?: Response) {
        super(message, 401)
    }
}

export class ForbiddenError extends CustomError {
    constructor(
        message = 'Forbidden: You do not have permission to perform this action.',
    ) {
        super(message, 403)
    }
}

export class ConflictError extends CustomError {
    constructor(message = 'Conflict') {
        super(message, 409)
    }
}

export class InternalServerError extends CustomError {
    constructor(message = 'Internal Server Error') {
        super(message, 500)
    }
}
