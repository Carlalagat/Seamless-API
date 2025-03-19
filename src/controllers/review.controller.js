const reviewService = require("../services/review.service");



exports.createReview = async (req, res, next) => {
  try {
    const newReview = await reviewService.createReview(req.body); 
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" }); 
    }

    res.json({ message: "Review retrieved successfully", review });
  } catch (error) {
    next(error);
  }
};

exports.updateReviewById = async (req, res, next) => {
  try {
    const updatedReview = await reviewService.updateReviewsById(
      req.params.id,
      req.body 
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" }); 
    }

    res.json({ message: "Review updated successfully", updatedReview });
  } catch (error) {
    next(error);
  }
};

exports.deleteReviewById = async (req, res, next) => {
  try {
    const deletedReview = await reviewService.deleteReviewById(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" }); // Handle case where review is not found
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};