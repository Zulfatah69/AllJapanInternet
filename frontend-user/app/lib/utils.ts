import { resolveMediaUrl } from './media';

export function storageUrl(path?: string | null): string | undefined {
    return resolveMediaUrl(path);
}

export function formatYen(value?: number | string | null): string {
    const num = Number(value ?? 0);
    return `¥${num.toLocaleString('ja-JP')}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}
