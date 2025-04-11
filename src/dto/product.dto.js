class CreateProductDto {
  constructor({
    fabric_id,
    productName,
    description,
    price,
    location,
    tailorName,
    user_id,
    fabricTypes = [],
    media = [],
  }) {
    this.fabric_id = fabric_id;
    this.productName = productName;
    this.description = description;
    this.price = price;
    this.location = location;
    this.tailorName = tailorName;
    this.user_id = user_id;
    this.fabricTypes = fabricTypes;
    this.media = media;
  }
}

class UpdateProductDto {
  constructor({
    fabric_id,
    productName,
    description,
    price,
    location,
    tailorName,
    fabricTypes = [],
    media = [],
  }) {
    this.fabric_id = fabric_id;
    this.productName = productName;
    this.description = description;
    this.price = price;
    this.location = location;
    this.tailorName = tailorName;
    this.fabricTypes = fabricTypes;
    this.media = media;
  }
}

module.exports = { CreateProductDto, UpdateProductDto };
