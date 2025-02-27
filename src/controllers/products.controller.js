const productService = require('../services/product.service');
const { CreateProductDto } = require('../dto/product.dto');

exports.getAllProducts = async (req, res, next) => {
  try {
    const product= await productService.getAllProducts();
    res.json(product);
  } catch (error) {
    next(error);
  }
};


exports.deleteProductById = async (req, res, next) => {
  try {
    console.log('Received ID:', req.params.id);
    const product = await productService.deleteProductById(req.params.id);
    res.json({ message: 'product deleted successfully', product });
  } catch (error) {
    next(error);
  }
};


exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};


exports.updateProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.updateProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

