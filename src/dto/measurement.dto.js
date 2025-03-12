// src/dto/measurement.dto.js
class CreateMeasurementDto {
  constructor(data) {
    this.user_id = data.user_id; // Fixed: was using undefined user_id variable
    this.neck = data.neck;
    this.chest = data.chest;
    this.waist = data.waist;
    this.hips = data.hips;
    this.inseam = data.inseam;
    this.sleeve = data.sleeve;
  }
}

class UpdateMeasurementDto {
  constructor(data) {
    this.neck = data.neck;
    this.chest = data.chest;
    this.waist = data.waist;
    this.hips = data.hips;
    this.inseam = data.inseam;
    this.sleeve = data.sleeve;
  }

  // Helper to clean undefined values
  getDefinedFields() {
    return Object.fromEntries(
      Object.entries(this).filter(([_, value]) => value !== undefined)
    );
  }
}

module.exports = { CreateMeasurementDto, UpdateMeasurementDto };