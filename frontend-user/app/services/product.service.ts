import api from '../lib/api';

export async function getProducts() {

    const response =
        await api.get(
            '/products'
        );

    const data = response.data;
    return Array.isArray(data) ? data : data?.data ?? [];
}

export async function getProduct(
    slug: string
) {

    const response =
        await api.get(
            `/products/${slug}`
        );

    return response.data;
}