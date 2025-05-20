const db = require('../Config/db');

// Obtener todas las tutorías
const getAllTutorias = async () => {
  const [rows] = await db.execute('SELECT * FROM tutorias');
  return rows;
};

// Obtener tutoría por ID
const getTutoriaById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM tutorias WHERE id = ?', [id]);
  return rows[0];
};

// Obtener tutorías por tutor ID
const getTutoriasByTutorId = async (tutorId) => {
  const [rows] = await db.execute('SELECT * FROM tutorias WHERE tutor_id = ?', [tutorId]);
  return rows;
};

// Obtener tutorías por materia ID
const getTutoriasByMateriaId = async (materiaId) => {
  const [rows] = await db.execute('SELECT * FROM tutorias WHERE materia_id = ?', [materiaId]);
  return rows;
};

// Crear una nueva tutoría
const insertTutoria = async (tutorId, materiaId, titulo, descripcion, duracion, maxEstudiantes, precio, estado) => {
  const [result] = await db.execute(
    'INSERT INTO tutorias (tutor_id, materia_id, titulo, descripcion, duracion, max_estudiantes, precio, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [tutorId, materiaId, titulo, descripcion, duracion, maxEstudiantes, precio, estado]
  );
  return result.insertId;
};

// Actualizar tutoría
const updateTutoria = async (id, tutorId, materiaId, titulo, descripcion, duracion, maxEstudiantes, precio, estado) => {
  await db.execute(
    'UPDATE tutorias SET tutor_id = ?, materia_id = ?, titulo = ?, descripcion = ?, duracion = ?, max_estudiantes = ?, precio = ?, estado = ? WHERE id = ?',
    [tutorId, materiaId, titulo, descripcion, duracion, maxEstudiantes, precio, estado, id]
  );
};

// Eliminar tutoría
const deleteTutoriaById = async (id) => {
  await db.execute('DELETE FROM tutorias WHERE id = ?', [id]);
};

// Obtener tutorías con información completa (usando la vista)
const getTutoriasCompletas = async () => {
  const [rows] = await db.execute('SELECT * FROM vista_tutorias_completas');
  return rows;
};

module.exports = {
  getAllTutorias,
  getTutoriaById,
  getTutoriasByTutorId,
  getTutoriasByMateriaId,
  insertTutoria,
  updateTutoria,
  deleteTutoriaById,
  getTutoriasCompletas
};