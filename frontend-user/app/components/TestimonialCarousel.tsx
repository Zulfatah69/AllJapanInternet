'use client';

import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface Testimonial {
    id: number;
    judul: string;
    gambar_url: string;
    link?: string;
}

export default function TestimonialCarousel({ testimonials }: { testimonials: any[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    // Auto-scroll
    useEffect(() => {
        if (!testimonials || testimonials.length <= 1) return;
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials]);

    if (!testimonials || testimonials.length === 0) return null;

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
                scale: 0.85,
                filter: 'brightness(0.5) blur(4px)'
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'brightness(1) blur(0px)'
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
                scale: 0.85,
                filter: 'brightness(0.5) blur(4px)'
            };
        }
    };

    return (
        <ScrollReveal direction="up" delay={0.2} duration={0.8}>
            <div className="relative w-full max-w-7xl mx-auto overflow-hidden py-8 md:py-12 flex items-center justify-center">
                {/* Carousel Track */}
                <div className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.4 },
                                filter: { duration: 0.4 }
                            }}
                            className="absolute w-[85%] max-w-md cursor-pointer shadow-2xl rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
                        >
                            <img 
                                src={testimonials[currentIndex].image_url} 
                                alt="Testimonial" 
                                className="w-full h-auto max-h-[70vh] object-contain"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                {testimonials.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 md:left-6 z-30 bg-black/40 backdrop-blur-md text-white p-3 md:p-4 rounded-full hover:bg-black/60 transition-colors border border-white/20 hover:scale-110 active:scale-95"
                            aria-label="Previous Testimonial"
                        >
                            <FaChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 md:right-6 z-30 bg-black/40 backdrop-blur-md text-white p-3 md:p-4 rounded-full hover:bg-black/60 transition-colors border border-white/20 hover:scale-110 active:scale-95"
                            aria-label="Next Testimonial"
                        >
                            <FaChevronRight size={20} />
                        </button>
                    </>
                )}
            </div>
        </ScrollReveal>
    );
}
