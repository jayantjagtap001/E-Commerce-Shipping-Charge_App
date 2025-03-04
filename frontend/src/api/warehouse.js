import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/warehouse';

export const getNearestWarehouse = async (sellerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/nearest?sellerId=${sellerId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
