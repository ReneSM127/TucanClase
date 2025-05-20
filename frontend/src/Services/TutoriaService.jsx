import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tutorias'; // Reemplaza con tu URL real

export const getTutorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tutorias:', error);
    throw new Error('No se pudieron cargar las tutorías');
  }
};

// Opcional: función para obtener una tutoría específica
export const getTutoriaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tutoria with id ${id}:`, error);
    throw new Error('No se pudo cargar la tutoría');
  }
};