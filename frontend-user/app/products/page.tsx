'use client';

import { useEffect, useState } from 'react';

import { getCategories } from '../services/category.service';
import api, { asArray } from '../lib/api';
import type { Category, Provider } from '../types/api';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { ProductGridSkeleton } from '../components/ui/Skeleton';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilters } from '../components/product/ProductFilters';
import { useDebouncedProductSearch } from '../hooks/useDebouncedSearch';
import { useApp } from '../providers/AppProvider';

export default function ProductsPage() {
    const { copy } = useApp();
    const [selectedType, setSelectedType] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProvider, setSelectedProvider] = useState('all');
    const [selectedBilling, setSelectedBilling] = useState('all');
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [providers, setProviders] = useState<Provider[]>([]);

    useEffect(() => {
        Promise.all([getCategories(), api.get('/providers')]).then(([cats, provRes]) => {
            setCategories(cats);
            setProviders(asArray<Provider>(provRes.data));
        });
    }, []);

    const { results, loading } = useDebouncedProductSearch({
        search: search || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        provider: selectedProvider !== 'all' ? selectedProvider : undefined,
        billing: selectedBilling !== 'all' ? selectedBilling : undefined,
        type: selectedType !== 'all' ? selectedType : undefined,
    });

    const typeChips = [
        { id: 'all', label: copy.products.all },
        { id: 'monthly', label: copy.products.monthly },
        { id: 'yearly', label: copy.products.yearly },
    ];
    const billingChips = [
        { id: 'all', label: copy.products.all },
        { id: 'monthly', label: copy.products.monthly },
        { id: 'yearly', label: copy.products.yearly },
    ];

    return (
        <div className="section-padding" style={{ background: 'var(--bg)' }}>
            <Container>
                <SectionHeader title={copy.products.title} subtitle={copy.products.subtitle} align="left" />
                <div className="mb-8">
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={copy.search.placeholder}
                        className="w-full max-w-lg rounded-2xl border bg-[var(--bg-elevated)] px-5 py-3 outline-none focus:border-[var(--primary)]"
                        style={{ borderColor: 'var(--border)' }}
                    />
                </div>
                <ProductFilters
                    typeChips={typeChips}
                    categoryChips={[
                        { id: 'all', label: copy.products.allCategories },
                        ...categories.map((c) => ({ id: c.slug, label: c.nama })),
                    ]}
                    providerChips={[
                        { id: 'all', label: copy.products.allProviders },
                        ...providers.map((p) => ({ id: p.slug, label: p.nama })),
                    ]}
                    billingChips={billingChips}
                    selectedType={selectedType}
                    selectedCategory={selectedCategory}
                    selectedProvider={selectedProvider}
                    selectedBilling={selectedBilling}
                    onType={setSelectedType}
                    onCategory={setSelectedCategory}
                    onProvider={setSelectedProvider}
                    onBilling={setSelectedBilling}
                />
                {loading ? (
                    <ProductGridSkeleton />
                ) : results.length === 0 ? (
                    <EmptyState message={copy.products.empty} />
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {results.map((product, i) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={i}
                                labels={{
                                    bestSeller: copy.products.bestSeller,
                                    viewDetails: copy.products.viewDetails,
                                }}
                            />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
