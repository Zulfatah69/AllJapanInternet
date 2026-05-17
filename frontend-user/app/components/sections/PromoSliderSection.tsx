'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

import type { Promo } from '../../types/api';
import { Container } from '../ui/Container';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export function PromoSliderSection({ promos }: { promos: Promo[] }) {
    const { copy } = useApp();

    if (!promos.length) return null;

    return (
        <SectionShell id="promos" variant="muted">
            <Container>
                <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="eyebrow mb-2">Campaigns</p>
                        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                            {copy.nav.promos}
                        </h2>
                    </motion.div>
                    <Link
                        href="/promos"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-strong)]"
                    >
                        View all <FiArrowRight />
                    </Link>
                </div>

                <Swiper
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect="fade"
                    autoplay={{ delay: 5500, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={promos.length > 1}
                    className="promo-swiper overflow-hidden rounded-[2rem]"
                >
                    {promos.map((promo) => (
                        <SwiperSlide key={promo.id}>
                            <div className="premium-card grid min-h-[320px] overflow-hidden md:grid-cols-2 md:min-h-[380px]">
                                <motion.div
                                    className="relative min-h-[220px] md:min-h-full"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {promo.gambar_url ? (
                                        <img
                                            src={promo.gambar_url}
                                            alt={promo.judul}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    ) : (
                                        <motion.div
                                            className="absolute inset-0"
                                            style={{ background: 'var(--gradient-mesh)' }}
                                            animate={{ opacity: [0.85, 1, 0.85] }}
                                            transition={{ duration: 6, repeat: Infinity }}
                                        />
                                    )}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-[var(--bg-contrast)]/50 to-transparent"
                                        initial={{ opacity: 0.6 }}
                                        whileHover={{ opacity: 0.75 }}
                                    />
                                </motion.div>
                                <div className="flex flex-col justify-center p-8 md:p-12">
                                    <p className="eyebrow mb-3">Limited Offer</p>
                                    <h3 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl">
                                        {promo.judul}
                                    </h3>
                                    {promo.deskripsi && (
                                        <p
                                            className="mb-8 line-clamp-4 leading-relaxed"
                                            style={{ color: 'var(--fg-muted)' }}
                                        >
                                            {promo.deskripsi}
                                        </p>
                                    )}
                                    {promo.link && (
                                        <a
                                            href={promo.link}
                                            className="btn-primary inline-flex w-fit items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white"
                                        >
                                            {copy.hero.ctaSecondary}
                                            <FiArrowRight />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </SectionShell>
    );
}
