'use client';

import { useEffect, useState } from 'react';

import { getProducts, type ProductFilters } from '../services/product.service';
import type { Product } from '../types/api';

export function useDebouncedProductSearch(
    filters: ProductFilters,
    delayMs = 400,
) {
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await getProducts(filters);
                if (!controller.signal.aborted) {
                    setResults(data);
                }
            } catch (e) {
                if (!controller.signal.aborted) {
                    console.error(e);
                    setResults([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }, delayMs);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [
        filters.search,
        filters.category,
        filters.provider,
        filters.billing,
        filters.type,
        delayMs,
    ]);

    return { results, loading };
}
