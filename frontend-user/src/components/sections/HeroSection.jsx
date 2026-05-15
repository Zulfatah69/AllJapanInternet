import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HeroSection() {
  const { t } = useTranslation();
  const { banners, pageData, config } = useApp();
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const heroSlides = banners.length
    ? banners.map((banner) => ({
        id: banner.id,
        image: banner.gambar,
        title: banner.judul,
        subtitle: banner.sub_judul,
        cta: banner.tombol_text || t('hero.ctaProducts'),
        link: banner.link || '#products',
      }))
    : [
        {
          id: 'home-fallback',
          image: pageData?.thumbnail || '',
          title: pageData?.judul || t('hero.titleDefault'),
          subtitle: pageData?.konten?.slice(0, 140) || t('hero.description'),
          cta: t('hero.ctaProducts'),
          link: '#products',
        },
      ];

  useEffect(() => {
    if (!heroSlides.length) return undefined;

    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [heroSlides.length]);

  const scrollDown = () => {
    document.getElementById('promo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={heroSlides[current]?.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {heroSlides[current]?.image ? (
            <img
              src={heroSlides[current].image}
              alt={heroSlides[current].title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black to-black" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-red-900/20 blur-3xl rounded-full" />

      <div className="relative z-10 h-full flex flex-col justify-center container-custom">
        <div className="max-w-3xl">
          <motion.h2
            key={`slogan-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-sm md:text-base font-bold tracking-[0.3em] text-red-500 uppercase mb-4"
          >
            {t('hero.slogan')}
          </motion.h2>

          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-poppins leading-none mb-6"
          >
            <span className="text-white">{heroSlides[current]?.title || t('hero.titleMain')}</span>
          </motion.h1>

          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          >
            {heroSlides[current]?.subtitle || t('hero.description')}
          </motion.p>

          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary glow-red"
            >
              {t('hero.ctaProducts')}
            </button>
            <a
              href={config.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              {t('hero.ctaWhatsApp')}
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'bg-red-500 w-8' : 'bg-white/30 w-3'
              }`}
            />
          ))}
        </div>
      </div>

      <motion.button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs tracking-widest uppercase">{t('hero.scrollDown')}</span>
        <ChevronDown size={20} />
      </motion.button>
    </section>
  );
}
