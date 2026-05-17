'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiWifi } from 'react-icons/fi';

import { AMBIENT_IMAGES } from '../../lib/visuals';
import { formatYen } from '../../lib/utils';
import { easeLuxury } from '../../lib/motion';
import { Button } from '../ui/Button';
import { useApp } from '../../providers/AppProvider';

export function HeroSection({
    promos,
    products = [],
}: {
    promos: any[];
    products?: any[];
}) {
    const { copy, settings } = useApp();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (promos.length <= 1) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % promos.length), 6000);
        return () => clearInterval(id);
    }, [promos.length]);

    const promo = promos[index];
    const floatProducts = products.slice(0, 3);
    const bgImage = promo?.gambar_url || AMBIENT_IMAGES.tokyoNight;
    const brandName = settings?.website_name || 'All Japan Internet';

    return (
        <section id="home" className="relative min-h-[100svh] overflow-hidden">
            <div className="absolute inset-0 hero-mesh" />

            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={bgImage}
                        src={bgImage}
                        alt=""
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: easeLuxury }}
                        className="h-full w-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-contrast)]/92 via-[var(--bg-contrast)]/55 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-contrast)]/80 via-transparent to-transparent" />
                <div
                    className="absolute inset-0 opacity-40"
                    style={{ background: 'var(--gradient-mesh)' }}
                />
            </div>

            <div className="container-aji relative z-10 grid min-h-[100svh] items-center gap-12 py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: easeLuxury }}
                >
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                        <FiWifi className="text-[var(--accent)]" />
                        {copy.hero.badge}
                    </span>

                    <h1 className="mb-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                        {promo?.judul || brandName}
                    </h1>

                    <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
                        {promo?.deskripsi || copy.products.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button href="#products" className="!shadow-[var(--shadow-glow)]">
                            {copy.hero.cta}
                            <FiArrowRight />
                        </Button>
                        <Button
                            href={promo?.link || '/promos'}
                            variant="outline"
                            className="!border-white/35 !bg-white/10 !text-white backdrop-blur-md hover:!bg-white/20"
                        >
                            {copy.hero.ctaSecondary}
                        </Button>
                    </div>

                    <div className="mt-14 flex flex-wrap gap-10 border-t border-white/15 pt-10">
                        {[
                            { label: 'Japan', value: 'Nationwide' },
                            { label: 'Plans', value: `${products.length}+` },
                            { label: 'Support', value: 'EN / JA' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-xs uppercase tracking-widest text-white/50">{stat.label}</p>
                                <p className="text-xl font-semibold text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="relative hidden min-h-[420px] lg:block">
                    <motion.div
                        className="absolute right-0 top-8 w-[280px] animate-float-slow"
                    >
                        <div className="premium-card overflow-hidden rounded-3xl p-1">
                            <div className="rounded-[1.25rem] bg-[var(--bg-elevated)] p-5">
                                <p className="eyebrow mb-2 !text-[var(--primary-strong)]">eSIM / SIM</p>
                                <p className="text-lg font-semibold text-[var(--fg)]">{brandName}</p>
                                <p className="mt-2 text-sm text-[var(--fg-muted)]">{copy.products.subtitle}</p>
                            </div>
                        </div>
                    </motion.div>

                    {floatProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.15, duration: 0.7, ease: easeLuxury }}
                            className="absolute w-[240px]"
                            style={{
                                left: i === 0 ? '0%' : i === 1 ? '18%' : '8%',
                                top: i === 0 ? '38%' : i === 1 ? '58%' : '18%',
                            }}
                        >
                            <Link
                                href={`/products/${product.slug}`}
                                className="premium-card group block overflow-hidden rounded-2xl"
                            >
                                {product.thumbnail_url && (
                                    <div className="relative h-28 overflow-hidden">
                                        <img
                                            src={product.thumbnail_url}
                                            alt={product.nama}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    </div>
                                )}
                                <div className="p-4">
                                    <p className="truncate text-sm font-semibold">{product.nama}</p>
                                    <p className="text-gradient text-lg font-bold">
                                        {formatYen(product.lowest_price)}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {promos.length > 0 && (
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute bottom-4 right-4 max-w-[200px] rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl"
                        >
                            <p className="text-xs text-white/60">Promo</p>
                            <p className="line-clamp-2 text-sm font-medium text-white">
                                {promos[index]?.judul}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

            {promos.length > 1 && (
                <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                    {promos.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Slide ${i + 1}`}
                            onClick={() => setIndex(i)}
                            className="h-1 rounded-full transition-all duration-300"
                            style={{
                                width: i === index ? 40 : 10,
                                background: i === index ? 'white' : 'rgba(255,255,255,0.35)',
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
