const prisma = require('../config/prismaClient');  // Import Prisma client

/** CREATE MEASUREMENT */
exports.createMeasurement = async (measurementData) => {
  try {
    // Check if a measurement already exists for this user
    const existingMeasurement = await prisma.measurement.findUnique({
      where: { user_id: measurementData.user_id },
    });

    if (existingMeasurement) {
      throw new Error('Measurement already exists for this user');
    }

    return await prisma.measurement.create({
      data: {
        neck: measurementData.neck,
        chest: measurementData.chest,
        waist: measurementData.waist,
        hips: measurementData.hips,
        inseam: measurementData.inseam,
        sleeve: measurementData.sleeve,
        user: {
          connect: { id: measurementData.user_id }
        }
      }
    });
  } catch (error) {
    throw error;
  }
};

/** GET ALL MEASUREMENTS */
exports.getAllMeasurements = async () => {
  try {
    return await prisma.measurement.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });  // Fetch all measurements with user details
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
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
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
    // Get defined fields only to prevent null updates
    const definedData = measurementData.getDefinedFields ? 
      measurementData.getDefinedFields() : 
      Object.fromEntries(
        Object.entries(measurementData).filter(([_, value]) => value !== undefined)
      );
      
    // Check if measurement exists
    const measurement = await prisma.measurement.findUnique({
      where: { user_id: userId },
    });

    if (!measurement) {
      throw new Error('Measurement not found');
    }

    // Perform the update operation
    return await prisma.measurement.update({
      where: { user_id: userId },
      data: definedData,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });
  } catch (error) {
    throw error; // Pass the original error for better debugging
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
      where: { user_id: userId },
    });

    if (!measurement) {
      throw new Error('Measurement not found');
    }

    // Perform the delete operation
    return await prisma.measurement.delete({
      where: { user_id: userId },
    });
  } catch (error) {
    throw error; // Pass the original error for better debugging
  }
};