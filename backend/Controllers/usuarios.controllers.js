const bcrypt = require("bcryptjs");
const User = require('../Models/usuarios.models');

/*Este controlador "usuarios" debe contener la lógica relacionada a los usuarios
ya sea que mensajes de error mostrar o que parámetros mandar para hacer la consulta a la bd
Normalmente, por cada función del modelo debe haber una función del controlador
*/

/*NO VAN cosas relacionadas a las demas tablas (materias, tutorias, etc) ya que para ello se necesita
otro controlador*/

//Buscar usuario por id
const getUser = async (req, res) => {
  const user = await User.getUserById(req.params.id);
  if (!user) return res.status(404).send({ message: 'no existe' });
  res.json(user);
};

//Insertar usuario
const createUser = async(req, res) => { //Falta encriptar la contraseña
  const {nombre, apellidos, email, password, rol} = req.body;
  try {

    //Busca los datos del usuario por su correo
    const existingUser = await User.getUserByemail(email);    
    
    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está en uso' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); //Encripta la contraseña     

    const newUser = await User.insertUser(nombre, apellidos, email, hashedPassword, rol);
    res.status(201).json({ id: newUser, nombre,hashedPassword});
    
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
}

//Actualizar por id
const updateUser = async (req, res) => {
  const { nombre, apellidos, descripcion, foto_perfil } = req.body;
  try {
    await User.updateUser(req.params.id, nombre, apellidos, descripcion, foto_perfil);
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

//Eliminar usuario por id
const deleteUser = async (req, res) => {
  try {
    await User.deleteUserById(req.params.id);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};



module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser
};