const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');


router.get('/', ordersController.getAllOrders);
router.delete('/:id', ordersController.deleteOrderById);
router.patch('/:id', ordersController.updateOrderById);
router.post('/', ordersController.createOrder);

module.exports = router;