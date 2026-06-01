/**
 * Base URL API — fallback aman jika env kosong atau backend belum jalan.
 * Di browser, `/api` di-proxy ke Laravel lewat next.config rewrites.
 */
export function getApiBaseUrl(): string {
    const fromEnv = process.env.NEXT_PUBLIC_API_URL?.trim();

    if (fromEnv) {
        return fromEnv.replace(/\/$/, '');
    }

    if (typeof window !== 'undefined') {
        return '/api';
    }

    return 'http://127.0.0.1:8000/api';
}
