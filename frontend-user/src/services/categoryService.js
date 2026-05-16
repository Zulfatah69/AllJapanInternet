import api from './api';

/**
 * Get all categories
 * @returns {Promise<Object>}
 */
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
