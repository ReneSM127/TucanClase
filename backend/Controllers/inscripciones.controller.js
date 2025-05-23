const Inscripcion = require('../Models/inscripciones.models');

// Obtener inscripción por ID
const getInscripcion = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.getInscripcionById(req.params.id);
    if (!inscripcion) return res.status(404).send({ message: 'Inscripción no encontrada' });
    res.json(inscripcion);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la inscripción' });
  }
};

// Obtener inscripciones por estudiante
const getInscripcionesByEstudiante = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.getInscripcionesByEstudiante(req.params.estudiante_id);
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las inscripciones del estudiante' });
  }
};

// Obtener inscripciones por tutoría
const getInscripcionesByTutoria = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.getInscripcionesByTutoria(req.params.id_tutoria);
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las inscripciones de la tutoría' });
  }
};

// Crear nueva inscripción
const createInscripcion = async (req, res) => {
  const { estudiante_id, tutoria_id, estado } = req.body;
  try {
    const newInscripcion = await Inscripcion.createInscripcion(estudiante_id, tutoria_id, estado);
    res.status(201).json({ id: newInscripcion });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la inscripción', error: error.message });
  }
};

// Actualizar estado de inscripción
const updateInscripcion = async (req, res) => {
  const { estado } = req.body;
  try {
    await Inscripcion.updateInscripcion(req.params.id, estado);
    res.json({ message: 'Inscripción actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la inscripción' });
  }
};


module.exports = {
  getInscripcion,
  getInscripcionesByEstudiante,
  getInscripcionesByTutoria,
  createInscripcion,
  updateInscripcion
};