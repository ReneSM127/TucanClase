const db = require('../Config/db');

const getReviewById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM reviews WHERE id = ?', [id]);
  return rows[0];
};

const getReviewsByInscripcionId = async (inscripcion_id) => {
  const [rows] = await db.execute('SELECT * FROM reviews WHERE inscripcion_id = ?', [inscripcion_id]);
  return rows;
};

const insertReview = async (inscripcion_id, estrellas, comentario) => {
  const [result] = await db.execute(
    'INSERT INTO reviews (inscripcion_id, estrellas, comentario, fecha_creacion) VALUES (?, ?, ?, NOW())',
    [inscripcion_id, estrellas, comentario]
  );
  return result.insertId;
};

const updateReview = async (id, estrellas, comentario) => {
  await db.execute(
    'UPDATE reviews SET estrellas = ?, comentario = ? WHERE id = ?',
    [estrellas, comentario, id]
  );
};

const deleteReviewById = async (id) => {
  await db.execute('DELETE FROM reviews WHERE id = ?', [id]);
};

const getAllReviews = async () => {
  const [rows] = await db.execute('SELECT * FROM reviews');
  return rows;
};

const getAllReviewByTutorId = async (id) => {
  const [rows] = await db.execute('select * from vista_tutorias_reviews where tutor_id= ?',[id]);
  return rows;
};

module.exports = {
  getReviewById,
  getReviewsByInscripcionId,
  insertReview,
  updateReview,
  deleteReviewById,
  getAllReviews,
  getAllReviewByTutorId
};