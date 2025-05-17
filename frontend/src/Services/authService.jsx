import axios from 'axios';

// Opcional: Configuración global de Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajusta según tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {
    const response = await api.post('auth/login', { email, password });
    return response.data;
  } catch (error) {
    // Manejo de errores más detallado con Axios
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      throw new Error(error.response.data.message || 'Error al iniciar sesión');
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Algo pasó al configurar la solicitud
      throw new Error('Error al configurar la solicitud');
    }
  }
};

export const register = async (nombre, apellidos, email, password, rol) => {
  try {
    const response = await api.post('usuario', {nombre, apellidos, email, password, rol});
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};
