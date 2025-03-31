import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt" // to hash password

const userSchema = new Schema(  // Schema constructor is used to create a new schema object
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId, // Reference to a Video document
                ref: "Video" // Reference the "Video" model
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String // Refresh token for authentication
        }
    },
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
);

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip if the password is not modified

    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt of 10 rounds
    next(); // Proceed to the next middleware
});

// Method to check if the provided password matches the hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password); // Compare the passwords
};

// Method to generate an access token for the user
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id, // Include user ID in the token payload
            email: this.email, 
            username: this.username, 
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET, // Use the access token secret
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Set the token expiry time
        }
    );
};

// Method to generate a refresh token for the user
userSchema.methods.generateRefreshToken = function () {
    //SYNTAX: jwt.sign(payload, secretOrPrivateKey, [options, callback])
    return jwt.sign( 
        {
            _id: this._id // Include user ID in the token payload
            //ANOTHER WAY: user id can also be implemeted by {_id:"12345"}
            // for including e-mail also you can write email: this.email
        },
        process.env.REFRESH_TOKEN_SECRET, // Use the refresh token secret
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // OPTIONS: Set the token expiry time
        }
    );
};

// Export the User model based on the user schema
export const User = mongoose.model("User", userSchema);