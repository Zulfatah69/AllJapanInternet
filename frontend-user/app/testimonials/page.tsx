'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useLanguage } from '../context/LanguageContext';
import Lightbox from '../components/Lightbox';
import SectionHeader from '../components/SectionHeader';

export default function TestimonialsPage() {
    const { t, language } = useLanguage();
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    async function fetchTestimonials() {
        try {
            const response = await api.get('/testimonials');
            setTestimonials(
                Array.isArray(response.data)
                    ? response.data
                    : response.data?.data || []
            );
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    }

    return (
        <main className="max-w-7xl mx-auto px-6 pt-28 md:pt-32 pb-20">
            {/* Header */}
            <SectionHeader
                eyebrow={t('testimonialEyebrow')}
                title={t('testimonialTitle')}
                subtitle={t('testimonialSubtitle')}
            />

            {/* Testimonials Grid */}
            {testimonials.length === 0 ? (
                <div className="text-center py-20" style={{ color: 'var(--theme-muted)' }}>
                    {language === 'id' ? 'Belum ada testimoni.' : 'No testimonials yet.'}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {testimonials.map((item, idx) => (
                        <div
                            key={item.id || idx}
                            className="premium-card overflow-hidden p-0 h-96 relative group cursor-zoom-in"
                            onClick={() => {
                                setLightboxIndex(idx);
                                setIsLightboxOpen(true);
                            }}
                        >
                            <img
                                src={item.image_url}
                                alt="Testimonial"
                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            {/* Bottom Fade Out Overlay to indicate it's a cropped preview */}
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 via-white/50 to-transparent dark:from-slate-900/90 dark:via-slate-900/50 pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
                            
                            {/* Hover magnifying glass overlay */}
                            <div className="absolute inset-0 z-20 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-2xs">
                                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Lightbox Modal */}
            {isLightboxOpen && testimonials.length > 0 && (
                <Lightbox
                    images={testimonials.map((item) => item.image_url)}
                    initialIndex={lightboxIndex}
                    isOpen={isLightboxOpen}
                    onClose={() => setIsLightboxOpen(false)}
                />
            )}
        </main>
    );
}