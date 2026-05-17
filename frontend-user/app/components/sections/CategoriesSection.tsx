'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

import type { Category } from '../../types/api';
import { staggerContainer, fadeUp } from '../../lib/motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

export function CategoriesSection({ categories }: { categories: Category[] }) {
    const { copy } = useApp();

    if (!categories.length) return null;

    return (
        <SectionShell id="categories" variant="glow">
            <Container>
                <SectionHeader
                    title={copy.categories?.title ?? 'Categories'}
                    subtitle={copy.categories?.subtitle ?? 'Browse plans by category'}
                    eyebrow="Explore"
                />
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                >
                    {categories.map((category, i) => (
                        <motion.div key={category.id} variants={fadeUp} custom={i}>
                            <Link
                                href={`/#products`}
                                onClick={() => {
                                    if (typeof window !== 'undefined') {
                                        window.dispatchEvent(
                                            new CustomEvent('aji-filter-category', {
                                                detail: category.slug,
                                            }),
                                        );
                                    }
                                }}
                                className="premium-card group flex items-center justify-between rounded-2xl p-5 md:p-6"
                            >
                                <div>
                                    <p className="text-lg font-semibold tracking-tight transition-colors group-hover:text-[var(--primary-strong)]">
                                        {category.nama}
                                    </p>
                                    <p className="mt-1 text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                                        {category.slug}
                                    </p>
                                </div>
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] transition-all group-hover:bg-[var(--gradient-accent)] group-hover:text-white">
                                    <FiArrowUpRight />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </SectionShell>
    );
}
