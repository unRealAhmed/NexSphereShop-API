// Middleware function for handling asynchronous operations
const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
    // Wrap the asynchronous function in a Promise and catch any errors
    // This allows asynchronous functions to be used in route handlers without explicit error handling
    Promise.resolve(fn(req, res, next)).catch(next)
}

// Export the asyncHandler for use in route handlers
export default asyncHandler
