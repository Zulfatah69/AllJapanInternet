'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

import type { Testimonial } from '../../types/api';
import { Container } from '../ui/Container';
import { EmptyState } from '../ui/EmptyState';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
    const { copy } = useApp();

    return (
        <SectionShell id="testimonials" variant="glow">
            <Container>
                <SectionHeader
                    title={copy.testimonials.title}
                    subtitle={copy.testimonials.subtitle}
                    eyebrow="Trust"
                />

                {testimonials.length === 0 ? (
                    <EmptyState message={copy.testimonials.empty} />
                ) : (
                    <>
                        <div
                            className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm"
                            style={{ color: 'var(--fg-muted)' }}
                        >
                            <span className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <FiStar
                                        key={n}
                                        className="fill-[var(--primary)] text-[var(--primary)]"
                                        size={16}
                                    />
                                ))}
                            </span>
                            <span>
                                {testimonials.length}+ {copy.testimonials.title}
                            </span>
                        </div>

                        <Swiper
                            modules={[Autoplay, EffectCoverflow, Pagination]}
                            effect="coverflow"
                            grabCursor
                            centeredSlides
                            slidesPerView={1.15}
                            breakpoints={{
                                768: { slidesPerView: 1.5 },
                                1024: { slidesPerView: 2.2 },
                            }}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 120,
                                modifier: 2,
                                slideShadows: false,
                            }}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            loop={testimonials.length > 2}
                            className="testimonial-swiper pb-14"
                        >
                            {testimonials.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <motion.div
                                        whileHover={{ y: -6 }}
                                        transition={{ duration: 0.35 }}
                                        className="premium-card overflow-hidden rounded-[2rem] p-2 md:p-3"
                                    >
                                        <img
                                            src={item.image_url}
                                            alt="Customer testimonial"
                                            className="w-full rounded-[1.5rem] object-cover shadow-inner"
                                            loading="lazy"
                                        />
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                )}
            </Container>
        </SectionShell>
    );
}
