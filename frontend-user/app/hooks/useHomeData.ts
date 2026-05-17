'use client';

import { useCallback, useEffect, useState } from 'react';

import api, { asArray } from '../lib/api';
import { resolveMediaUrl } from '../lib/media';
import { getHomeData } from '../services/home.service';
import { getSettings } from '../services/settings.service';
import type { Category, Product, Promo, Settings, Testimonial } from '../types/api';
import type { Provider } from '../types/api';

export function useHomeData() {
    const [products, setProducts] = useState<Product[]>([]);
    const [bestSellers, setBestSellers] = useState<Product[]>([]);
    const [newProducts, setNewProducts] = useState<Product[]>([]);
    const [promos, setPromos] = useState<Promo[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const [home, settingsData, testimonialsRes, providersRes, categoriesRes] =
                await Promise.all([
                    getHomeData(),
                    getSettings(),
                    api.get('/testimonials'),
                    api.get('/providers'),
                    api.get('/categories'),
                ]);

            setProducts(home.products);
            setBestSellers(home.best_sellers);
            setNewProducts(home.new_products);
            setPromos(home.promos);
            setCategories(
                home.categories.length
                    ? home.categories
                    : asArray<Category>(categoriesRes.data),
            );
            setTestimonials(
                asArray<Testimonial>(testimonialsRes.data).map((t) => ({
                    ...t,
                    image_url:
                        resolveMediaUrl(t.image_url) ?? resolveMediaUrl(t.image) ?? t.image_url,
                })),
            );
            setProviders(asArray<Provider>(providersRes.data));
            setSettings(settingsData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    return {
        products,
        bestSellers,
        newProducts,
        promos,
        testimonials,
        categories,
        providers,
        settings,
        loading,
        reload: load,
    };
}
