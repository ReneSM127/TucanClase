import axios from 'axios';

// Opcional: Configuración global de Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajusta según tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createMateriaService = async (nombre, descripcion) => {
  try {
    const response = await api.post('materias/', {nombre, descripcion});
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};

export const getAllMaterias = async () => {
  try {
    const response = await axios.get(`${API_URL}/materias/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tutorias:', error);
    throw new Error('No se pudieron cargar las tutorías');
  }
};

export const createTutoriaService = async (nombre, descripcion) => {
  try {
    const response = await api.post('materias/', {nombre, descripcion});
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};
