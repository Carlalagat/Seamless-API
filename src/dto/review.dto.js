class CreateReviewDto {
    constructor({ rating, comment,  }) {
      this.rating = rating; 
      this.comment = comment;
      
    }
  }
  class UpdateReviewDto {
    constructor({ rating, comment }) {
      this.rating = rating; 
      this.comment = comment;
      
    }
  }
  
  module.exports = { CreateReviewDto, UpdateReviewDto };
  