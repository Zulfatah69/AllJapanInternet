'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiSmartphone, FiWifi } from 'react-icons/fi';

import { resolveMediaUrl } from '../../lib/media';
import { AMBIENT_IMAGES } from '../../lib/visuals';
import { easeLuxury } from '../../lib/motion';
import { Button } from '../ui/Button';
import { MediaImage } from '../ui/MediaImage';
import { useApp } from '../../providers/AppProvider';
import type { Promo } from '../../types/api';

export function HeroSection({
    promos,
    planCount = 0,
}: {
    promos: Promo[];
    planCount?: number;
}) {
    const { copy, settings } = useApp();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (promos.length <= 1) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % promos.length), 6000);
        return () => clearInterval(id);
    }, [promos.length]);

    const promo = promos[index];
    const promoImage =
        resolveMediaUrl(promo?.gambar_url) ?? resolveMediaUrl(promo?.gambar) ?? null;
    const bgImage = promoImage || AMBIENT_IMAGES.tokyoNight;
    const brandName = settings?.website_name || 'All Japan Internet';
    const logoUrl = resolveMediaUrl(settings?.logo);

    const highlights = [
        { icon: FiWifi, label: 'Nationwide coverage' },
        { icon: FiSmartphone, label: 'SIM & eSIM ready' },
        { icon: FiShield, label: 'EN / JA support' },
    ];

    return (
        <section id="home" className="relative min-h-[100svh] overflow-hidden">
            <motion.div
                className="absolute inset-0 hero-mesh pointer-events-none"
                style={{ background: 'var(--gradient-hero)' }}
                aria-hidden
            />

            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={bgImage}
                        src={bgImage}
                        alt=""
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: easeLuxury }}
                        className="h-full w-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-contrast)]/78 via-[var(--bg-contrast)]/40 to-transparent" />
                <div className="absolute inset-0 opacity-45" style={{ background: 'var(--gradient-mesh)' }} />
            </div>

            <div className="container-aji relative z-10 grid min-h-[100svh] items-center gap-12 py-28 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: easeLuxury }}
                >
                    <span className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
                        <FiWifi className="text-[var(--accent)]" />
                        {copy.hero.badge}
                    </span>

                    <h1 className="mb-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-sm md:text-6xl lg:text-7xl">
                        {promo?.judul || brandName}
                    </h1>

                    <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
                        {promo?.deskripsi || copy.products.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button href="#products" className="!shadow-[var(--shadow-glow)]">
                            {copy.hero.cta}
                            <FiArrowRight />
                        </Button>
                        <Button href={promo?.link || '#promos'} variant="outline" className="hero-ghost-btn">
                            {copy.hero.ctaSecondary}
                        </Button>
                    </div>

                    <div className="mt-14 flex flex-wrap gap-10 border-t border-white/20 pt-10">
                        {[
                            { label: 'Japan', value: 'Nationwide' },
                            { label: 'Plans', value: planCount > 0 ? `${planCount}+` : '—' },
                            { label: 'Support', value: 'EN / JA' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-xs uppercase tracking-widest text-white/65">{stat.label}</p>
                                <p className="text-xl font-semibold text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="relative hidden lg:block">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.8, ease: easeLuxury }}
                        className="hero-showcase-card overflow-hidden rounded-[2rem] border border-white/20 shadow-[var(--shadow-soft)]"
                    >
                        <div className="relative aspect-[4/5] max-h-[520px] w-full">
                            <MediaImage
                                src={promoImage || bgImage}
                                alt={promo?.judul || brandName}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                {logoUrl ? (
                                    <img
                                        src={logoUrl}
                                        alt={brandName}
                                        className="mb-4 h-10 w-auto brightness-0 invert"
                                    />
                                ) : (
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70">
                                        {brandName}
                                    </p>
                                )}
                                <p className="text-2xl font-semibold text-white">
                                    {promo?.judul || copy.products.subtitle}
                                </p>
                                {promo?.deskripsi && (
                                    <p className="mt-2 line-clamp-2 text-sm text-white/80">{promo.deskripsi}</p>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-6 grid gap-3">
                        {highlights.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="hero-highlight flex items-center gap-4 rounded-2xl border border-white/15 px-5 py-4 backdrop-blur-md"
                            >
                                <span
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
                                    style={{ background: 'var(--gradient-accent)' }}
                                >
                                    <item.icon size={20} />
                                </span>
                                <p className="text-sm font-medium text-white/95">{item.label}</p>
                            </motion.div>
                        ))}
                    </div>
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
                                background: i === index ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
