import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Reemplaza con tu URL real

export const getTutorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/tutorias/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tutorias:', error);
    throw new Error('No se pudieron cargar las tutorías');
  }
};

//Obtener info del tutor por id
export const getTutorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tutorias:', error);
    throw new Error('No se pudo cargar la info del tutor');
  }
};

//Obtener info de todas las reviews del tutor
export const getAllReviewsByTutorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/tutor/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tutorias:', error);
    throw new Error('No se pudo cargar la info de las reviews del tutor');
  }
};

//Obtener info de todas las reviews de la tutoria
export const getAllReviewsByTutoriaId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/tutoria/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tutorias:', error);
    throw new Error('No se pudo cargar la info de las reviews del tutor');
  }
};

//Obtener info de todas las tutorias del tutor
export const getAllTutoriasById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tutorias/tutor/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tutorias:', error);
    throw new Error('No se pudo cargar la info de las tutorias del tutor');
  }
};

// Opcional: función para obtener una tutoría específica
export const getTutoriaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tutorias${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tutoria with id ${id}:`, error);
    throw new Error('No se pudo cargar la tutoría');
  }
};

//Obtener info del tutor por id
export const getEstudiantesInscritosByTutor = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/inscripciones/all/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tutorias:', error);
    throw new Error('No se pudo cargar la info del tutor');
  }
};
