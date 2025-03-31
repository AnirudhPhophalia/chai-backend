import express from "express"  // for creation of server
import cors from "cors"  // for retreiving data from different domains
import cookieParser from "cookie-parser"   // for parsing cookies

// Initialize the Express application
const app = express()

// Middleware for enabling CORS with specific origin and credentials
app.use(cors({
    origin: process.env.CORS_ORIGIN,  // domain from which requests are allowed
    credentials: true   // allow credentials (cookies, authorization headers, etc.) to be included in requests //necessory if frontend needs to send or receive cookies from backend
}))

// Middleware for parsing JSON and URL-encoded data with size limits
app.use(express.json({limit: "16kb"}))  // limit the size of JSON data to 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"})) // limit the size of URL-encoded data to 16kb

// Middleware to serve static files from the "public" directory
app.use(express.static("public"))  

// Middleware for parsing cookies
app.use(cookieParser())

// Routes import
import userRouter from './routes/user.routes.js'
import healthcheckRouter from "./routes/healthcheck.routes.js" 
import tweetRouter from "./routes/tweet.routes.js" 
import subscriptionRouter from "./routes/subscription.routes.js" 
import videoRouter from "./routes/video.routes.js" 
import commentRouter from "./routes/comment.routes.js" 
import likeRouter from "./routes/like.routes.js" 
import playlistRouter from "./routes/playlist.routes.js" 
import dashboardRouter from "./routes/dashboard.routes.js" 

// Routes declaration
// maps a specific URL path to a corresponding router module
app.use("/api/v1/healthcheck", healthcheckRouter) // Healthcheck API
app.use("/api/v1/users", userRouter) // User API
app.use("/api/v1/tweets", tweetRouter) // Tweet API
app.use("/api/v1/subscriptions", subscriptionRouter) 
app.use("/api/v1/videos", videoRouter) 
app.use("/api/v1/comments", commentRouter) 
app.use("/api/v1/likes", likeRouter) 
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter) 

// Export the app for use in other parts of the application
export { app }