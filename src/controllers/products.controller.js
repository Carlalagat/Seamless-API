const productService = require('../services/products.service');
const { CreateProductDto, UpdateProductDto } = require('../dto/product.dto');

exports.getAllProducts = async (req, res, next) => {
  try {
    const product= await productService.getAllProducts();
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
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
    const productData = new CreateProductDto(req.body);
    
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};


exports.updateProductById  = async (req, res, next) => {
  try {
    const productData = new UpdateProductDto(req.body);
    const newProduct = await productService.updateProductById(
      req.params.id,
      productData);

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

