import axios from 'axios';

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    'http://127.0.0.1:8000/api';

export function unwrapData<T>(payload: unknown): T {
    if (payload && typeof payload === 'object' && 'data' in payload) {
        return (payload as { data: T }).data;
    }
    return payload as T;
}

export function asArray<T>(payload: unknown): T[] {
    if (Array.isArray(payload)) {
        return payload;
    }

    const unwrapped = unwrapData<unknown>(payload);
    if (Array.isArray(unwrapped)) {
        return unwrapped as T[];
    }

    return [];
}

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;