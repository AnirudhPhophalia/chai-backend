import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary v2 for file uploads
import fs from "fs"; // Import file system module to handle file operations

// Configure Cloudinary with credentials from environment variables
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET // Cloudinary API secret
});

// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null; // Return null if no file path is provided

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically detect the file type
        });

        // Remove the local file after successful upload
        fs.unlinkSync(localFilePath);

        return response; // Return the Cloudinary response
    } catch (error) {
        // Remove the local file if the upload fails
        fs.unlinkSync(localFilePath);
        return null; // Return null in case of an error
    }
}

// Export the uploadOnCloudinary function for use in other parts of the application
export { uploadOnCloudinary };