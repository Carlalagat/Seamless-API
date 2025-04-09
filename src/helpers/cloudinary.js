const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload a file to Cloudinary
 * @param {string} filePath - The file path or base64 encoded string
 * @param {Object} options - Cloudinary upload options
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadFile = async (filePath, options = {}) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, options);
        return result;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
    }
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - The public ID of the file to delete
 * @returns {Promise<Object>} - Cloudinary deletion result
 */
const deleteFile = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error(`Failed to delete from Cloudinary: ${error.message}`);
    }
};

/**
 * Get an optimized URL for an image
 * @param {string} publicId - The public ID of the image
 * @param {Object} options - Transformation options
 * @returns {string} - Optimized image URL
 */
const getOptimizedUrl = (publicId, options = {}) => {
    const defaultOptions = {
        fetch_format: 'auto',
        quality: 'auto'
    };
    
    return cloudinary.url(publicId, { ...defaultOptions, ...options });
};

module.exports = {
    uploadFile,
    deleteFile,
    getOptimizedUrl
};
