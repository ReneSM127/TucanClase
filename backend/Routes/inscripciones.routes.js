const express = require('express');
const router = express.Router();
const inscripciones = require('../Controllers/inscripciones.controller');

// Rutas para inscripciones
router.get('/:id', inscripciones.getInscripcion);
router.get('/estudiante/:estudiante_id', inscripciones.getInscripcionesByEstudiante);
router.get('/tutoria/:tutoria_id', inscripciones.getInscripcionesByTutoria);
router.post('/', inscripciones.createInscripcion);
router.put('/:id', inscripciones.updateInscripcion);

module.exports = router;