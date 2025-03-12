const measurementService = require("../services/measurement.service"); // Import the service
const { CreateMeasurementDto, UpdateMeasurementDto } = require("../dto/measurement.dto"); // Assuming DTO for validation

// Create a new measurement
exports.createMeasurement = async (req, res, next) => {
  try {
    const measurementData = new CreateMeasurementDto(req.body);  // Create DTO instance from request body
    const newMeasurement = await measurementService.createMeasurement(measurementData);  // Call service to create measurement
    res.status(201).json(newMeasurement);  // Return the newly created measurement
  } catch (error) {
    next(error);  // Pass the error to the error handling middleware
  }
};

// Get all measurements
exports.getAllMeasurements = async (req, res, next) => {
  try {
    const measurements = await measurementService.getAllMeasurements();  // Call service to fetch all measurements
    res.json(measurements);  // Return all measurements
  } catch (error) {
    next(error);  // Pass the error to the error handling middleware
  }
};

// Get a measurement by userId
exports.getMeasurementByUserId = async (req, res, next) => {
  try {
    const measurement = await measurementService.getMeasurementByUserId(req.params.userId);  // Call service to fetch measurement by userId
    res.json({ message: "Measurement retrieved successfully", measurement });
  } catch (error) {
    next(error);  // Pass the error to the error handling middleware
  }
};

// Update a user's measurement by userId
exports.updateMeasurementByUserId = async (req, res, next) => {
  try {
    const measurementData = new UpdateMeasurementDto(req.body);  // Validate and prepare the update data
    const updatedMeasurement = await measurementService.updateMeasurementByUserId(
      req.params.userId,  // Get userId from the request parameters
      measurementData     // Send the data to the service for update
    );
    res.json({ message: "Measurement updated successfully", updatedMeasurement });
  } catch (error) {
    next(error);  // Pass the error to the error handling middleware
  }
};

// Delete a user's measurement by userId
exports.deleteMeasurementByUserId = async (req, res, next) => {
  try {
    await measurementService.deleteMeasurementByUserId(req.params.userId);  // Call service to delete measurement by userId
    res.json({ message: "Measurement deleted successfully" });
  } catch (error) {
    next(error);  // Pass the error to the error handling middleware
  }
};
