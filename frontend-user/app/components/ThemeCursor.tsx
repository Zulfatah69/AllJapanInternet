'use client';

import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaLeaf, FaSnowflake, FaSun, FaFan } from 'react-icons/fa';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    rotation: number;
}

export default function ThemeCursor() {
    const { theme } = useLanguage();
    const [particles, setParticles] = useState<Particle[]>([]);
    const particleIdRef = useRef(0);
    const lastPosRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Only run on desktop devices to avoid breaking mobile touch
        if (typeof window === 'undefined' || window.innerWidth < 768) return;

        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            const distance = Math.hypot(e.clientX - lastPosRef.current.x, e.clientY - lastPosRef.current.y);
            
            // Only add particle if moved enough (e.g., 20px) to prevent spam
            if (distance > 25) {
                lastPosRef.current = { x: e.clientX, y: e.clientY };
                
                const newParticle: Particle = {
                    id: particleIdRef.current++,
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 10 + 5, // 5px to 15px
                    opacity: 1,
                    rotation: Math.random() * 360,
                };
                
                setParticles(prev => [...prev, newParticle].slice(-20)); // Keep max 20 particles
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const updateParticles = () => {
            setParticles(prev => 
                prev.map(p => ({
                    ...p,
                    opacity: p.opacity - 0.02, // fade out
                    y: p.y + (theme === 'autumn' ? 1 : theme === 'winter' ? 0.5 : -1), // fall or rise
                    rotation: p.rotation + 2
                })).filter(p => p.opacity > 0)
            );
            animationFrameId = requestAnimationFrame(updateParticles);
        };

        animationFrameId = requestAnimationFrame(updateParticles);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    if (typeof window === 'undefined' || window.innerWidth < 768 || particles.length === 0) return null;

    const themeColors = {
        spring: '#f472b6', // Pink-400
        summer: '#38bdf8', // Sky-400
        autumn: '#f59e0b', // Amber-500
        winter: '#93c5fd', // Blue-300
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute pointer-events-none transition-transform duration-75 ease-linear"
                    style={{
                        left: p.x,
                        top: p.y,
                        opacity: p.opacity,
                        transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.size / 10})`,
                        color: themeColors[theme]
                    }}
                >
                    {theme === 'spring' && <FaFan />}
                    {theme === 'summer' && <div className="w-2 h-2 rounded-full bg-sky-400 blur-[1px]"></div>}
                    {theme === 'autumn' && <FaLeaf />}
                    {theme === 'winter' && <FaSnowflake />}
                </div>
            ))}
        </div>
    );
}
