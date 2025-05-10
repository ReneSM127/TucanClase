const User = require('../Models/usuarios');

/*Este controlador "usuarios" debe contener la lógica relacionada a los usuarios
ya sea que mensajes de error mostrar o que parámetros mandar para hacer la consulta a la bd
Normalmente, por cada función del modelo debe haber una función del controlador
*/

/*NO VAN cosas relacionadas a las demas tablas (materias, tutorias, etc) ya que para ello se necesita
otro controlador*/

const getUser = async (req, res) => {
  const user = await User.getUserById(req.params.id);
  if (!user) return res.status(404).send({ message: 'no existe' });
  res.json(user);
};

module.exports = {
  getUser,
};