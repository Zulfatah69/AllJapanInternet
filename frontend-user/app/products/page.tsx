'use client';

import { useEffect, useState } from 'react';

import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { ProductGridSkeleton } from '../components/ui/Skeleton';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProductCard } from '../components/product/ProductCard';
import { getProducts } from '../services/api';
import { useApp } from '../providers/AppProvider';

export default function ProductsPage() {
    const { copy } = useApp();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="section-padding" style={{ background: 'var(--bg)' }}>
            <Container>
                <SectionHeader title={copy.products.title} subtitle={copy.products.subtitle} align="left" />
                {loading ? (
                    <ProductGridSkeleton />
                ) : products.length === 0 ? (
                    <EmptyState message={copy.products.empty} />
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product, i) => (
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
