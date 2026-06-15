'use client';

import { FaWhatsapp } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

type SimpleWifiCardProps = {
    item: {
        id: number;
        nama: string;
        nama_en?: string;
        deskripsi?: string;
        deskripsi_en?: string;
        gambar_url?: string;
    };
    whatsappLabel: string;
    whatsappNumber?: string;
};

export default function SimpleWifiCard({
    item,
    whatsappLabel,
    whatsappNumber = '818075558719',
}: SimpleWifiCardProps) {
    const { theme, getLocalizedText } = useLanguage();

    function openWhatsApp() {
        const message = encodeURIComponent(
            `Hello Admin,\n\nI want to ask about:\n${item.nama}`
        );
        window.open(
            `https://wa.me/${whatsappNumber}?text=${message}`,
            '_blank'
        );
    }

    const themeHoverClass = 
        theme === 'spring' ? 'theme-spring-hover-sakura' :
        theme === 'summer' ? 'theme-summer-sun-glare' :
        theme === 'autumn' ? 'theme-autumn-wind-sweep' :
        theme === 'winter' ? 'theme-winter-frost-melt' : '';

    return (
        <ScrollReveal direction="up" duration={0.6}>
            <div className={`premium-product-card group flex flex-col p-3 md:p-4 h-full bg-white/80 backdrop-blur border border-black/5 rounded-2xl shadow-sm hover:shadow-md transition-all ${themeHoverClass}`}>

                {/* foto           = Nama produk */}
                <div className="flex flex-row items-center gap-3 mb-3 flex-1">
                    <div className="w-[100px] md:w-[120px] shrink-0 aspect-[16/9] rounded-lg overflow-hidden border border-black/5 bg-white">
                        {item.gambar_url ? (
                            <img
                                src={item.gambar_url}
                                alt={item.nama}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <span className="text-[10px] text-gray-400">No Img</span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-sm md:text-base font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
                            {getLocalizedText(item.nama, item.nama_en)}
                        </h3>
                    </div>
                </div>

                {item.deskripsi && (
                    <p className="text-xs md:text-sm mb-4 leading-relaxed" style={{ color: 'var(--theme-muted)' }}>
                        {getLocalizedText(item.deskripsi, item.deskripsi_en)}
                    </p>
                )}

                {/* ======== From ..... */}
                <div className="mt-auto border-t border-black/5 pt-3">
                    <button
                        type="button"
                        onClick={openWhatsApp}
                        className="w-full py-2 px-3 rounded-xl text-xs md:text-sm font-bold text-white flex items-center justify-center gap-2 transition-all shadow hover:shadow-lg"
                        style={{ backgroundColor: 'var(--theme-primary)' }}
                    >
                        <FaWhatsapp className="w-4 h-4" />
                        {whatsappLabel}
                    </button>
                </div>

            </div>
        </ScrollReveal>
    );
}
