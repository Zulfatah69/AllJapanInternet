import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NAV_LINKS = [
  { key: 'home', href: '#home' },
  { key: 'promo', href: '#promo' },
  { key: 'bestSeller', href: '#best-seller' },
  { key: 'products', href: '#products' },
  { key: 'about', href: '#about' },
  { key: 'howToOrder', href: '#how-to-order' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'contact', href: '#contact' },
];

export default function Footer() {
  const { t } = useTranslation();
  const { config } = useApp();

  const handleNav = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark border-t border-white/5 pt-16 pb-8 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-900/10 blur-3xl rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center glow-red-sm">
                <span className="text-white font-black text-xl font-poppins">A</span>
              </div>
              <div>
                <div className="text-white font-bold text-xl font-poppins">All Japan Internet</div>
                <div className="text-red-500 text-xs font-semibold tracking-widest">TERMUDAH • TERCEPAT • TEPERCAYA</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              {t('footer.description')} Melayani seluruh WNI di 47 prefektur Jepang.
            </p>
            <div className="space-y-2.5">
              <a href={config.whatsapp} className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors group">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                  <Phone size={14} className="text-red-500" />
                </div>
                {config.whatsapp}
              </a>
              <a href={`mailto:${config.email}`} className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors group">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                  <Mail size={14} className="text-red-500" />
                </div>
                {config.email}
              </a>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                  <MapPin size={14} className="text-red-500" />
                </div>
                {config.address}
              </div>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                  <Clock size={14} className="text-red-500" />
                </div>
                {t('footer.operationalHours')}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold font-poppins mb-5 text-sm tracking-wider uppercase">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="flex items-center gap-2 text-white/50 hover:text-red-400 text-sm transition-colors group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300" />
                    {t(`nav.${link.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold font-poppins mb-5 text-sm tracking-wider uppercase">{t('footer.followUs')}</h4>
            <div className="space-y-3">
              <a
                href={config.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl glass hover:bg-green-600/10 hover:border-green-500/30 transition-all duration-300 group border border-transparent"
              >
                <div className="w-9 h-9 rounded-lg bg-green-600/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </div>
                <div>
                  <div className="text-white text-sm font-medium">WhatsApp</div>
                  <div className="text-white/40 text-xs">Chat Langsung</div>
                </div>
              </a>
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl glass hover:bg-pink-600/10 hover:border-pink-500/30 transition-all duration-300 group border border-transparent"
              >
                <div className="w-9 h-9 rounded-lg bg-pink-600/20 flex items-center justify-center">
                  <Instagram size={18} className="text-pink-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Instagram</div>
                  <div className="text-white/40 text-xs">@alljapaninternet</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center">{t('footer.copyright')}</p>
          <p className="text-white/20 text-xs">Made with ❤️ for WNI di Jepang</p>
        </div>
      </div>
    </footer>
  );
}
