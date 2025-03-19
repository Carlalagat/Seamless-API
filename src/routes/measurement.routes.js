const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurement.controller');

// If you plan to use validation middleware, you can add it here:
// const { validateBody } = require('../middlewares/validate.middleware');
// const { measurementSchema } = require('../dtos/measurement.dto'); // For example, using Joi

router.post('/', measurementController.createMeasurement); // Create a new measurement
router.get('/', measurementController.getAllMeasurements); // Get all measurements
router.get('/:userId', measurementController.getMeasurementByUserId); // Get a measurement by userId
router.put('/:userId', measurementController.updateMeasurementByUserId); // Update a user's measurement
router.delete('/:userId', measurementController.deleteMeasurementByUserId); // Delete a user's measurement

module.exports = router;
