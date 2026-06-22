'use client';

import React from 'react';
import { FaCheckCircle, FaBolt, FaHome, FaBuilding, FaWhatsapp, FaWifi } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function HomeWifiBanner({ items = [] }: { items?: any[] }) {
    const { language } = useLanguage();

    const handleWhatsappClick = () => {
        const adminPhone = "818075558719";
        const message = language === 'id' 
            ? "Halo, saya ingin bertanya tentang informasi pemasangan Home Wi-Fi yang ada di website."
            : "Hello, I would like to ask about the Home Wi-Fi installation information on the website.";
        const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    };

    return (
        <ScrollReveal direction="up" delay={0.2}>
            <div className="w-full rounded-3xl overflow-hidden shadow-2xl relative group"
                 style={{ 
                     background: 'linear-gradient(145deg, var(--theme-primary) 0%, var(--theme-secondary) 100%)',
                     boxShadow: '0 25px 50px -12px color-mix(in srgb, var(--theme-primary) 40%, transparent)'
                 }}>
                
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                {/* Header Section */}
                <div className="text-white pt-10 pb-8 px-6 text-center relative z-10 flex flex-col items-center">
                    <h2 className="text-5xl md:text-6xl font-black mb-2 tracking-tighter drop-shadow-md italic">
                        Home Wi-Fi
                    </h2>
                    <div className="bg-white text-pink-600 font-black text-2xl md:text-3xl px-6 py-2 border-2 border-pink-500 rounded-lg inline-block mt-2 mb-2 shadow-lg transform -rotate-2">
                        FREE ROUTER !
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-8 bg-white/95 backdrop-blur-xl rounded-t-3xl relative z-10 mx-2 md:mx-4 mb-2 md:mb-4 border border-white/50 shadow-inner flex flex-col gap-6 md:gap-8">
                    
                    {/* Top Info Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
                        
                        {/* Biaya Perbulan Box */}
                        <div className="rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-lg border border-pink-100 flex flex-col h-full relative overflow-hidden" style={{ background: 'var(--theme-primary)' }}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                            <div className="bg-white text-pink-600 font-bold text-base md:text-lg py-1.5 md:py-2 px-5 md:px-6 rounded-full inline-block mb-5 shadow-sm text-center w-max border-2 border-pink-100">
                                {language === 'id' ? 'Biaya Perbulan :' : 'Monthly Cost :'}
                            </div>
                            
                            <div className="space-y-4 md:space-y-6 text-white mt-auto mb-auto relative z-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                                        <FaBuilding className="text-lg md:text-xl opacity-90" />
                                        <span className="font-bold text-sm md:text-lg">{language === 'id' ? '-Tipe Apartment / Manshion :' : '-Apartment / Mansion Type :'}</span>
                                    </div>
                                    <div className="pl-6 md:pl-7 font-black text-2xl md:text-3xl text-yellow-300 drop-shadow-sm">
                                        {language === 'id' ? 'Mulai Dari ¥4.000' : 'Starts From ¥4.000'}
                                    </div>
                                </div>
                                
                                <div className="pt-3 md:pt-4 border-t border-white/20">
                                    <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                                        <FaHome className="text-lg md:text-xl opacity-90" />
                                        <span className="font-bold text-sm md:text-lg">{language === 'id' ? '-Tipe Family House :' : '-Family House Type :'}</span>
                                    </div>
                                    <div className="pl-6 md:pl-7 font-black text-2xl md:text-3xl text-yellow-300 drop-shadow-sm">
                                        {language === 'id' ? 'Mulai dari ¥5.000' : 'Starts from ¥5.000'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Network Provider Box (STATIC) */}
                        <div className="rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-lg border border-pink-100 flex flex-col h-full relative overflow-hidden" style={{ background: 'var(--theme-primary)' }}>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
                            <div className="bg-white text-pink-600 font-bold text-base md:text-lg py-1.5 md:py-2 px-5 md:px-6 rounded-full inline-block mb-5 shadow-sm text-center w-max border-2 border-pink-100">
                                Network Provider :
                            </div>
                            
                            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-white font-bold text-sm md:text-base relative z-10 mt-auto mb-auto">
                                {['SOFTBANK HIKARI', 'OCN', 'TOKAI HIKARI', 'AU HIKARI', 'BIGLOBE', 'NURO HIKARI', 'DOCOMO'].map((provider, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-white/10 rounded-lg py-1.5 px-3 border border-white/10 hover:bg-white/20 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_5px_rgba(253,224,71,0.8)] flex-shrink-0"></div>
                                        <span className="truncate tracking-wide">{provider}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Example Devices Gallery (DYNAMIC) */}
                    <div className="bg-slate-50/50 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm md:text-base font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <FaWifi className="text-pink-400" />
                                {language === 'id' ? 'Contoh Perangkat' : 'Example Devices'}
                            </h3>
                            <div className="h-px bg-slate-200 flex-1 ml-4 hidden sm:block"></div>
                        </div>
                        
                        {items && items.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
                                {items.map((provider, idx) => (
                                    <div key={idx} className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 group">
                                        {provider.gambar_url ? (
                                            <div className="aspect-[16/9] w-full overflow-hidden bg-white flex items-center justify-center p-2 relative">
                                                <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <img 
                                                    src={provider.gambar_url} 
                                                    alt={provider.nama}
                                                    className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-[16/9] w-full bg-slate-50 flex items-center justify-center">
                                                <FaWifi className="text-slate-300 text-3xl" />
                                            </div>
                                        )}
                                        <div className="py-2 px-2 text-center border-t border-slate-50 bg-gradient-to-b from-white to-slate-50">
                                            <p className="text-slate-700 font-bold text-xs md:text-sm truncate px-1">
                                                {provider.nama}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-slate-400 text-center py-6 italic font-medium text-sm">
                                {language === 'id' ? 'Memuat gambar contoh...' : 'Loading example images...'}
                            </div>
                        )}
                    </div>

                    {/* Ready Pemasangan Section */}
                    <div className="bg-pink-50/80 rounded-2xl p-5 md:p-8 border-2 border-pink-200 text-center shadow-sm relative overflow-hidden">
                        {/* Decorative background for features */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300/20 rounded-full blur-3xl"></div>
                        
                        <h3 className="text-lg md:text-2xl font-black mb-5 md:mb-6 text-pink-600 tracking-wide uppercase drop-shadow-sm relative z-10">
                            {language === 'id' ? 'Ready Pemasangan Home Wi-Fi' : 'Ready for Home Wi-Fi Installation'}
                        </h3>
                        
                        <div className="flex flex-col gap-3 md:gap-5 text-left max-w-2xl mx-auto relative z-10">
                            <div className="flex items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-sm border border-pink-100 hover:border-pink-300 transition-colors">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                                    <FaCheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <span className="font-bold text-slate-700 text-sm md:text-lg">{language === 'id' ? 'Tanpa Uang Awal' : 'No Initial Cost (Zero Down Payment)'}</span>
                            </div>
                            
                            <div className="flex items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-sm border border-pink-100 hover:border-pink-300 transition-colors">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                                    <FaBolt className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <span className="font-bold text-slate-700 text-sm md:text-lg">Speed Up To 1GBPS</span>
                            </div>
                            
                            <div className="flex items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-sm border border-pink-100 hover:border-pink-300 transition-colors">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                                    <FaCheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <span className="font-bold text-slate-700 text-sm md:text-lg leading-tight">{language === 'id' ? 'Pembayaran pertama adalah 1 bulan setelah pemasangan' : 'First payment is 1 month after installation'}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Call to Action WhatsApp */}
                    <div className="mt-1 md:mt-2 text-center">
                        <button 
                            onClick={handleWhatsappClick}
                            className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl font-black text-base md:text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
                        >
                            <FaWhatsapp className="text-2xl md:text-3xl" />
                            {language === 'id' ? 'Tanya / Pesan via WhatsApp' : 'Ask / Order via WhatsApp'}
                        </button>
                        <p className="mt-3 text-slate-500 text-xs md:text-sm font-medium">
                            {language === 'id' ? '*Konsultasi gratis!' : '*Free consultation!'}
                        </p>
                    </div>

                </div>
            </div>
        </ScrollReveal>
    );
}
