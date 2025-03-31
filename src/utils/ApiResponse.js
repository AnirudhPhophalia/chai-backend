// Class to structure API responses in a consistent format
class ApiResponse { // Constructor to initialize the response object
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode; // HTTP status code of the response
        this.data = data; // Data to be sent in the response
        this.message = message; // Message describing the response
        this.success = statusCode < 400; // Determine success based on the status code
    }
}

// Export the ApiResponse class for use in other parts of the application
export { ApiResponse };