const express = require('express');
const router = express.Router();
const materiasController = require('../Controllers/materias.controllers');

router.get('/', materiasController.getAllMaterias);
/*router.get('/con-tutorias', materiasController.getMateriasConTutorias); */
router.get('/:id', materiasController.getMateria);
router.post('/', materiasController.createMateria);
router.put('/:id', materiasController.updateMateria);
router.delete('/:id', materiasController.deleteMateria);

module.exports = router;