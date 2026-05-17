import api from '../lib/api';
import { normalizeSettings } from '../lib/normalize-settings';
import type { Settings } from '../types/api';

export async function getSettings(): Promise<Settings | null> {
    const response = await api.get('/settings');
    return normalizeSettings(response.data);
}
