const bcrypt = require("bcryptjs");
const User = require("../Models/usuarios.models");

/*Este controlador "usuarios" debe contener la lógica relacionada a los usuarios
ya sea que mensajes de error mostrar o que parámetros mandar para hacer la consulta a la bd
Normalmente, por cada función del modelo debe haber una función del controlador
*/

/*NO VAN cosas relacionadas a las demas tablas (materias, tutorias, etc) ya que para ello se necesita
otro controlador*/

//Buscar usuario por id
const getUser = async (req, res) => {
  const user = await User.getUserById(req.params.id);
  if (!user) return res.status(404).send({ message: "no existe" });
  res.json(user);
};

//Insertar usuario
const createUser = async (req, res) => {
  //Falta encriptar la contraseña
  const { nombre, apellidos, email, password, rol } = req.body;
  try {
    //Busca los datos del usuario por su correo
    const existingUser = await User.getUserByemail(email);

    if (existingUser) {
      return res.status(409).json({ message: "El correo ya está en uso" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); //Encripta la contraseña

    const newUser = await User.insertUser(
      nombre,
      apellidos,
      email,
      hashedPassword,
      rol
    );
    res.status(201).json({ id: newUser, nombre, hashedPassword });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

//Actualizar por id
const updateUser = async (req, res) => {
  const { nombre, apellidos, descripcion, email } = req.body;
  const idUsuarioToken = req.usuario.id; // <- del token
  const idUsuarioParam = req.params.id;
  //console.log("ID del token:", req.usuario.id, typeof req.usuario.id);
  //console.log("ID del parámetro:", req.params.id, typeof req.params.id);

  if (parseInt(idUsuarioToken) !== parseInt(idUsuarioParam)) {
    return res
      .status(403)
      .json({ mensaje: "No tienes permiso para modificar este perfil" });
  }

  try {
    await User.updateUser(req.params.id, nombre, apellidos, email, descripcion);
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

//Eliminar usuario por id
const deleteUser = async (req, res) => {
  try {
    await User.deleteUserById(req.params.id);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

//Buscar usuario por id
const getTutores = async (req, res) => {
  try {
      const user = await User.getTutors();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las tutorías completas' });
    }
  }

  const getEstudiantes = async (req, res) => {
  try {
      const user = await User.getStudents();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las tutorías completas' });
    }
  }

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getTutores,
  getEstudiantes
};
