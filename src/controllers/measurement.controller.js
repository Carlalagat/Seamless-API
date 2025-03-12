const measurementService = require("../services/measurement.service");
const { CreateMeasurementDto, UpdateMeasurementDto } = require("../dto/measurement.dto");

// Create a new measurement
exports.createMeasurement = async (req, res, next) => {
  try {
    const measurementData = new CreateMeasurementDto(req.body);
    const newMeasurement = await measurementService.createMeasurement(measurementData);
    res.status(201).json({ 
      message: "Measurement created successfully", 
      measurement: newMeasurement 
    });
  } catch (error) {
    console.error("Create measurement error:", error.message);
    
    if (error.message.includes('already exists')) {
      return res.status(409).json({ message: error.message });
    }
    
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(500).json({ 
      message: "Failed to create measurement", 
      error: error.message 
    });
  }
};

// Get all measurements
exports.getAllMeasurements = async (req, res, next) => {
  try {
    const measurements = await measurementService.getAllMeasurements();
    res.json({
      message: "Measurements retrieved successfully",
      measurements
    });
  } catch (error) {
    console.error("Get all measurements error:", error.message);
    res.status(500).json({ 
      message: "Failed to retrieve measurements", 
      error: error.message 
    });
  }
};

// Get a measurement by userId
exports.getMeasurementByUserId = async (req, res, next) => {
  try {
    const measurement = await measurementService.getMeasurementByUserId(req.params.userId);
    res.json({ 
      message: "Measurement retrieved successfully", 
      measurement 
    });
  } catch (error) {
    console.error("Get measurement error:", error.message);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ 
      message: "Failed to retrieve measurement", 
      error: error.message 
    });
  }
};

// Update a user's measurement by userId
exports.updateMeasurementByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const measurementData = new UpdateMeasurementDto(req.body);
    const updatedMeasurement = await measurementService.updateMeasurementByUserId(
      userId,
      measurementData
    );
    res.json({ 
      message: "Measurement updated successfully", 
      measurement: updatedMeasurement 
    });
  } catch (error) {
    console.error("Update measurement error:", error.message);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ 
      message: "Failed to update measurement", 
      error: error.message 
    });
  }
};

// Delete a user's measurement by userId
exports.deleteMeasurementByUserId = async (req, res, next) => {
  try {
    await measurementService.deleteMeasurementByUserId(req.params.userId);
    res.json({ message: "Measurement deleted successfully" });
  } catch (error) {
    console.error("Delete measurement error:", error.message);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ 
      message: "Failed to delete measurement", 
      error: error.message 
    });
  }
};