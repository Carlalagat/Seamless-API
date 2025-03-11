const prisma = require("../config/prismaClient");

exports.getAllMedia = async () => {
  return await prisma.media.findMany();
};

exports.getMediaById = async (id) => {
  return await prisma.media.findUnique({
    where: { id }
  });
};

exports.createMedia = async (mediaData) => {
  // Ensure we have the required fields
  if (!mediaData.product_id || !mediaData.user_id) {
    throw new Error("product_id and user_id are required");
  }
  
  return await prisma.media.create({
    data: {
      url: mediaData.url,
      type: mediaData.type,
      product: {
        connect: { id: mediaData.product_id }
      },
      user: {
        connect: { id: mediaData.user_id }
      }
    }
  });
};

exports.updateMediaById = async (id, mediaData) => {
  const updateData = {};
  
  if (mediaData.url) updateData.url = mediaData.url;
  if (mediaData.type) updateData.type = mediaData.type;
  
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
    await prisma.media.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false;
  }
};