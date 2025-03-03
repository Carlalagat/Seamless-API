const express = require('express');
const router = express.Router();
const userController = require('../controllers/products.controller');


router.get('/', productsController.getAllProducts);
router.delete('/:id', productsController.deleteProductById);
router.patch('/:id', productsController.updateProductById);
router.post('/', productsController.createProduct);

module.exports = router;