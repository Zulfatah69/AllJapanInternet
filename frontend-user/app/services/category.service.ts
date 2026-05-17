import api, { asArray } from '../lib/api';
import type { Category } from '../types/api';

export async function getCategories(): Promise<Category[]> {
    const response = await api.get('/categories');
    return asArray<Category>(response.data);
}
