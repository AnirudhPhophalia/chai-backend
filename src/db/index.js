import mongoose from "mongoose";  
import { DB_NAME } from "../constants.js";  // Import the database name from constants.js

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the URI and database name
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);  // Log successful connection
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);  // Log an error if the connection fails
        process.exit(1)  // Exit the process with a failure code
    }
}

// Export the connectDB function for use in other parts of the application
export default connectDB