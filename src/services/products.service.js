const prisma = require("../config/prismaClient");

exports.getAllProducts = async () => {
  return await prisma.product.findMany();
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



exports.createProduct = async (productData) => {
  return await prisma.product.create({
    data: productData,
  });
};
