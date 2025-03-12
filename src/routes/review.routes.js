const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');


router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.delete('/:id', reviewController.deleteReviewById);
router.patch('/:id', reviewController.updateReviewById);


module.exports = router;