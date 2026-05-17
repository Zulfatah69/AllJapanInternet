'use client';

import { motion } from 'framer-motion';

import { easeLuxury } from '../../lib/motion';

export function SectionHeader({
    title,
    subtitle,
    align = 'center',
    eyebrow,
}: {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    eyebrow?: string;
}) {
    return (
        <motion.header
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: easeLuxury }}
            className={align === 'center' ? 'mx-auto mb-16 max-w-3xl text-center' : 'mb-16 max-w-2xl'}
        >
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h2 className="mb-5 text-3xl font-semibold tracking-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg leading-relaxed md:text-xl" style={{ color: 'var(--fg-muted)' }}>
                    {subtitle}
                </p>
            )}
        </motion.header>
    );
}
