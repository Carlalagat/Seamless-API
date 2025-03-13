const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const productRoutes = require('./products.routes');
const orderRoutes = require('./order.routes');
const fabricRoutes = require('./fabric.routes');
const reviewRoutes = require('./review.routes');
const fabrictypeRoutes = require('./fabrictype.routes');
const measurementRoutes = require('./measurement.routes');


router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/fabric', fabricRoutes);
router.use('/review', reviewRoutes);
router.use('/fabrictypes', fabrictypeRoutes);
router.use('/measurement', measurementRoutes);


module.exports = router;
