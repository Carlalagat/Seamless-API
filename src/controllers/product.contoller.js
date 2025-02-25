const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        reviews: true,
        media: true
      }
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: true,
        media: true
      }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProducts = async (req, res) => {
  try {
    // Extract the main product data
    const { 
      fabric_id, 
      productName, 
      description, 
      price, 
      location, 
      tailorName, 
      reviews,
      media
    } = req.body;

    // Create the product with nested creates for reviews and media
    const product = await prisma.product.create({
      data: {
        fabric_id,
        productName,
        description,
        price: typeof price === 'string' ? parseFloat(price) : price,
        location,
        tailorName,
        // If reviews are provided, connect or create them
        ...(reviews && reviews.length > 0 && {
          reviews: {
            create: reviews.map(review => ({
              id: review.id,
              rating: typeof review.rating === 'string' ? parseFloat(review.rating) : review.rating,
              comment: review.comment,
              user: {
                connect: { id: review.reviewer || req.body.user_id || "default-user-id" }
              }
            }))
          }
        }),
        // If media are provided, connect or create them
        ...(media && media.length > 0 && {
          media: {
            create: media.map(item => ({
              url: item.url,
              type: item.type.toUpperCase(),
              user: {
                connect: { id: req.body.user_id || "default-user-id" }
              }
            }))
          }
        })
      },
      include: {
        reviews: true,
        media: true
      }
    });
    
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: req.body,
      include: {
        reviews: true,
        media: true
      }
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id }
    });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProducts,
  updateProduct,
  deleteProduct,
};