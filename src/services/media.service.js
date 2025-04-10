const prisma = require("../config/prismaClient");
const cloudinaryService = require("../helpers/cloudinary");
const { Readable } = require('stream');
const fs = require('fs');
const os = require('os');
const path = require('path');

exports.getAllMedia = async () => {
  return await prisma.media.findMany();
};

exports.getMediaByProductId = async (productId) => {
  return await prisma.media.findMany({
    where: { product_id: productId }
  });
};

exports.getMediaById = async (id) => {
  return await prisma.media.findUnique({
    where: { id }
  });
};

/**
 * Create a media entry from a buffer (memory) without saving to disk
 * @param {Object} mediaData - Media data including product_id, user_id, type, purpose
 * @param {Buffer} buffer - File buffer
 * @param {String} originalFilename - Original filename
 * @returns {Promise<Object>} Created media object
 */
exports.createMediaFromBuffer = async (mediaData, buffer, originalFilename) => {
  // Ensure we have the required fields
  if (!mediaData.product_id) {
    throw new Error("product_id is required");
  }
  
  try {
    // First, verify that the product exists
    const productExists = await prisma.product.findUnique({
      where: { id: mediaData.product_id }
    });
    
    if (!productExists) {
      throw new Error(`Product with ID ${mediaData.product_id} does not exist`);
    }
    
    // Create a temporary file
    const tempFilePath = path.join(os.tmpdir(), `temp_${Date.now()}_${originalFilename}`);
    fs.writeFileSync(tempFilePath, buffer);
    
    // Upload to Cloudinary
    const options = {
      resource_type: mediaData.type === 'VIDEO' ? 'video' : 'image',
      folder: 'seamless_products'
    };
    
    const uploadResult = await cloudinaryService.uploadFile(tempFilePath, options);
    
    // Delete temporary file
    fs.unlinkSync(tempFilePath);
    
    // Create the media entry in database
    const mediaCreateData = {
      url: uploadResult.secure_url,
      type: mediaData.type || 'IMAGE',
      product: {
        connect: { id: mediaData.product_id }
      }
    };
    
    // Add purpose as enum value properly
    if (mediaData.purpose) {
      mediaCreateData.purpose = mediaData.purpose;
    }
    
    // Add user connection only if user_id is provided
    if (mediaData.user_id) {
      // Verify that the user exists too
      const userExists = await prisma.user.findUnique({
        where: { id: mediaData.user_id }
      });
      
      if (!userExists) {
        throw new Error(`User with ID ${mediaData.user_id} does not exist`);
      }
      
      mediaCreateData.user = {
        connect: { id: mediaData.user_id }
      };
    }
    
    return await prisma.media.create({
      data: mediaCreateData
    });
  } catch (error) {
    console.error("Error creating media from buffer:", error);
    throw new Error(`Failed to create media: ${error.message}`);
  }
};

exports.createMedia = async (mediaData, file) => {
  // Ensure we have the required fields
  if (!mediaData.product_id) {
    throw new Error("product_id is required");
  }

  let uploadResult;
  // If a file is provided, upload to Cloudinary
  if (file) {
    const options = {
      resource_type: mediaData.type === 'VIDEO' ? 'video' : 'image',
      folder: 'seamless_products'
    };
    uploadResult = await cloudinaryService.uploadFile(file.path, options);
    mediaData.url = uploadResult.secure_url;
    
    // Delete the local file after upload
    try {
      fs.unlinkSync(file.path);
    } catch (err) {
      console.error("Error deleting temporary file:", err);
    }
  } else if (!mediaData.url) {
    throw new Error("Either file or url is required");
  }
  
  // Create the basic media data
  const mediaCreateData = {
    url: mediaData.url,
    type: mediaData.type || 'IMAGE',
    product: {
      connect: { id: mediaData.product_id }
    }
  };
  
  // Add purpose properly
  if (mediaData.purpose) {
    mediaCreateData.purpose = mediaData.purpose;
  }
  
  // Add user connection only if user_id is provided
  if (mediaData.user_id) {
    mediaCreateData.user = {
      connect: { id: mediaData.user_id }
    };
  }
  
  return await prisma.media.create({
    data: mediaCreateData
  });
};

exports.createMultipleMedia = async (mediaItems) => {
  // For bulk creation of media records
  const createdMedia = [];
  
  for (const item of mediaItems) {
    // If file is a buffer, use createMediaFromBuffer
    if (item.file && item.file.buffer) {
      const media = await this.createMediaFromBuffer(
        item,
        item.file.buffer,
        item.file.originalname
      );
      createdMedia.push(media);
    } else {
      const media = await this.createMedia(item, item.file);
      createdMedia.push(media);
    }
  }
  
  return createdMedia;
};

exports.updateMediaById = async (id, mediaData, file) => {
  const updateData = {};
  
  // If a file is provided, upload to Cloudinary
  if (file) {
    // First get the existing media to potentially delete the old file
    const existingMedia = await this.getMediaById(id);
    if (existingMedia) {
      // Extract public ID from the URL (this depends on your Cloudinary URL structure)
      const publicId = existingMedia.url.split('/').pop().split('.')[0];
      // Delete the old file
      await cloudinaryService.deleteFile(publicId);
    }
    
    const options = {
      resource_type: mediaData.type === 'VIDEO' ? 'video' : 'image',
      folder: 'seamless_products'
    };
    
    // Handle buffer or file path based on what's provided
    let uploadResult;
    if (file.buffer) {
      // Create temp file from buffer
      const tempFilePath = path.join(os.tmpdir(), `temp_${Date.now()}_${file.originalname}`);
      fs.writeFileSync(tempFilePath, file.buffer);
      
      uploadResult = await cloudinaryService.uploadFile(tempFilePath, options);
      
      // Delete temp file
      fs.unlinkSync(tempFilePath);
    } else {
      uploadResult = await cloudinaryService.uploadFile(file.path, options);
      
      // Delete the local file after upload
      try {
        fs.unlinkSync(file.path);
      } catch (err) {
        console.error("Error deleting temporary file:", err);
      }
    }
    
    updateData.url = uploadResult.secure_url;
  } else if (mediaData.url) {
    updateData.url = mediaData.url;
  }
  
  if (mediaData.type) updateData.type = mediaData.type;
  if (mediaData.purpose) updateData.purpose = mediaData.purpose;
  
  if (mediaData.product_id) {
    updateData.product = {
      connect: { id: mediaData.product_id }
    };
  }
  
  if (mediaData.user_id) {
    updateData.user = {
      connect: { id: mediaData.user_id }
    };
  }
  
  return await prisma.media.update({
    where: { id },
    data: updateData
  });
};

exports.deleteMediaById = async (id) => {
  try {
    // Get media information to delete from Cloudinary
    const media = await this.getMediaById(id);
    if (media) {
      // Extract public ID from the URL
      const publicId = media.url.split('/').pop().split('.')[0];
      // Delete from Cloudinary
      await cloudinaryService.deleteFile(publicId);
    }
    
    // Delete from database
    await prisma.media.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    console.error('Error deleting media:', error);
    return false;
  }
};
