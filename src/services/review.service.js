const prisma = require("../config/prismaClient");

exports.getAllReviews = async () => {
  return await prisma.review.findMany();
};

exports.updateReviewsById = async (id, reviewData) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid review id");
  }

  // Retrieve the existing review record
  const review = await prisma.review.findUnique({
    where: { id },
  });
  if (!review) {
    return null;  // Return null if the review is not found
  }

  try {
    return await prisma.review.update({
      where: { id },
      data: reviewData,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    throw new Error("Failed to update review"); //Re-throw the error to be caught by the controller.
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
    return await prisma.review.create({  // Corrected to use prisma.review.create
      data: reviewData,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Failed to create review"); //Re-throw the error to be caught by the controller.
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