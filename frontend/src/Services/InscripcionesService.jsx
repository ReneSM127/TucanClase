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

export const createReview = async (inscripcion_id, estrellas, comentario) => {
  try {
    const response = await api.post('/reviews/', {
      inscripcion_id,
      estrellas,
      comentario: comentario || ''
    });
    return response.data;
  } catch (error) {
    console.error('Error creando reseña:', error.response?.data || error.message);
    throw error;
  }
};

// Agrega estas dos funciones al final del archivo
export const updateReview = async (id, estrellas, comentario) => {
  try {
    const response = await api.put(`/reviews/${id}`, { estrellas, comentario });
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};