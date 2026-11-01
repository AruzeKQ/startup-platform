require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// 1. Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Cấu hình Multer 
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 15 * 1024 * 1024,
    },
});

// 3. Hàm helper upload file buffer lên Cloudinary
const uploadToCloudinary = (fileBuffer, originalname, folderName = 'startup_documents') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folderName,
                resource_type: 'auto',
                use_filename: true,
                filename_override: originalname,
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    });
};

module.exports = {
    cloudinary,
    upload,
    uploadToCloudinary,
};