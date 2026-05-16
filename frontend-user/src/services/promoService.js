import api from './api';

/**
 * Get all active promos
 * @returns {Promise<Object>}
 */
export const getPromos = async () => {
  try {
    const response = await api.get('/promos');
    return response;
  } catch (error) {
    console.error('Error fetching promos:', error);
    throw error;
  }
};
