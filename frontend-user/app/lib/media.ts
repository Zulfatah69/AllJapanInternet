import { API_BASE_URL } from './api';

/** Origin of Laravel app (without /api) — used for /storage assets */
export const STORAGE_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');

/**
 * Resolves backend image paths to a full URL.
 * Handles: full URLs, storage/foo.jpg, foo.jpg, /storage/foo.jpg
 */
export function resolveMediaUrl(path?: string | null): string | undefined {
    if (path == null) return undefined;
    const trimmed = String(path).trim();
    if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return undefined;

    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }

    const cleaned = trimmed.replace(/^\/+/, '').replace(/^storage\//, '');
    return `${STORAGE_ORIGIN}/storage/${cleaned}`;
}
