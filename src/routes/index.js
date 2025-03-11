const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const productRoutes = require('./products.routes');
const orderRoutes = require('./order.routes');
<<<<<<< HEAD
const mediaRoutes = require('./media.routes');
=======
const fabricRoutes = require('./fabric.routes');
>>>>>>> e59b288067b2855a14f221cd9700176b2a1f5024

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
<<<<<<< HEAD
router.use('/media', mediaRoutes);
=======
router.use('/fabric', fabricRoutes);
>>>>>>> e59b288067b2855a14f221cd9700176b2a1f5024

module.exports = router;
