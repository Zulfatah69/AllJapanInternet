import { resolveMediaUrl } from './media';
import type { Product } from '../types/api';

export function isBestSeller(product: Product): boolean {
    return Boolean(product.is_best_seller ?? product.best_seller);
}

export function productImage(product: Product): string | undefined {
    return (
        resolveMediaUrl(product.thumbnail_url) ??
        resolveMediaUrl(product.thumbnail)
    );
}

function computeLowestPrice(product: Product): number | null {
    if (product.lowest_price != null && Number(product.lowest_price) > 0) {
        return Number(product.lowest_price);
    }

    const prices: number[] = [];
    for (const variant of product.variants ?? []) {
        const monthly = Number(variant.monthly_price);
        if (monthly > 0) prices.push(monthly);
        for (const period of variant.billing_periods ?? []) {
            const initial = Number(period.initial_price);
            if (initial > 0) prices.push(initial);
        }
        for (const price of variant.prices ?? []) {
            const harga = Number((price as { harga?: number }).harga);
            if (harga > 0) prices.push(harga);
        }
    }

    return prices.length ? Math.min(...prices) : null;
}

export function normalizeProduct(raw: Record<string, unknown>): Product {
    const p = { ...(raw as Product) };
    p.thumbnail_url = productImage(p);
    p.lowest_price = computeLowestPrice(p);
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
