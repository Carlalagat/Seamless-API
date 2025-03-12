// src/dto/measurement.dto.js
class CreateMeasurementDto {
  constructor(data) {
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
}

module.exports = { CreateMeasurementDto, UpdateMeasurementDto };
