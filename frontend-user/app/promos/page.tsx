'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import api, { asArray } from '../lib/api';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Skeleton } from '../components/ui/Skeleton';
import { useApp } from '../providers/AppProvider';

export default function PromosPage() {
    const { copy } = useApp();
    const [promos, setPromos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/promos')
            .then((res) => setPromos(asArray(res.data)))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="section-padding">
            <Container>
                <SectionHeader title={copy.nav.promos} subtitle={copy.hero.ctaSecondary} align="left" />
                {loading ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        <Skeleton className="h-64" />
                        <Skeleton className="h-64" />
                    </div>
                ) : promos.length === 0 ? (
                    <EmptyState message={copy.products.empty} />
                ) : (
                    <div className="grid gap-8 md:grid-cols-2">
                        {promos.map((promo, i) => (
                            <motion.article
                                key={promo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="overflow-hidden rounded-3xl border bg-[var(--bg-elevated)]"
                                style={{ borderColor: 'var(--border)' }}
                            >
                                {promo.gambar_url && (
                                    <img src={promo.gambar_url} alt={promo.judul} className="aspect-video w-full object-cover" />
                                )}
                                <div className="p-8">
                                    <h2 className="mb-3 text-2xl font-semibold">{promo.judul}</h2>
                                    {promo.deskripsi && (
                                        <p className="mb-6" style={{ color: 'var(--fg-muted)' }}>
                                            {promo.deskripsi}
                                        </p>
                                    )}
                                    {promo.link && (
                                        <a
                                            href={promo.link}
                                            className="inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white btn-primary"
                                        >
                                            {copy.hero.ctaSecondary}
                                        </a>
                                    )}
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
