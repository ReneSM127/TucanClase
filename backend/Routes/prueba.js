const express = require('express');
const router = express.Router();
const userController = require('../Controllers/prueba');

router.get('/prueba', userController.pruebaGET);

module.exports = router;
