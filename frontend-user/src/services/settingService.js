import api from './api';

/**
 * Get website settings (theme, colors, etc)
 * @returns {Promise<Object>}
 */
export const getSettings = async () => {
  try {
    const response = await api.get('/settings');
    return response;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};
