import axios from 'axios';

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    'http://127.0.0.1:8000/api';

export function asArray<T>(payload: unknown): T[] {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (
        payload &&
        typeof payload === 'object' &&
        'data' in payload &&
        Array.isArray((payload as { data: unknown }).data)
    ) {
        return (payload as { data: T[] }).data;
    }

    return [];
}

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;