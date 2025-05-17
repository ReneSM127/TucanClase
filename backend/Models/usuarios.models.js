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

const getUserByemail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0];
};

// Crear un nuevo usuario
const insertUser = async (nombre, apellidos, email, password, rol) => {
  const [result] = await db.execute(
    'INSERT INTO usuarios (nombre, apellidos, email, password, rol ) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellidos, email, password, rol]
  );
  return result.insertId;
};

//Actualizar
const updateUser = async (id, nombre, apellidos, descripcion, foto_perfil) => {
  await db.execute(
    'UPDATE usuarios SET nombre = ?, apellidos = ?, descripcion = ?, foto_perfil = ? WHERE id = ?',
    [nombre, apellidos, descripcion, foto_perfil, id]
  );
};

//Eliminar
const deleteUserById = async (id) => {
  await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
};


module.exports = {
  getUserById,
  insertUser,
  updateUser,
  deleteUserById,
  getUserByemail
};
