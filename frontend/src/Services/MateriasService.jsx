import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllMaterias = async () => {
  try {
    const response = await axios.get(`${API_URL}/materias`);
    return response.data;
  } catch (error) {
    console.error('Error fetching materias:', error);
    throw error;
  }
};

export const deleteMateriaById = async (id) => {
  try {
    await axios.delete(`${API_URL}/materias/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting materia:', error);
    throw error;
  }
};