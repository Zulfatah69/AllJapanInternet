import api, { asArray, unwrapData } from '../lib/api';
import { normalizeProduct } from '../lib/product';
import type { Category, HomeData, Product, Promo } from '../types/api';
import { getProducts } from './product.service';
import { getPromos } from './promo.service';
import { getCategories } from './category.service';

async function fetchHomeEndpoint(): Promise<HomeData | null> {
    try {
        const response = await api.get('/home');
        const body = response.data;
        const data = unwrapData<{
            promos?: Promo[];
            best_sellers?: Product[];
            new_products?: Product[];
            categories?: Category[];
        }>(body);

        if (!data || typeof data !== 'object') return null;

        return {
            promos: (data.promos ?? []).map((p) => p),
            best_sellers: (data.best_sellers ?? []).map(normalizeProduct),
            new_products: (data.new_products ?? []).map(normalizeProduct),
            categories: data.categories ?? [],
        };
    } catch {
        return null;
    }
}

export async function getHomeData(): Promise<HomeData & { products: Product[] }> {
    const fromHome = await fetchHomeEndpoint();

    if (fromHome) {
        const products =
            fromHome.new_products.length > 0
                ? fromHome.new_products
                : await getProducts();

        return { ...fromHome, products };
    }

    const [products, promos, categories] = await Promise.all([
        getProducts(),
        getPromos(),
        getCategories(),
    ]);

    const best_sellers = products.filter(
        (p) => p.is_best_seller || p.best_seller,
    );

    return {
        promos,
        best_sellers: best_sellers.length ? best_sellers : products.slice(0, 8),
        new_products: products.slice(0, 8),
        categories: categories.slice(0, 8),
        products,
    };
}
