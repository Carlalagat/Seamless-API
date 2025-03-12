const prisma = require("../config/prismaClient");

exports.createProduct = async (productData) => {
  return await prisma.product.create({
    data: productData,
  });
};

exports.getAllProducts = async () => {
  return await prisma.product.findMany();
};


exports.getProductById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid product id");
  }
  return await prisma.product.findUnique({
    where: { id },
  });
};


exports.deleteProductById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid product id");
  }
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return await prisma.product.delete({
    where: { id },
  });
};



exports.updateProductById = async (id, productData) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid product id");
  }
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return await prisma.product.update({
      where: { id },
      data: productData,
    });
  } catch (error) {
    console.error("Error in updating product by ID:", error);
    throw new Error("Error in updating product by ID");
  }
};