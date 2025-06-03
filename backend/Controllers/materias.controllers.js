const Materia = require('../Models/materias.models');

const getAllMaterias = async (req, res) => {
  try {
    const materias = await Materia.getAllMaterias();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las materias' });
  }
};

const getMateria = async (req, res) => {
  try {
    const materia = await Materia.getMateriaById(req.params.id);
    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    res.json(materia);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la materia' });
  }
};

const createMateria = async (req, res) => {
  const { nombre, descripcion } = req.body;
  
  try {
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const newMateriaId = await Materia.insertMateria(
      nombre, 
      descripcion || ''
    );
    
    res.status(201).json({ 
      id: newMateriaId, 
      message: 'Materia creada correctamente' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la materia' });
  }
};

const updateMateria = async (req, res) => {
  const { nombre, descripcion } = req.body;
  
  try {
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    await Materia.updateMateria(
      req.params.id,
      nombre, 
      descripcion || ''
    );
    
    res.json({ message: 'Materia actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la materia' });
  }
};

const deleteMateria = async (req, res) => {
  try {
    const result = await Materia.deleteMateriaById(req.params.id);
    if (result) {
      res.status(204).send();
    }
  } catch (error) {
    if (error.message.includes('tutorías asociadas')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al eliminar la materia' });
    }
  }
};

const getMateriasConTutorias = async (req, res) => {
  try {
    const materias = await Materia.getMateriasConTutorias();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las materias con tutorías' });
  }
};

module.exports = {
  getAllMaterias,
  getMateria,
  createMateria,
  updateMateria,
  deleteMateria,
  getMateriasConTutorias
};