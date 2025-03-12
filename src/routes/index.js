const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const measurementRoutes = require('./measurement.routes');  // Import measurement routes

// Define routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/api/measurements', measurementRoutes);  // Use measurement routes

module.exports = router;
