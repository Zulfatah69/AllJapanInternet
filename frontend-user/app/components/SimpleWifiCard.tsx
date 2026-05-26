'use client';

import { FaWhatsapp } from 'react-icons/fa';

type SimpleWifiCardProps = {
    item: {
        id: number;
        nama: string;
        deskripsi?: string;
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
    function openWhatsApp() {
        const message = encodeURIComponent(
            `Hello Admin,\n\nI want to ask about:\n${item.nama}`
        );
        window.open(
            `https://wa.me/${whatsappNumber}?text=${message}`,
            '_blank'
        );
    }

    return (
        <div className="premium-product-card overflow-hidden flex flex-col h-full">
            {item.gambar_url && (
                <div className="aspect-[4/3] overflow-hidden">
                    <img
                        src={item.gambar_url}
                        alt={item.nama}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="p-6 flex flex-col flex-1">
                <h3
                    className="font-display text-xl mb-3"
                    style={{ color: 'var(--foreground)' }}
                >
                    {item.nama}
                </h3>
                {item.deskripsi && (
                    <p
                        className="text-sm mb-6 flex-1 leading-relaxed"
                        style={{ color: 'var(--theme-muted)' }}
                    >
                        {item.deskripsi}
                    </p>
                )}
                <button
                    type="button"
                    onClick={openWhatsApp}
                    className="premium-btn w-full flex items-center justify-center gap-2 mt-auto"
                >
                    <FaWhatsapp />
                    {whatsappLabel}
                </button>
            </div>
        </div>
    );
}
