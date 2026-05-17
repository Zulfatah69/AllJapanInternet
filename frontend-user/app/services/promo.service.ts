import api, { asArray } from '../lib/api';
import { resolveMediaUrl } from '../lib/media';
import type { Promo } from '../types/api';

function normalizePromo(promo: Promo): Promo {
    return {
        ...promo,
        gambar_url:
            resolveMediaUrl(promo.gambar_url) ?? resolveMediaUrl(promo.gambar) ?? null,
    };
}

export async function getPromos(): Promise<Promo[]> {
    const response = await api.get('/promos');
    return asArray<Promo>(response.data).map(normalizePromo);
}
