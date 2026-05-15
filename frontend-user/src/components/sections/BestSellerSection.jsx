import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { TrendingUp, ShoppingBag, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const BADGE_COLORS = {
  gold: 'badge-gold',
  red: 'badge-red',
  blue: 'badge-blue',
  purple: 'badge-purple',
  green: 'badge-green',
};

function ProductCard({ product, index }) {
  const { t } = useTranslation();
  const { openModal, config } = useApp();
  const whatsappUrl = `${config.whatsapp}?text=${encodeURIComponent(`Halo kak, saya mau order:\n\n${product.orderFormat || product.name}`)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-product group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {product.provider?.name && (
          <div className="absolute top-3 right-3">
            <span className="badge text-xs font-bold text-white bg-red-500/20 border border-red-500/30">
              {product.provider.name}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{product.kategori?.name}</p>
        <h3 className="text-white font-bold font-poppins text-lg mb-3 leading-tight">{product.name}</h3>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: t('products.quota'), value: product.quota },
            { label: t('products.duration'), value: product.masa },
            { label: t('products.shipping'), value: product.ongkir },
          ].map(({ label, value }) => (
            <div key={label} className="glass rounded-lg p-2">
              <div className="text-white/40 text-xs">{label}</div>
              <div className="text-white text-sm font-semibold">{value || '-'}</div>
            </div>
          ))}
          <div className="glass rounded-lg p-2">
            <div className="text-white/40 text-xs">{t('products.stock')}</div>
            <div className="text-green-400 text-sm font-semibold">{product.best_seller ? t('products.available') : t('products.check')}</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white/40 text-xs">{t('products.price')}</div>
            <div className="text-xl font-bold text-gradient-red font-poppins">
              Rp {Number(product.price || 0).toLocaleString('id-ID')}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => openModal(product)}
            className="btn-secondary flex-1 text-sm py-2.5"
          >
            <Eye size={14} /> {t('bestSeller.detail')}
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 text-sm py-2.5 flex items-center justify-center gap-1.5"
          >
            <ShoppingBag size={14} /> {t('bestSeller.buyNow')}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function BestSellerSection() {
  const { t } = useTranslation();
  const { bestSellers, loading, error } = useApp();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  if (loading) {
    return (
      <section id="best-seller" className="section-padding relative overflow-hidden">
        <div className="container-custom relative z-10 text-center text-white/60">{t('loading')}</div>
      </section>
    );
  }

  return (
    <section id="best-seller" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-950/15 blur-3xl rounded-full pointer-events-none" />

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="section-badge mx-auto"><TrendingUp size={12} /> {t('bestSeller.badge')}</div>
          <h2 className="section-title">
            <span className="text-white">{t('bestSeller.titlePart1')} </span>
            <span className="text-gradient-red">{t('bestSeller.titlePart2')}</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{t('bestSeller.subtitle')}</p>
        </motion.div>

        {error ? (
          <div className="text-center text-white/60">{error}</div>
        ) : bestSellers.length === 0 ? (
          <div className="text-center text-white/60">{t('bestSeller.empty')}</div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {bestSellers.map((product, i) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
          >
            {t('bestSeller.viewAll')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
