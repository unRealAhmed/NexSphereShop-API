class ValidationError extends Error {
    constructor(errors: any) {
        super('Validation failed')
        this.name = 'ValidationError'
        // this.statusCode = 400
        // this.errors = errors
    }
}

export default ValidationError
