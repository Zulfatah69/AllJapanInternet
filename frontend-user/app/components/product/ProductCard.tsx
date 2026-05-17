'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

import { formatYen } from '../../lib/utils';
import { easeLuxury } from '../../lib/motion';

export function ProductCard({
    product,
    labels,
    index = 0,
}: {
    product: any;
    labels: { bestSeller: string; viewDetails: string };
    index?: number;
}) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.07, duration: 0.6, ease: easeLuxury }}
            whileHover={{ y: -10 }}
            className="group relative"
        >
            <div
                className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'var(--glow-soft)' }}
            />
            <Link
                href={`/products/${product.slug}`}
                className="premium-card relative block overflow-hidden rounded-[1.65rem]"
            >
                <div className="relative aspect-[4/3] overflow-hidden">
                    {product.thumbnail_url ? (
                        <>
                            <img
                                src={product.thumbnail_url}
                                alt={product.nama}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                        </>
                    ) : (
                        <div
                            className="flex h-full items-center justify-center"
                            style={{ background: 'var(--gradient-mesh)' }}
                        />
                    )}

                    {product.provider?.nama && (
                        <span className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                            {product.provider.nama}
                        </span>
                    )}

                    {product.is_best_seller && (
                        <span
                            className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg"
                            style={{ background: 'var(--gradient-accent)' }}
                        >
                            {labels.bestSeller}
                        </span>
                    )}
                </div>

                <div className="relative p-6 md:p-7">
                    <p className="eyebrow mb-2 !text-[var(--fg-muted)]">{product.category?.nama}</p>
                    <h3 className="mb-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-[var(--primary-strong)] md:text-2xl">
                        {product.nama}
                    </h3>

                    <div className="flex items-end justify-between gap-4 border-t border-[var(--border)] pt-5">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-[var(--fg-muted)]">from</p>
                            <p className="text-2xl font-bold tracking-tight md:text-3xl">
                                {formatYen(product.lowest_price)}
                            </p>
                        </div>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--gradient-accent)] group-hover:text-white">
                            <FiArrowUpRight className="transition-transform group-hover:rotate-12" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
