const db = require("../Config/db");

// Obtener todas las tutorías
const getAllTutorias = async () => {
  const [rows] = await db.execute("SELECT * FROM tutorias");
  return rows;
};

// Obtener tutoría por ID
const getTutoriaById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM tutorias WHERE id = ?", [id]);
  return rows[0];
};

// Obtener tutorías por tutor ID
const getTutoriasByTutorId = async (tutorId) => {
  const [rows] = await db.execute("SELECT * FROM tutorias WHERE tutor_id = ?", [
    tutorId,
  ]);
  return rows;
};

// Obtener tutorías por materia ID
const getTutoriasByMateriaId = async (materiaId) => {
  const [rows] = await db.execute(
    "SELECT * FROM tutorias WHERE materia_id = ?",
    [materiaId]
  );
  return rows;
};

// Crear una nueva tutoría
const insertTutoria = async (
  tutorId,
  materiaId,
  titulo,
  descripcion,
  duracion,
  maxEstudiantes
) => {
  const [result] = await db.execute(
    "INSERT INTO tutorias (tutor_id, materia_id, titulo, descripcion, duracion, max_estudiantes) VALUES (?, ?, ?, ?, ?, ?)",
    [tutorId, materiaId, titulo, descripcion, duracion, maxEstudiantes]
  );
  return result.insertId;
};

// Actualizar tutoría
const updateTutoria = async (
  id,
  materiaId,
  titulo,
  descripcion,
  duracion,
  maxEstudiantes
) => {
  await db.execute(
    "UPDATE tutorias SET materia_id = ?, titulo = ?, descripcion = ?, duracion = ?, max_estudiantes = ? WHERE id = ?",
    [materiaId, titulo, descripcion, duracion, maxEstudiantes, id]
  );
};

// Eliminar tutoría
const deleteTutoriaById = async (id) => {
  await db.execute("DELETE FROM tutorias WHERE id = ?", [id]);
};

// Obtener tutorías con información completa (usando la vista)
const getTutoriasCompletas = async () => {
  const [rows] = await db.execute("SELECT * FROM vista_tutorias_completas");
  return rows;
};

// Obtener tutorías con información completa (usando la vista)
const getTutoriasCompletasByTutorId = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM vista_tutorias_completas WHERE tutor_id = ? ",
    [id]
  );
  return rows;
};

// Obtener tutorías con información completa (usando la vista)
const getTutoriasCompletasByTutoriaId = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM vista_tutorias_completas WHERE tutoria_id = ? ",
    [id]
  );
  return rows[0];
};

//obtener todas las tutorias donde el usuario no esté inscrito
const getTutoriasNoInscritasById = async (id) => {
  try {
    const [rows] = await db.execute(
      "SELECT vtc.* FROM vista_tutorias_completas vtc WHERE vtc.tutoria_id NOT IN (SELECT tutoria_id FROM inscripciones WHERE estudiante_id = ?)",
      [id]
    );
    return rows;
  } catch (error) {
    return error;
  }
};

//obtener todas las tutorias donde el usuario esté inscrito
const getTutoriasInscritasById = async (id) => {
  try {
    const [rows] = await db.execute(
      "SELECT vtc.* FROM vista_tutorias_completas vtc WHERE vtc.tutoria_id IN (SELECT tutoria_id FROM inscripciones WHERE estudiante_id = ?)",
      [id]
    );
    return rows;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllTutorias,
  getTutoriaById,
  getTutoriasByTutorId,
  getTutoriasByMateriaId,
  insertTutoria,
  updateTutoria,
  deleteTutoriaById,
  getTutoriasCompletas,
  getTutoriasCompletasByTutorId,
  getTutoriasCompletasByTutoriaId,
  getTutoriasNoInscritasById,
  getTutoriasInscritasById
};
