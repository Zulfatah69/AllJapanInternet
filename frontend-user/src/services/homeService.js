import api from './api';

/**
 * Get homepage data (promos, best sellers, new products, categories)
 * @returns {Promise<Object>}
 */
export const getHomeData = async () => {
  try {
    const response = await api.get('/home');
    return response;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};
