class CreateMediaDto {
  constructor({ product_id, user_id, url, type, purpose = 'PRODUCT_DISPLAY' }) {
    this.product_id = product_id;
    this.user_id = user_id;
    this.url = url;
    this.type = type;
    this.purpose = purpose;
  }
}

class UpdateMediaDto {
  constructor({ product_id, user_id, url, type, purpose }) {
    if (product_id) this.product_id = product_id;
    if (user_id) this.user_id = user_id;
    if (url) this.url = url;
    if (type) this.type = type;
    if (purpose) this.purpose = purpose;
  }
}

class MediaDto {
  constructor({ id, product_id, user_id, url, type, purpose, createdAt, updatedAt }) {
    this.id = id;
    this.product_id = product_id;
    this.user_id = user_id;
    this.url = url;
    this.type = type;
    this.purpose = purpose;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = { CreateMediaDto, UpdateMediaDto, MediaDto };
