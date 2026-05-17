import api, { asArray } from '../lib/api';

export async function getProducts() {

    const response =
        await api.get(
            '/products'
        );

    return asArray(response.data);
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