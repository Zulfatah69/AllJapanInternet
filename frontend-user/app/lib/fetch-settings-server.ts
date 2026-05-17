import { API_BASE_URL } from './api';
import { normalizeSettings } from './normalize-settings';
import type { Settings } from '../types/api';

export async function fetchSettingsServer(): Promise<Settings | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/settings`, {
            headers: { Accept: 'application/json' },
            next: { revalidate: 30 },
        });

        if (!res.ok) return null;

        const json = await res.json();
        return normalizeSettings(json);
    } catch {
        return null;
    }
}
