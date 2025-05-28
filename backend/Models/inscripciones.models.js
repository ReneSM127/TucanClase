const db = require('../Config/db');

const getInscripcionById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM inscripciones WHERE id = ?', [id]);
  return rows[0];
};

const getInscripcionesByEstudiante = async (estudiante_id) => {
  const [rows] = await db.execute('SELECT * FROM inscripciones WHERE estudiante_id = ?', [estudiante_id]);
  return rows;
};

const getInscripcionesByTutoria = async (id_tutoria) => {
  try {
    const [rows] = await db.execute('SELECT * FROM vista_inscripciones_completas WHERE id_tutoria = ?', [id_tutoria]);
    return rows;
    
  } catch (error) {
    return error;
  }
};

const getEstudiantesInscritosByTutorId = async (id) => {
  const [rows] = await db.execute(`SELECT e.id AS estudiante_id, CONCAT(e.nombre, ' ', e.apellidos) AS nombre_estudiante, t.titulo AS tutoria_inscrita FROM tutorias t JOIN  inscripciones i ON t.id = i.tutoria_id JOIN usuarios e ON i.estudiante_id = e.id WHERE t.tutor_id = ?`, [id]);
  return rows;
};

const createInscripcion = async (estudiante_id, tutoria_id) => {
    const [result] = await db.execute(
      'INSERT INTO inscripciones (estudiante_id, tutoria_id) VALUES (?, ?)',
      [estudiante_id, tutoria_id]
    );
    return result.insertId;
};

const updateInscripcion = async (id, estado) => {
  await db.execute(
    'UPDATE inscripciones SET estado = ? WHERE id = ?',
    [estado, id]
  );
};

const deleteInscripcion = async (id) => {
  await db.execute(
    'DELETE FROM inscripciones WHERE id = ?',
    [id]
  );
};




module.exports = {
  getInscripcionById,
  getInscripcionesByEstudiante,
  getInscripcionesByTutoria,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
  getEstudiantesInscritosByTutorId
};