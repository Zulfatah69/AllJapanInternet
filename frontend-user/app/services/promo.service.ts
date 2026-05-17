import api, { asArray } from '../lib/api';
import type { Promo } from '../types/api';

export async function getPromos(): Promise<Promo[]> {
    const response = await api.get('/promos');
    return asArray<Promo>(response.data);
}
