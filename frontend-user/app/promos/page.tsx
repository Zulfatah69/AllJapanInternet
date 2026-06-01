'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useLanguage } from '../context/LanguageContext';
import Lightbox from '../components/Lightbox';
import SectionHeader from '../components/SectionHeader';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function PromosPage() {
    const { language } = useLanguage();
    const [promos, setPromos] = useState<any[]>([]);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        fetchPromos();
    }, []);

    async function fetchPromos() {
        try {
            const response = await api.get('/promos');
            setPromos(
                Array.isArray(response.data)
                    ? response.data
                    : response.data?.data || []
            );
        } catch (error) {
            console.error('Error fetching promos:', error);
        }
    }

    const title = language === 'id' ? 'Promo Spesial' : 'Special Promotions';
    const subtitle = language === 'id' 
        ? 'Temukan penawaran terbaik dan diskon menarik dari kami' 
        : 'Discover our best offers and exciting discounts';

    return (
        <main className="max-w-7xl mx-auto px-6 pt-28 md:pt-32 pb-20">
            {/* Header */}
            <SectionHeader
                eyebrow={language === 'id' ? 'Penawaran' : 'Offers'}
                title={title}
                subtitle={subtitle}
            />

            {/* Promos Grid */}
            {promos.length === 0 ? (
                <div className="text-center py-20" style={{ color: 'var(--theme-muted)' }}>
                    {language === 'id' ? 'Belum ada promo aktif saat ini.' : 'No active promotions at this time.'}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {promos.map((promo, idx) => (
                        <div
                            key={promo.id || idx}
                            className="premium-card overflow-hidden flex flex-col h-full group"
                        >
                            {/* Aspect Ratio Safe Banner Image Container */}
                            <div 
                                className="relative aspect-video w-full overflow-hidden bg-slate-50 dark:bg-slate-900/50 cursor-zoom-in"
                                onClick={() => {
                                    setLightboxIndex(idx);
                                    setIsLightboxOpen(true);
                                }}
                            >
                                <img
                                    src={promo.gambar_url || `${process.env.NEXT_PUBLIC_STORAGE_URL}/${promo.gambar}`}
                                    alt={promo.judul || 'Promotion'}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    loading="lazy"
                                />
                                {/* Zoom hover overlay */}
                                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Card Details */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 
                                    className="font-display text-xl mb-3 font-bold line-clamp-1"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {promo.judul || (language === 'id' ? 'Promo Menarik' : 'Special Offer')}
                                </h3>
                                
                                {promo.deskripsi && (
                                    <p 
                                        className="text-sm mb-6 flex-1 leading-relaxed line-clamp-3"
                                        style={{ color: 'var(--theme-muted)' }}
                                    >
                                        {promo.deskripsi}
                                    </p>
                                )}

                                {promo.link && (
                                    <a
                                        href={promo.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="premium-btn w-full flex items-center justify-center gap-2 mt-auto text-sm py-3 font-semibold"
                                    >
                                        <span>{language === 'id' ? 'Klaim Promo' : 'Claim Offer'}</span>
                                        <FaExternalLinkAlt className="text-xs" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Lightbox Modal */}
            {isLightboxOpen && promos.length > 0 && (
                <Lightbox
                    images={promos.map((promo) => promo.gambar_url || `${process.env.NEXT_PUBLIC_STORAGE_URL}/${promo.gambar}`)}
                    initialIndex={lightboxIndex}
                    isOpen={isLightboxOpen}
                    onClose={() => setIsLightboxOpen(false)}
                />
            )}
        </main>
    );
}