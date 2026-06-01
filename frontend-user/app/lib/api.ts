import axios from 'axios';
import { getApiBaseUrl } from './apiBase';

const api = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 15000,
    headers: {
        Accept: 'application/json',
    },
});

export default api;

export async function getSimpleProducts() {
    const response = await api.get('/simple-products');
    return response.data;
}

/**
 * Ambil settings dari backend. Return null jika gagal (backend mati / offline).
 */
export async function getSettingsSafe(): Promise<unknown | null> {
    try {
        const response = await api.get('/settings');
        return response.data;
    } catch {
        return null;
    }
}
