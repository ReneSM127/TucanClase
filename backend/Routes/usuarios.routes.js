const express = require('express');
const router = express.Router();
const usuarios = require('../Controllers/usuarios.controller');

router.get('/:id', usuarios.getUser);

module.exports = router;
