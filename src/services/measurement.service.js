const prisma = require('../config/prismaClient');  // Import Prisma client

/** CREATE MEASUREMENT */
exports.createMeasurement = async (measurementData) => {
  try {
    return await prisma.measurement.create({
      data: measurementData,  // Pass the measurement data to Prisma's create method
    });
  } catch (error) {
    throw new Error('Error creating measurement: ' + error.message);
  }
};

/** GET ALL MEASUREMENTS */
exports.getAllMeasurements = async () => {
  try {
    return await prisma.measurement.findMany();  // Fetch all measurements
  } catch (error) {
    throw new Error('Error fetching measurements: ' + error.message);
  }
};

/** GET MEASUREMENT BY USER ID */
exports.getMeasurementByUserId = async (userId) => {
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user id');
  }

  try {
    const measurement = await prisma.measurement.findUnique({
      where: { user_id: userId },  // Fetch measurement by user_id
    });

    if (!measurement) {
      throw new Error('Measurement not found');
    }

    return measurement;
  } catch (error) {
    throw new Error('Error fetching measurement by user ID: ' + error.message);
  }
};

/** UPDATE MEASUREMENT BY USER ID */
exports.updateMeasurementByUserId = async (userId, measurementData) => {
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user id');
  }

  try {
    // Retrieve the existing measurement record
    const measurement = await prisma.measurement.findUnique({
      where: { user_id: userId },  // Fetch measurement by user_id
    });

    if (!measurement) {
      throw new Error('Measurement not found');
    }

    // Perform the update operation
    return await prisma.measurement.update({
      where: { user_id: userId },
      data: measurementData,
    });
  } catch (error) {
    throw new Error('Error updating measurement: ' + error.message);
  }
};

/** DELETE MEASUREMENT BY USER ID */
exports.deleteMeasurementByUserId = async (userId) => {
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user id');
  }

  try {
    // Retrieve the existing measurement record
    const measurement = await prisma.measurement.findUnique({
      where: { user_id: userId },  // Fetch measurement by user_id
    });

    if (!measurement) {
      throw new Error('Measurement not found');
    }

    // Perform the delete operation
    return await prisma.measurement.delete({
      where: { user_id: userId },
    });
  } catch (error) {
    throw new Error('Error deleting measurement: ' + error.message);
  }
};
