import dotenv from "dotenv"  // Import dotenv to load environment variables from a .env file
import connectDB from "./db/index.js";  // Import the database connection function
import { app } from './app.js'  // Import the Express app instance that we exported in app.js

// Load environment variables from the .env file
dotenv.config({
    path: './.env'  // Specify the path to the .env file
})

// Connect to the database and start the server
connectDB()
.then(() => {    //then is used to handle the promise returned by connectDB
    // Start the server on the specified port
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);  // Log the server's running status
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);  // Log an error if the database connection fails
})

/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/