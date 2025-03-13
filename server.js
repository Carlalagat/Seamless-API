require('dotenv').config();
const express = require('express');
const app = require('./app'); // Assuming you have app setup in a separate file like app.js
const measurementRoutes = require('./src/routes/measurement.routes'); // Import your measurement routes

// Middleware for parsing JSON bodies
app.use(express.json());  // Using express built-in middleware for JSON parsing

// Use the measurement routes for all routes related to measurements
app.use('/api/measurements', measurementRoutes);

// Default port from environment variable or fallback to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
