import type { Settings } from '../types/api';

/**
 * Normalizes /api/settings — supports raw Setting model or { success, data } envelope.
 */
export function normalizeSettings(raw: unknown): Settings | null {
    if (!raw || typeof raw !== 'object') return null;

    const root = raw as Record<string, unknown>;
    const row =
        root.data && typeof root.data === 'object' && !Array.isArray(root.data)
            ? (root.data as Record<string, unknown>)
            : root;

    if (
        row.theme == null &&
        row.website_name == null &&
        row.whatsapp == null &&
        row.whatsapp_number == null
    ) {
        return null;
    }

    return {
        website_name: stringOrUndefined(row.website_name),
        logo: stringOrUndefined(row.logo),
        favicon: stringOrUndefined(row.favicon),
        whatsapp: stringOrUndefined(row.whatsapp ?? row.whatsapp_number),
        telegram: stringOrUndefined(row.telegram),
        line: stringOrUndefined(row.line),
        email: stringOrUndefined(row.email),
        instagram: stringOrUndefined(row.instagram),
        tiktok: stringOrUndefined(row.tiktok),
        youtube: stringOrUndefined(row.youtube),
        footer_text: stringOrUndefined(row.footer_text),
        theme: stringOrUndefined(row.theme),
    };
}

function stringOrUndefined(value: unknown): string | undefined {
    if (value == null || value === '') return undefined;
    return String(value);
}
