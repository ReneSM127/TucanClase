const Tutoria = require('../Models/tutorias.models');

// Obtener todas las tutorías
const getAllTutorias = async (req, res) => {
  try {
    const tutorias = await Tutoria.getAllTutorias();
    res.json(tutorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tutorías' });
  }
};

// Obtener tutoría por ID
const getTutoria = async (req, res) => {
  try {
    const tutoria = await Tutoria.getTutoriaById(req.params.id);
    if (!tutoria) {
      return res.status(404).json({ message: 'Tutoría no encontrada' });
    }
    res.json(tutoria);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tutoría' });
  }
};

// Obtener tutorías por tutor ID
const getTutoriasByTutor = async (req, res) => {
  try {
    const tutorias = await Tutoria.getTutoriasByTutorId(req.params.tutorId);
    res.json(tutorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tutorías del tutor' });
  }
};

// Obtener tutorías por materia ID
const getTutoriasByMateria = async (req, res) => {
  try {
    const tutorias = await Tutoria.getTutoriasByMateriaId(req.params.materiaId);
    res.json(tutorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tutorías de la materia' });
  }
};

// Crear una nueva tutoría
const createTutoria = async (req, res) => {
  const { tutorId, materiaId, titulo, descripcion, duracion, maxEstudiantes, precio, estado } = req.body;
  
  try {
    // Validaciones básicas
    if (!tutorId || !materiaId || !titulo || !duracion || !maxEstudiantes) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const newTutoriaId = await Tutoria.insertTutoria(
      tutorId, 
      materiaId, 
      titulo, 
      descripcion, 
      duracion, 
      maxEstudiantes, 
      precio, 
      estado || 'Programado'
    );
    
    res.status(201).json({ 
      id: newTutoriaId, 
      message: 'Tutoría creada correctamente' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la tutoría' });
  }
};

// Actualizar tutoría
const updateTutoria = async (req, res) => {
  const { tutorId, materiaId, titulo, descripcion, duracion, maxEstudiantes, precio, estado } = req.body;
  
  try {
    await Tutoria.updateTutoria(
      req.params.id,
      tutorId, 
      materiaId, 
      titulo, 
      descripcion, 
      duracion, 
      maxEstudiantes, 
      precio, 
      estado
    );
    
    res.json({ message: 'Tutoría actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la tutoría' });
  }
};

// Eliminar tutoría
const deleteTutoria = async (req, res) => {
  try {
    await Tutoria.deleteTutoriaById(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tutoría' });
  }
};

// Obtener tutorías con información completa
const getTutoriasCompletas = async (req, res) => {
  try {
    const tutorias = await Tutoria.getTutoriasCompletas();
    res.json(tutorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tutorías completas' });
  }
};

// Eliminar tutoría
const getTutoriasCompletasByTutor = async (req, res) => {
  try {
    const tutorias =  await Tutoria.getTutoriasCompletasByTutorId(req.params.id);
    res.json(tutorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al encontrar' });
  }
};

module.exports = {
  getAllTutorias,
  getTutoria,
  getTutoriasByTutor,
  getTutoriasByMateria,
  createTutoria,
  updateTutoria,
  deleteTutoria,
  getTutoriasCompletas,
  getTutoriasCompletasByTutor
};