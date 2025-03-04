import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/shipping-charge';

export const getShippingCharge = async (warehouseId, customerId, deliverySpeed) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}?warehouseId=${warehouseId}&customerId=${customerId}&deliverySpeed=${deliverySpeed}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const calculateShipping = async (sellerId, customerId, deliverySpeed) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/calculate`, {
      sellerId,
      customerId,
      deliverySpeed,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
