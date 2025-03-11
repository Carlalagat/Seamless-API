class CreateMediaDto {
  constructor({ product_id, user_id, url, type }) {
    this.product_id = product_id;
    this.user_id = user_id;
    this.url = url;
    this.type = type;
  }
}

class UpdateMediaDto {
  constructor({ product_id, user_id, url, type }) {
    this.product_id = product_id;
    this.user_id = user_id;
    this.url = url;
    this.type = type;
  }
}

class MediaDto {
  constructor({ id, product_id, user_id, url, type, createdAt, updatedAt }) {
    this.id = id;
    this.product_id = product_id;
    this.user_id = user_id;
    this.url = url;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = { CreateMediaDto, UpdateMediaDto, MediaDto };