const prisma = require("../config/prismaClient");
const mediaService = require("./media.service");

exports.createProduct = async (productData, mediaFiles = []) => {
  // Validate user exists
  const user = await prisma.user.findUnique({
    where: { id: productData.user_id }
  });
  
  if (!user) {
    throw new Error("User not found. Only existing users can create products.");
  }
  
  try {
    // Create product with fabric in a transaction with increased timeout
    const productResult = await prisma.$transaction(async (prismaClient) => {
      // First create the fabric
      const fabric = await prismaClient.fabric.create({
        data: {
          // Include any fabric data if provided
          fabricTypes: {
            create: productData.fabricTypes || []
          }
        }
      });
  
      // Create the product with the new fabric_id
      const product = await prismaClient.product.create({
        data: {
          fabric_id: fabric.id,
          productName: productData.productName,
          description: productData.description,
          price: parseFloat(productData.price),
          location: productData.location,
          user_id: productData.user_id,
          tailorName: productData.tailorName
        },
      });
      
      console.log("Created product with ID:", product.id);
      
      return product;
    }, {
      timeout: 15000 // Increase timeout to 15 seconds for product creation part
    });
    
    // Handle media uploads outside the transaction to avoid timeout issues
    if (mediaFiles.length > 0) {
      for (const file of mediaFiles) {
        // Determine the media type and purpose
        const mediaType = file.mimetype.startsWith('video/') ? 'VIDEO' : 'IMAGE';
        const mediaPurpose = file.fieldname.includes('measurement') ? 'MEASUREMENT_GUIDE' : 
                           file.fieldname.includes('detail') ? 'PRODUCT_DETAIL' : 'PRODUCT_DISPLAY';
                           
        // Prepare data for media service
        const mediaData = {
          product_id: productResult.id,
          user_id: productData.user_id,
          type: mediaType,
          purpose: mediaPurpose
        };
        
        // Create media entry with direct upload to Cloudinary
        try {
          await mediaService.createMediaFromBuffer(mediaData, file.buffer, file.originalname);
        } catch (mediaError) {
          console.error("Error creating media for product:", productResult.id, mediaError);
          // Continue with other media even if one fails
        }
      }
    }
    
    // Fetch the complete product with its related data after all operations
    return await prisma.product.findUnique({
      where: { id: productResult.id },
      include: {
        media: true,
        fabric: {
          include: {
            fabricTypes: true
          }
        },
        reviews: true
      }
    });
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw error;
  }
};

exports.getAllProducts = async () => {
  return await prisma.product.findMany({
    include: {
      media: true,
      fabric: true,
    },
  });
};

exports.getProductById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid product id");
  }
  return await prisma.product.findUnique({
    where: { id },
    include: {
      media: true,
      fabric: {
        include: {
          fabricTypes: true
        }
      },
      reviews: true
    }
  });
};

exports.deleteProductById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid product id");
  }
  
  // Get the product with its media
  const product = await prisma.product.findUnique({
    where: { id },
    include: { media: true }
  });
  
  if (!product) {
    throw new Error("Product not found");
  }
  
  // Delete in a transaction to ensure data consistency
  return await prisma.$transaction(async (prismaClient) => {
    // Delete associated media first (including from Cloudinary)
    for (const media of product.media) {
      await mediaService.deleteMediaById(media.id);
    }
    
    // Then delete the product
    return await prismaClient.product.delete({
      where: { id },
    });
  }, {
    timeout: 15000 // Increase timeout to 15 seconds for deletion
  });
};

exports.updateProductById = async (id, productData, mediaFiles = []) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid product id");
  }
  
  try {
    // Verify the product exists
    const product = await prisma.product.findUnique({
      where: { id },
    });
    
    if (!product) {
      throw new Error("Product not found");
    }
    
    // If user_id is provided, verify the user exists
    if (productData.user_id) {
      const user = await prisma.user.findUnique({
        where: { id: productData.user_id }
      });
      
      if (!user) {
        throw new Error("User not found. Only existing users can update products.");
      }
    }
    
    // Update product data in a transaction
    const updatedProduct = await prisma.$transaction(async (prismaClient) => {
      return await prismaClient.product.update({
        where: { id },
        data: {
          ...(productData.fabric_id && { fabric_id: productData.fabric_id }),
          ...(productData.productName && { productName: productData.productName }),
          ...(productData.description && { description: productData.description }),
          ...(productData.price && { price: parseFloat(productData.price) }),
          ...(productData.location && { location: productData.location }),
          ...(productData.tailorName && { tailorName: productData.tailorName })
        }
      });
    }, {
      timeout: 10000 // 10 seconds timeout for update transaction
    });
    
    // Handle media files outside transaction
    if (mediaFiles.length > 0) {
      for (const file of mediaFiles) {
        // Determine the media type and purpose
        const mediaType = file.mimetype.startsWith('video/') ? 'VIDEO' : 'IMAGE';
        const mediaPurpose = file.fieldname.includes('measurement') ? 'MEASUREMENT_GUIDE' : 
                           file.fieldname.includes('detail') ? 'PRODUCT_DETAIL' : 'PRODUCT_DISPLAY';
                           
        // Prepare data for media service
        const mediaData = {
          product_id: id,
          user_id: productData.user_id,
          type: mediaType,
          purpose: mediaPurpose
        };
        
        try {
          // Create media with direct upload to Cloudinary
          await mediaService.createMediaFromBuffer(mediaData, file.buffer, file.originalname);
        } catch (mediaError) {
          console.error("Error creating media for product:", id, mediaError);
          // Continue with other media even if one fails
        }
      }
    }
    
    // Return the updated product with its media
    return await prisma.product.findUnique({
      where: { id },
      include: {
        media: true,
        fabric: {
          include: {
            fabricTypes: true
          }
        },
        reviews: true
      }
    });
  } catch (error) {
    console.error("Error in updating product by ID:", error);
    throw new Error(`Error in updating product by ID: ${error.message}`);
  }
};
