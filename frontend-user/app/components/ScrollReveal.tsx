'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    amount?: number | 'some' | 'all';
    once?: boolean;
}

export default function ScrollReveal({
    children,
    className = '',
    delay = 0,
    duration = 0.6,
    direction = 'up',
    amount = 'some',
    once = true,
}: ScrollRevealProps) {
    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
            x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
            scale: direction === 'none' ? 0.95 : 1,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier matching the premium-fade
            },
        },
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
}
