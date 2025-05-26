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

export const createInscripcion = async (estudiante_id, tutoria_id) => {
  try {
    const response = await api.post('/inscripciones/', {estudiante_id, tutoria_id});
    return response.data;
  } catch (error) {
    console.error('Error fetching materias:', error);
    throw new Error('No se pudieron cargar las materias');
  }
};

export const deleteInscripcion = async (id) => {
  try {
    const response = await api.delete(`/inscripciones/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching materias:', error);
    throw new Error('Error al borrar');
  }
};
