'use client';

import { motion } from 'framer-motion';

import { staggerContainer, fadeUp } from '../../lib/motion';
import { Container } from '../ui/Container';
import { EmptyState } from '../ui/EmptyState';
import { ProductGridSkeleton } from '../ui/Skeleton';
import { SectionHeader } from '../ui/SectionHeader';
import { ProductCard } from '../product/ProductCard';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

export function BestSellerSection({
    products,
    loading,
}: {
    products: any[];
    loading: boolean;
}) {
    const { copy } = useApp();

    return (
        <SectionShell id="best-sellers" variant="muted">
            <Container>
                <SectionHeader
                    title={copy.bestSeller.title}
                    subtitle={copy.bestSeller.subtitle}
                    eyebrow="Featured"
                />
                {loading ? (
                    <ProductGridSkeleton />
                ) : products.length === 0 ? (
                    <EmptyState message={copy.bestSeller.empty} />
                ) : (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {products.map((product, i) => (
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
