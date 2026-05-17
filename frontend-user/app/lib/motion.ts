export const easeLuxury = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.65, ease: easeLuxury },
    }),
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: easeLuxury } },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.55, ease: easeLuxury },
    },
};

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
};

export const floatY = {
    animate: {
        y: [0, -10, 0],
        transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    },
};
