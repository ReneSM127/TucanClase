const db = require('../Config/db');

const Materia = {
  getAllMaterias: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM materias');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getMateriaById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM materias WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },


  insertMateria: async (nombre, descripcion = '') => {
    try {
      const [result] = await db.query(
        'INSERT INTO materias (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },


  updateMateria: async (id, nombre, descripcion) => {
    try {
      await db.query(
        'UPDATE materias SET nombre = ?, descripcion = ? WHERE id = ?',
        [nombre, descripcion, id]
      );
    } catch (error) {
      throw error;
    }
  },


  deleteMateriaById: async (id) => {
    try {
      await db.query('DELETE FROM materias WHERE id = ?', [id]);
    } catch (error) {
      throw error;
    }
  },


  getMateriasConTutorias: async () => {
    try {
      const [rows] = await db.query(`
        SELECT m.*, COUNT(t.id) as cantidad_tutorias 
        FROM materias m
        LEFT JOIN tutorias t ON m.id = t.materia_id
        GROUP BY m.id
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Materia;