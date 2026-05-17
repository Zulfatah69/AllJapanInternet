import { create } from 'zustand';

import type { Product, Settings } from '../types/api';

type CatalogState = {
    settings: Settings | null;
    searchQuery: string;
    setSettings: (settings: Settings | null) => void;
    setSearchQuery: (query: string) => void;
};

export const useCatalogStore = create<CatalogState>((set) => ({
    settings: null,
    searchQuery: '',
    setSettings: (settings) => set({ settings }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

export function useSearchResults(products: Product[], query: string): Product[] {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
        const haystack = [
            p.nama,
            p.type,
            p.code,
            p.category?.nama,
            p.provider?.nama,
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
        return haystack.includes(q);
    });
}
