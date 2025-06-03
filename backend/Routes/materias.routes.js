const express = require('express');
const router = express.Router();
const materiasController = require('../Controllers/materias.controllers');

router.get('/', materiasController.getAllMaterias);
router.get('/:id', materiasController.getMateria);
router.post('/', materiasController.createMateria);
router.put('/:id', materiasController.updateMateria);
router.delete('/:id', materiasController.deleteMateria);
router.get('/con-tutorias', materiasController.getMateriasConTutorias);

module.exports = router;