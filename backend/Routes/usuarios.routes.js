const express = require('express');
const router = express.Router();
const {verificarToken} = require('../Middlewares/authMiddleware')
const usuarios = require('../Controllers/usuarios.controllers');

router.get('/:id', usuarios.getUser);
router.post('/', usuarios.createUser);
router.put('/:id',verificarToken, usuarios.updateUser);
router.delete('/:id', usuarios.deleteUser)

module.exports = router;
