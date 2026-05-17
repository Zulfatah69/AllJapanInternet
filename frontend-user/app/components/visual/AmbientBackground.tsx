'use client';

import { motion } from 'framer-motion';

export function AmbientBackground() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <motion.div
                className="ambient-orb ambient-orb-a"
                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="ambient-orb ambient-orb-b"
                animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="ambient-orb ambient-orb-c"
                animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.55, 0.4] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="ambient-grid" />
            <div className="ambient-noise" />
        </div>
    );
}
