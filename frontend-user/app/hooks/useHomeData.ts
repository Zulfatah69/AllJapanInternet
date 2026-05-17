'use client';

import { useCallback, useEffect, useState } from 'react';

import api, { asArray } from '../lib/api';
import { getProducts } from '../services/product.service';

export function useHomeData() {
    const [products, setProducts] = useState<any[]>([]);
    const [promos, setPromos] = useState<any[]>([]);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [providers, setProviders] = useState<any[]>([]);
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const [
                productsData,
                promosRes,
                testimonialsRes,
                categoriesRes,
                providersRes,
                settingsRes,
            ] = await Promise.all([
                getProducts(),
                api.get('/promos'),
                api.get('/testimonials'),
                api.get('/categories'),
                api.get('/providers'),
                api.get('/settings'),
            ]);

            setProducts(productsData);
            setPromos(asArray(promosRes.data));
            setTestimonials(asArray(testimonialsRes.data));
            setCategories(asArray(categoriesRes.data));
            setProviders(asArray(providersRes.data));
            setSettings(settingsRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const bestSellers = products.filter((p) => p.is_best_seller);

    return {
        products,
        bestSellers,
        promos,
        testimonials,
        categories,
        providers,
        settings,
        loading,
        reload: load,
    };
}
