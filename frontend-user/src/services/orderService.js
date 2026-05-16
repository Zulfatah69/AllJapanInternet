import api from './api';

/**
 * Preview order before checkout
 * @param {Object} orderData
 * @returns {Promise<Object>}
 */
export const previewOrder = async (orderData) => {
  try {
    const response = await api.post('/order-preview', orderData);
    return response;
  } catch (error) {
    console.error('Error previewing order:', error);
    throw error;
  }
};
