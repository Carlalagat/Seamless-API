const prisma = require("../config/prismaClient");
const { CreateReviewDto, UpdateReviewDto } = require("../dto/review.dto");


exports.getAllReviews = async () => {
  return await prisma.review.findMany();
};

exports.updateReviewsById = async (id, reviewData) => {
  if (!id || typeof id !== "string") {
      throw new Error("Invalid review id. Must be a valid UUID.");
  }

  // Retrieve the existing review record
  const review = await prisma.review.findUnique({
      where: { id },
  });
  if (!review) {
      return null;  // Return null if the review is not found
  }

  try {
      const updateReviewDto = new UpdateReviewDto(reviewData); // Create a DTO instance

      if (updateReviewDto.rating !== undefined && typeof updateReviewDto.rating !== 'number') {
          throw new Error("Invalid rating. Must be a number.");
      }

      if (updateReviewDto.comment !== undefined && typeof updateReviewDto.comment !== 'string') {
          throw new Error("Invalid comment. Must be a string.");
      }


      return await prisma.review.update({
          where: { id },
          data: {
              //Only update the fields that are present in the DTO
              ...(updateReviewDto.rating !== undefined ? {rating: updateReviewDto.rating} : {}),
              ...(updateReviewDto.comment !== undefined ? {comment: updateReviewDto.comment} : {}),
          },
      });
  } catch (error) {
      console.error("Error updating review:", error);
      throw new Error(`Failed to update review: ${error.message}`); // Include original error message
  }
};

exports.deleteReviewById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid review id");
  }

  // Retrieve the existing review record
  const review = await prisma.review.findUnique({
    where: { id },
  });
  if (!review) {
    return null; // Return null if the review is not found
  }

  try {
    return await prisma.review.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    throw new Error("Failed to delete review"); //Re-throw the error to be caught by the controller.
  }
};


exports.createReview = async (reviewData) => {
  try {
      const createReviewDto = new CreateReviewDto(reviewData); // Create a DTO instance
      
      return await prisma.review.create({  // Corrected to use prisma.review.create
          data: {
              rating: createReviewDto.rating,
              comment: createReviewDto.comment,
              user_id: createReviewDto.user_id,
              product_id: createReviewDto.product_id
          },
      });
  } catch (error) {
      console.error("Error creating review:", error);
      throw new Error(`Failed to create review: ${error.message}`); // Include original error message
  }
};


exports.getReviewById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid review id");
  }

  try {
    const review = await prisma.review.findUnique({
      where: { id },
    });

    return review; //Return the review, which can be null
  } catch (error) {
    console.error("Error fetching review by ID:", error);
    throw new Error("Failed to fetch review by ID");
  }
};