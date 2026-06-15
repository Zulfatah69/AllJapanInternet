'use client';

import React from 'react';
import { useLanguage } from './context/LanguageContext';
import { FaFan, FaSun, FaLeaf, FaSnowflake } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Loading() {
    const { theme } = useLanguage();

    const themeColors = {
        spring: '#ec4899', // pink-500
        summer: '#0ea5e9', // sky-500
        autumn: '#ea580c', // orange-600
        winter: '#93c5fd', // blue-300
    };

    const color = themeColors[theme] || '#38bdf8';

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
            <motion.div 
                className="relative flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                {/* Outer dashed ring */}
                <svg className="w-24 h-24 absolute" viewBox="0 0 100 100">
                    <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke={color} 
                        strokeWidth="2" 
                        strokeDasharray="10 10" 
                        className="opacity-50"
                    />
                </svg>
                {/* Inner solid ring */}
                <svg className="w-16 h-16 absolute" viewBox="0 0 100 100">
                    <circle 
                        cx="50" cy="50" r="40" 
                        fill="none" 
                        stroke={color} 
                        strokeWidth="4" 
                        strokeDasharray="60 120"
                        strokeLinecap="round"
                    />
                </svg>
                
                {/* Center Icon */}
                <motion.div 
                    className="z-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ color }}
                >
                    {theme === 'spring' && <FaFan size={24} />}
                    {theme === 'summer' && <FaSun size={24} />}
                    {theme === 'autumn' && <FaLeaf size={24} />}
                    {theme === 'winter' && <FaSnowflake size={24} />}
                </motion.div>
            </motion.div>
            <motion.p 
                className="mt-6 font-display font-bold tracking-widest text-sm uppercase"
                style={{ color }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                Loading...
            </motion.p>
        </div>
    );
}
