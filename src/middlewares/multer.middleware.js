import multer from "multer"; // Import multer for handling file uploads

// Configure storage settings for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder for uploaded files
        cb(null, "./public/temp"); // Files will be stored in the "public/temp" directory
    },
    filename: function (req, file, cb) {
        // Set the filename for the uploaded file
        cb(null, file.originalname); // Use the original name of the file
    }
});

// Export the multer instance with the configured storage settings
export const upload = multer({ 
    storage, // Use the defined storage configuration
});