import api from './api';

/**
 * Get all products with optional filters
 * @param {Object} filters - {search, category, type, billing, provider}
 * @returns {Promise<Object>}
 */
export const getProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.type) params.append('type', filters.type);
    if (filters.billing) params.append('billing', filters.billing);
    if (filters.provider) params.append('provider', filters.provider);
    
    const response = await api.get(`/products${params.toString() ? '?' + params.toString() : ''}`);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Get product detail by slug
 * @param {string} slug
 * @returns {Promise<Object>}
 */
export const getProductDetail = async (slug) => {
  try {
    const response = await api.get(`/products/${slug}`);
    return response;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    throw error;
  }
};

/**
 * Search products (realtime)
 * @param {string} query
 * @returns {Promise<Object>}
 */
export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/products?search=${encodeURIComponent(query)}`);
    return response;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

/**
 * Get products by category
 * @param {string} category
 * @returns {Promise<Object>}
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products?category=${category}`);
    return response;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

/**
 * Get products by type
 * @param {string} type
 * @returns {Promise<Object>}
 */
export const getProductsByType = async (type) => {
  try {
    const response = await api.get(`/products?type=${type}`);
    return response;
  } catch (error) {
    console.error('Error fetching products by type:', error);
    throw error;
  }
};

/**
 * Get products by billing type
 * @param {string} billing
 * @returns {Promise<Object>}
 */
export const getProductsByBilling = async (billing) => {
  try {
    const response = await api.get(`/products?billing=${billing}`);
    return response;
  } catch (error) {
    console.error('Error fetching products by billing:', error);
    throw error;
  }
};

/**
 * Get products by provider
 * @param {string} provider
 * @returns {Promise<Object>}
 */
export const getProductsByProvider = async (provider) => {
  try {
    const response = await api.get(`/products?provider=${provider}`);
    return response;
  } catch (error) {
    console.error('Error fetching products by provider:', error);
    throw error;
  }
};
