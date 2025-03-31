// Custom error class to handle API errors
class ApiError extends Error {
    constructor(
        statusCode, // HTTP status code for the error
        message = "Something went wrong", // Default error message
        errors = [], // Additional error details (e.g., validation errors)
        stack = "" // Optional stack trace for debugging
    ) {
        super(message); // Call the parent class (Error) constructor with the error message
        this.statusCode = statusCode; // Set the HTTP status code
        this.data = null; // Placeholder for any additional data (can be set later)
        this.message = message; // Set the error message
        this.success = false; // Indicate that the operation was not successful
        this.errors = errors; // Store additional error details

        if (stack) {
            this.stack = stack; // Use the provided stack trace if available
        } else {
            Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
        }
    }
}

// Export the ApiError class for use in other parts of the application
export { ApiError };