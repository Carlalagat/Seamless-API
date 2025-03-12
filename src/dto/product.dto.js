class CreateProductDto {
  constructor({
    fabric_id,productName, description, price, location, tailorName
  })
  {
    this.fabric_id = fabric_id;
    this.productName = productName;
    this.description = description;
    this.price = price;
    this.location = location;
    this.tailorName = tailorName;
  }
}
class UpdateProductDto {
  constructor({
    fabric_id, productName, description, price, location, tailorName
  })
  {
    this.fabric_id = fabric_id;
    this.productName = productName;
    this.description = description;
    this.price = price;
    this.location = location;
    this.tailorName = tailorName;
  }
}

module.exports = { CreateProductDto, UpdateProductDto };