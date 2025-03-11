class CreateOrderDto {
  constructor({ user_id,measurement_id,product_id, status, totalPrice }) {
    this.user_id = user_id;
    this.measurement_id = measurement_id;
    this.product_id = product_id;
    this.status = status;
    this.totalPrice = totalPrice;
  }
}

class UpdateOrderDto {
  constructor({ user_id,measurement_id,product_id, status, totalPrice }) {
    this.user_id = user_id;
    this.measurement_id = measurement_id;
    this.product_id = product_id;
    this.status = status;
    this.totalPrice = totalPrice;
  }
}   
module.exports = { CreateOrderDto, UpdateOrderDto };