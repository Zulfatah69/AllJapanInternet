import api, { asArray, unwrapData } from '../lib/api';
import { normalizeProduct } from '../lib/product';
import type { Product } from '../types/api';

export type ProductFilters = {
    search?: string;
    category?: string;
    provider?: string;
    billing?: string;
    type?: string;
};

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
    const response = await api.get('/products', { params: filters });
    return asArray<Record<string, unknown>>(response.data).map((item) =>
        normalizeProduct(item),
    );
}

export async function getProduct(slug: string): Promise<Product> {
    const response = await api.get(`/products/${slug}`);
    return normalizeProduct(unwrapData<Record<string, unknown>>(response.data));
}
