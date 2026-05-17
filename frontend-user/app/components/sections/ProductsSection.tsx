'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { staggerContainer, fadeUp } from '../../lib/motion';
import { Container } from '../ui/Container';
import { EmptyState } from '../ui/EmptyState';
import { ProductGridSkeleton } from '../ui/Skeleton';
import { SectionHeader } from '../ui/SectionHeader';
import { ProductCard } from '../product/ProductCard';
import { ProductFilters } from '../product/ProductFilters';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

export function ProductsSection({
    products,
    categories,
    providers,
    loading,
}: {
    products: any[];
    categories: any[];
    providers: any[];
    loading: boolean;
}) {
    const { copy } = useApp();
    const [selectedType, setSelectedType] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProvider, setSelectedProvider] = useState('all');
    const [selectedBilling, setSelectedBilling] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const handler = (e: Event) => {
            const slug = (e as CustomEvent<string>).detail;
            if (slug) setSelectedCategory(slug);
        };
        window.addEventListener('aji-filter-category', handler);
        return () => window.removeEventListener('aji-filter-category', handler);
    }, []);

    const filtered = useMemo(
        () =>
            products.filter((product) => {
                const matchCategory =
                    selectedCategory === 'all' || product.category?.slug === selectedCategory;
                const matchType = selectedType === 'all' || product.type === selectedType;
                const matchProvider =
                    selectedProvider === 'all' || product.provider?.slug === selectedProvider;
                const matchBilling =
                    selectedBilling === 'all' ||
                    product.billing_type === selectedBilling;
                const q = search.trim().toLowerCase();
                const matchSearch =
                    !q ||
                    [product.nama, product.type, product.code, product.category?.nama]
                        .filter(Boolean)
                        .join(' ')
                        .toLowerCase()
                        .includes(q);
                return matchCategory && matchType && matchProvider && matchBilling && matchSearch;
            }),
        [products, selectedCategory, selectedType, selectedProvider, selectedBilling, search],
    );

    const typeChips = [
        { id: 'all', label: copy.products.all },
        { id: 'monthly', label: copy.products.monthly },
        { id: 'yearly', label: copy.products.yearly },
    ];
    const categoryChips = [
        { id: 'all', label: copy.products.allCategories },
        ...categories.map((c) => ({ id: c.slug, label: c.nama })),
    ];
    const providerChips = [
        { id: 'all', label: copy.products.allProviders },
        ...providers.map((p) => ({ id: p.slug, label: p.nama })),
    ];
    const billingChips = [
        { id: 'all', label: copy.products.all },
        { id: 'monthly', label: copy.products.monthly },
        { id: 'yearly', label: copy.products.yearly },
    ];

    return (
        <SectionShell id="products" variant="default">
            <Container>
                <SectionHeader
                    title={copy.products.title}
                    subtitle={copy.products.subtitle}
                    eyebrow="Catalog"
                />
                <div className="mb-8">
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={copy.search.placeholder}
                        className="w-full max-w-md rounded-2xl border bg-[var(--bg-elevated)] px-5 py-3 outline-none transition-colors focus:border-[var(--primary)]"
                        style={{ borderColor: 'var(--border)' }}
                    />
                </div>
                <ProductFilters
                    typeChips={typeChips}
                    categoryChips={categoryChips}
                    providerChips={providerChips}
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
                ) : filtered.length === 0 ? (
                    <EmptyState message={copy.products.empty} />
                ) : (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {filtered.map((product, i) => (
                            <motion.div key={product.id} variants={fadeUp} custom={i}>
                                <ProductCard
                                    product={product}
                                    index={i}
                                    labels={{
                                        bestSeller: copy.products.bestSeller,
                                        viewDetails: copy.products.viewDetails,
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </Container>
        </SectionShell>
    );
}
