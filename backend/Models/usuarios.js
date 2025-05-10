const db = require('../Config/db');

/*Este Modelo "usuarios" debe tener las funciones básicas de la tabla de usuarios, ejemplos:
Insertar usuarios, Eliminar, actualizar
Se podría crear una funcion como getStudents donde devuelva todos los usuarios con el rol "Estudiante"*/

/*NO VAN consultas relacionadas a las demas tablas (materias, tutorias, etc) ya que para ello se necesita
otro modelo*/

const getUserById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
};

module.exports = {
  getUserById,
};
