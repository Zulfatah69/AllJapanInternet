import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'id', label: 'ID', flag: '🇮🇩' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'jp', label: 'JP', flag: '🇯🇵' },
];

const NAV_LINKS = [
  { key: 'home', href: '#home' },
  { key: 'promo', href: '#promo' },
  { key: 'bestSeller', href: '#best-seller' },
  { key: 'products', href: '#products' },
  { key: 'about', href: '#about' },
  { key: 'howToOrder', href: '#how-to-order' },
  { key: 'guideBook', href: '#guide-book' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'benefits', href: '#benefits' },
  { key: 'tracking', href: '#tracking' },
  { key: 'wisata', href: '#wisata' },
  { key: 'ts', href: '#ts' },
  { key: 'contact', href: '#contact' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_LINKS.map(l => l.key === 'home' ? 'home' : l.href.replace('#', ''));
      sections.forEach(sec => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) setActiveSection(sec);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'navbar-scrolled' : 'navbar-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center glow-red-sm">
                <span className="text-white font-black text-lg font-poppins">A</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg font-poppins leading-tight">All Japan</div>
                <div className="text-red-500 text-xs font-semibold tracking-widest">INTERNET</div>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const sec = link.href.replace('#', '');
                const isActive = activeSection === sec;
                return (
                  <button
                    key={link.key}
                    onClick={() => handleNavClick(link.href)}
                    className={`hover-underline px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-red-500 active' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                  </button>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full glass text-sm font-medium text-white/80 hover:text-white transition-all duration-300"
                >
                  <Globe size={14} />
                  <span>{currentLang.flag} {currentLang.label}</span>
                  <ChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 glass-dark rounded-xl overflow-hidden shadow-card min-w-[120px] border border-white/10"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLang(lang.code)}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                            i18n.language === lang.code
                              ? 'bg-red-600/20 text-red-400'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* WA Button */}
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex btn-whatsapp text-xs py-2 px-4"
              >
                WhatsApp
              </a>

              {/* Mobile Menu Toggle */}
              <button
                className="xl:hidden w-10 h-10 flex items-center justify-center rounded-full glass"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden glass-dark border-t border-white/5"
            >
              <div className="container-custom py-4 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium"
                  >
                    {t(`nav.${link.key}`)}
                  </motion.button>
                ))}
                <div className="pt-2 pb-1">
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex btn-whatsapp w-full justify-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Backdrop for dropdowns */}
      {(langOpen) && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
      )}
    </>
  );
}
