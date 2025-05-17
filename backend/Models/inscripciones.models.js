const db = require('../Config/db');

const getInscripcionById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM inscripciones WHERE id = ?', [id]);
  return rows[0];
};

const getInscripcionesByEstudiante = async (estudiante_id) => {
  const [rows] = await db.execute('SELECT * FROM inscripciones WHERE estudiante_id = ?', [estudiante_id]);
  return rows;
};

const getInscripcionesByTutoria = async (tutoria_id) => {
  const [rows] = await db.execute('SELECT * FROM inscripciones WHERE tutoria_id = ?', [tutoria_id]);
  return rows;
};

const createInscripcion = async (estudiante_id, tutoria_id, estado = 'Inscrito') => {
  const [result] = await db.execute(
    'INSERT INTO inscripciones (estudiante_id, tutoria_id, estado) VALUES (?, ?, ?)',
    [estudiante_id, tutoria_id, estado]
  );
  return result.insertId;
};

const updateInscripcion = async (id, estado) => {
  await db.execute(
    'UPDATE inscripciones SET estado = ? WHERE id = ?',
    [estado, id]
  );
};



module.exports = {
  getInscripcionById,
  getInscripcionesByEstudiante,
  getInscripcionesByTutoria,
  createInscripcion,
  updateInscripcion
};