'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import api, { asArray } from '../lib/api';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Skeleton } from '../components/ui/Skeleton';
import { useApp } from '../providers/AppProvider';

export default function TestimonialsPage() {
    const { copy } = useApp();
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/testimonials')
            .then((res) => setTestimonials(asArray(res.data)))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="section-padding">
            <Container>
                <SectionHeader title={copy.testimonials.title} subtitle={copy.testimonials.subtitle} align="left" />
                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((n) => (
                            <Skeleton key={n} className="aspect-[4/3]" />
                        ))}
                    </div>
                ) : testimonials.length === 0 ? (
                    <EmptyState message={copy.testimonials.empty} />
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((item, i) => (
                            <motion.img
                                key={item.id}
                                src={item.image_url}
                                alt="Testimonial"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.06 }}
                                className="w-full rounded-3xl shadow-[var(--shadow-soft)]"
                            />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
