const express = require('express');
const router = express.Router();
const tutorias = require('../Controllers/tutorias.controllers');

router.get('/all', tutorias.getTutoriasCompletas);
router.get('/', tutorias.getAllTutorias);
router.get('/:id', tutorias.getTutoria);
router.get('/tutor/:tutorId', tutorias.getTutoriasByTutor);
router.get('/materia/:materiaId', tutorias.getTutoriasByMateria);
//Actualizar
router.put('/:id', tutorias.updateTutoria);
//Añadir nueva
router.post('/', tutorias.createTutoria);
//Eliminar
router.delete('/:id', tutorias.deleteTutoria);

module.exports = router;








module.exports = router;
