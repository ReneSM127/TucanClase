const express = require('express');
const router = express.Router();
const usuarios = require('../Controllers/usuarios.controller');

/*Esta ruta "usuarios" debe contener las rutas relacionadas a los usuarios
se debe usar el metodo correcto (PUT, DELETE, GET) según sea la funcion del controlador
Normalmente, por cada función del controlador debe haber una ruta
*/

/*NO VAN rutas relacionadas a las demas tablas (materias, tutorias, etc) ya que para ello se necesita
otro archivo de rutas*/

router.get('/:id', usuarios.getUser);

module.exports = router;
