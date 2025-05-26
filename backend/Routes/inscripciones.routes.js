const express = require('express');
const router = express.Router();
const inscripciones = require('../Controllers/inscripciones.controller');

// Rutas para inscripciones
router.get('/:id', inscripciones.getInscripcion);
router.get('/estudiante/:estudiante_id', inscripciones.getInscripcionesByEstudiante);
router.get('/tutoria/:id_tutoria', inscripciones.getInscripcionesByTutoria);
router.post('/', inscripciones.createInscripcion);
router.put('/:id', inscripciones.updateInscripcion);
router.delete('/:id', inscripciones.deleteInscripcionById);

module.exports = router;