import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configurar interceptor para añadir token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllMaterias = async () => {
  try {
    const response = await api.get('/materias/');
    return response.data;
  } catch (error) {
    console.error('Error fetching materias:', error);
    throw new Error('No se pudieron cargar las materias');
  }
};

export const createTutoriaService = async (tutoriaData) => {
  try {
    const response = await api.post('/tutorias/', tutoriaData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear la tutoría');
  }
};

export const createMateriaService = async (nombre, descripcion) => {
  try {
    const response = await api.post('/materias/', { nombre, descripcion });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear la materia');
  }
};