import { ApiError } from "../utils/ApiError.js"; // Import custom API error class
import { asyncHandler } from "../utils/asyncHandler.js"; // Import async handler to handle errors in async functions
import jwt from "jsonwebtoken"; // Import JSON Web Token library for token verification
import { User } from "../models/user.model.js"; // Import the User model

// Middleware to verify JSON Web Token (JWT)
export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Retrieve the token from cookies or the Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            // Throw an error if no token is provided
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user associated with the token and exclude sensitive fields
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            // Throw an error if the user is not found
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach the user object to the request for further use
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Throw an error if token verification fails
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});