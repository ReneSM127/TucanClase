import axios from 'axios';

const API_URL = 'http://localhost:5000/api/usuario'; // Ajusta el puerto si es diferente

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener el usuario' };
  }
};

export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/estudiantes`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener el usuario' };
  }
};

export const getAllTutors = async () => {
  try {
    const response = await axios.get(`${API_URL}/tutores`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener el usuario' };
  }
};

export const getAllStudent = async () => {
  try {
    const response = await axios.get(`${API_URL}/estudiantes`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener el usuario' };
  }
};



