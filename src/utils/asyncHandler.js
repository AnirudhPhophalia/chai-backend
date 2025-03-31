// Middleware to handle asynchronous route handlers and catch errors
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // Resolve the promise returned by the request handler and catch any errors
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}

// Export the asyncHandler function for use in other parts of the application
export { asyncHandler };




// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }