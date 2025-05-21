const express = require('express');
const router = express.Router();
const reviews = require('../Controllers/reviews.controllers');


router.get('/', reviews.getAllReviews);
router.get('/:id', reviews.getReview);
router.get('/inscripcion/:inscripcion_id', reviews.getReviewsByInscripcion);
router.get('/tutor/:id', reviews.getAllReviewByTutor);
router.post('/', reviews.createReview);
router.put('/:id', reviews.updateReview);
router.delete('/:id', reviews.deleteReview);

module.exports = router;