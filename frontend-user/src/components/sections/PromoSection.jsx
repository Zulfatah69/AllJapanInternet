import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Zap, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const BADGE_COLORS = {
  primary: 'bg-red-600',
  secondary: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-orange-600',
};

function PromoCard({ promo, whatsapp }) {
  const { t } = useTranslation();
  const badge = promo.tombol_text || t('promo.badgeDefault');

  return (
    <div className="relative overflow-hidden rounded-2xl h-[320px] md:h-[380px] group cursor-pointer">
      <img
        src={promo.gambar}
        alt={promo.judul}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${BADGE_COLORS.primary}`}>
            {badge}
          </span>
        </div>

        <div>
          <h3 className="text-white font-bold text-xl md:text-2xl font-poppins mb-2">{promo.judul}</h3>
          <p className="text-white/70 text-sm mb-4 leading-relaxed">{promo.sub_judul}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <Calendar size={12} />
              <span>{t('promo.validUntil')}:</span>
            </div>
            <a
              href={promo.link || whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-5"
            >
              {t('promo.orderNow')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PromoSection() {
  const { t } = useTranslation();
  const { banners, loading, error, config } = useApp();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  if (loading) {
    return (
      <section id="promo" className="section-padding relative overflow-hidden">
        <div className="container-custom relative z-10 text-center text-white/60">{t('loading')}</div>
      </section>
    );
  }

  return (
    <section id="promo" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-950/20 blur-3xl rounded-full pointer-events-none" />

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="section-badge mx-auto"><Zap size={12} /> {t('promo.badge')}</div>
          <h2 className="section-title">
            <span className="text-white">{t('promo.titlePart1')}</span>{' '}
            <span className="text-gradient-red">{t('promo.titlePart2')}</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{t('promo.subtitle')}</p>
        </motion.div>

        {error ? (
          <div className="text-center text-white/60">{error}</div>
        ) : banners.length === 0 ? (
          <div className="text-center text-white/60">{t('promo.empty')}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5 },
                1280: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              navigation
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {banners.map((promo) => (
                <SwiperSlide key={promo.id}>
                  <PromoCard promo={promo} whatsapp={config.whatsapp} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  );
}
