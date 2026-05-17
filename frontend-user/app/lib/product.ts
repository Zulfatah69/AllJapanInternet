import type { Product } from '../types/api';

export function isBestSeller(product: Product): boolean {
    return Boolean(product.is_best_seller ?? product.best_seller);
}

export function productImage(product: Product): string | undefined {
    return product.thumbnail_url ?? undefined;
}

export function normalizeProduct(raw: Record<string, unknown>): Product {
    const p = raw as Product;
    if (!p.thumbnail_url && p.thumbnail) {
        const thumb = String(p.thumbnail);
        if (thumb.startsWith('http')) {
            p.thumbnail_url = thumb;
        }
    }
    return p;
}

export function collectPaymentMethods(products: Product[]): { id: number; nama: string }[] {
    const map = new Map<number, string>();
    for (const product of products) {
        for (const method of product.payment_methods ?? []) {
            if (method?.id && method?.nama) {
                map.set(method.id, method.nama);
            }
        }
    }
    return Array.from(map.entries()).map(([id, nama]) => ({ id, nama }));
}
