import api, { unwrapData } from '../lib/api';
import type { Settings } from '../types/api';

export async function getSettings(): Promise<Settings | null> {
    const response = await api.get('/settings');
    const data = unwrapData<Settings>(response.data);
    return data ?? null;
}
