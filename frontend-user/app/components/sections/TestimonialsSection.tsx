'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

import { easeLuxury } from '../../lib/motion';
import { Container } from '../ui/Container';
import { EmptyState } from '../ui/EmptyState';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

export function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
    const { copy } = useApp();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (testimonials.length <= 1) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5500);
        return () => clearInterval(id);
    }, [testimonials.length]);

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
                    <div className="relative mx-auto max-w-5xl">
                        <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: 'var(--fg-muted)' }}>
                            <span className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <FiStar key={n} className="fill-[var(--primary)] text-[var(--primary)]" size={16} />
                                ))}
                            </span>
                            <span>{testimonials.length}+ {copy.testimonials.title}</span>
                        </div>

                        <div className="premium-card relative overflow-hidden rounded-[2rem] p-2 md:p-3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={testimonials[index]?.id}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.55, ease: easeLuxury }}
                                >
                                    <img
                                        src={testimonials[index]?.image_url}
                                        alt="Customer testimonial"
                                        className="w-full rounded-[1.5rem] object-cover shadow-inner"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {testimonials.length > 1 && (
                            <div className="mt-8 flex justify-center gap-3">
                                {testimonials.map((t, i) => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => setIndex(i)}
                                        className={`h-14 w-14 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                                            i === index ? 'scale-110 border-[var(--primary)] shadow-[var(--shadow-glow)]' : 'border-transparent opacity-60'
                                        }`}
                                    >
                                        <img src={t.image_url} alt="" className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </SectionShell>
    );
}
