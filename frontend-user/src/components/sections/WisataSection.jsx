import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Camera, Star, ExternalLink } from 'lucide-react';

const WISATA_DATA = [
  {
    id: 1,
    name: 'Tokyo Skytree',
    location: 'Tokyo',
    descriptionKey: 'wisata.items.skytree.description',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    rating: 4.8,
    categoryKey: 'wisata.categories.modern'
  },
  {
    id: 2,
    name: 'Fushimi Inari Shrine',
    location: 'Kyoto',
    descriptionKey: 'wisata.items.fushimi.description',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    rating: 4.9,
    categoryKey: 'wisata.categories.cultural'
  },
  {
    id: 3,
    name: 'Mount Fuji',
    location: 'Yamanashi',
    descriptionKey: 'wisata.items.fuji.description',
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80',
    rating: 4.7,
    categoryKey: 'wisata.categories.nature'
  },
  {
    id: 4,
    name: 'Osaka Castle',
    location: 'Osaka',
    descriptionKey: 'wisata.items.osaka.description',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80',
    rating: 4.6,
    categoryKey: 'wisata.categories.history'
  },
  {
    id: 5,
    name: 'Shibuya Crossing',
    location: 'Tokyo',
    descriptionKey: 'wisata.items.shibuya.description',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    rating: 4.5,
    categoryKey: 'wisata.categories.urban'
  },
  {
    id: 6,
    name: 'Hiroshima Peace Memorial',
    location: 'Hiroshima',
    descriptionKey: 'wisata.items.hiroshima.description',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    rating: 4.8,
    categoryKey: 'wisata.categories.education'
  }
];

export default function WisataSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="wisata" className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-badge mb-4">{t('wisata.badge')}</div>
          <h2 className="section-title">{t('wisata.title')}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {t('wisata.subtitle')}
          </p>
        </motion.div>

        {/* Wisata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WISATA_DATA.map((wisata, index) => (
            <motion.div
              key={wisata.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={wisata.image}
                  alt={wisata.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="badge badge-red text-xs">{t(wisata.categoryKey)}</span>
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-semibold">{wisata.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-red-400" />
                  <span className="text-white/60 text-sm">{wisata.location}</span>
                </div>

                <h3 className="text-white font-bold font-poppins text-xl mb-3 leading-tight">
                  {wisata.name}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {t(wisata.descriptionKey)}
                </p>

                {/* Action */}
                <button className="btn-secondary w-full py-2.5 flex items-center justify-center gap-2 group/btn">
                  <Camera size={16} />
                  {t('wisata.detailsButton')}
                  <ExternalLink size={14} className="ml-auto opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-white font-bold font-poppins text-2xl mb-4">
              {t('wisata.ctaTitle')}
            </h3>
            <p className="text-white/70 mb-6">
              {t('wisata.ctaDescription')}
            </p>
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(t('wisata.ctaWA'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center gap-2 px-8 py-3"
            >
              {t('wisata.ctaButton')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}