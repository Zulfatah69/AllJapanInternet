'use client';

import { motion } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';

import { useApp } from '../../providers/AppProvider';

export function WhatsAppFab() {
    const { settings } = useApp();
    if (!settings?.whatsapp) return null;

    return (
        <motion.a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="whatsapp-fab fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg md:bottom-8 md:right-8 md:h-16 md:w-16"
            aria-label="WhatsApp"
        >
            <FiMessageCircle size={26} />
            <span className="whatsapp-fab-pulse" aria-hidden />
        </motion.a>
    );
}
