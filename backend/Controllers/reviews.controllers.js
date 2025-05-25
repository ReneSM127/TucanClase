const reviewsModel = require('../Models/reviews.models');

const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewsModel.getReviewById(id);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewsByInscripcion = async (req, res) => {
  try {
    const { inscripcion_id } = req.params;
    const reviews = await reviewsModel.getReviewsByInscripcionId(inscripcion_id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { inscripcion_id, estrellas, comentario } = req.body;
    const newReviewId = await reviewsModel.insertReview(inscripcion_id, estrellas, comentario);
    res.status(201).json({ id: newReviewId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { estrellas, comentario } = req.body;
    await reviewsModel.updateReview(id, estrellas, comentario);
    res.json({ message: 'Reseña actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await reviewsModel.deleteReviewById(id);
    res.json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewsModel.getAllReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//getAllReviewByTutorId
const getAllReviewByTutor = async (req, res) => {
  try {
    const reviews = await reviewsModel.getAllReviewByTutorId(req.params.id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//getAllReviewByTutorId
const getAllReviewByTutoria = async (req, res) => {
  try {
    const reviews = await reviewsModel.getAllReviewByTutoriaId(req.params.id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReview,
  getReviewsByInscripcion,
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getAllReviewByTutor,
  getAllReviewByTutoria
};