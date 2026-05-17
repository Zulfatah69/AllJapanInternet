import { API_BASE_URL } from './api';

const STORAGE_BASE = API_BASE_URL.replace(/\/api\/?$/, '');

export function storageUrl(path?: string | null): string | undefined {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    return `${STORAGE_BASE}/storage/${path.replace(/^\//, '')}`;
}

export function formatYen(value?: number | string | null): string {
    const num = Number(value ?? 0);
    return `¥${num.toLocaleString('ja-JP')}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}
