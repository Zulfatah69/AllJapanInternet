'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { cn } from '../../lib/utils';

export function SectionShell({
    id,
    children,
    className,
    variant = 'default',
}: {
    id?: string;
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'muted' | 'contrast' | 'glow';
}) {
    const bg =
        variant === 'muted'
            ? 'section-bg-muted'
            : variant === 'contrast'
              ? 'section-bg-contrast'
              : variant === 'glow'
                ? 'section-bg-glow'
                : 'section-bg-default';

    return (
        <section id={id} className={cn('section-padding relative overflow-hidden', bg, className)}>
            <div className="section-glow-top" aria-hidden />
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="relative z-[1]"
            >
                {children}
            </motion.div>
        </section>
    );
}
