class CreateReviewDto {
  constructor({ rating, comment, user_id, product_id }) {
      this.rating = rating;
      this.comment = comment;
      this.user_id = user_id;
      this.product_id = product_id;
  }
}

class UpdateReviewDto {
  constructor({ rating, comment }) {
      this.rating = rating;
      this.comment = comment;
  }
}

module.exports = { CreateReviewDto, UpdateReviewDto };