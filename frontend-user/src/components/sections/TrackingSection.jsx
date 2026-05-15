import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Truck, Clock, MapPin, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function TrackingSection() {
  const { t } = useTranslation();
  const { config } = useApp();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const TRACKING_INFO = [
    {
      titleKey: 'tracking.items.deliveryTime.title',
      descriptionKey: 'tracking.items.deliveryTime.description',
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
    },
    {
      titleKey: 'tracking.items.japanPost.title',
      descriptionKey: 'tracking.items.japanPost.description',
      icon: MapPin,
      color: 'from-green-500 to-green-600',
      link: config.trackingJP,
    },
    {
      titleKey: 'tracking.items.yamato.title',
      descriptionKey: 'tracking.items.yamato.description',
      icon: Truck,
      color: 'from-orange-500 to-orange-600',
      link: config.trackingYamato,
    },
  ];

  return (
    <section id="tracking" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-badge mb-4">{t('tracking.badge')}</div>
          <h2 className="section-title">{t('tracking.title')}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {t('tracking.subtitle')}
          </p>
        </motion.div>

        {/* Tracking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TRACKING_INFO.map((info, index) => (
            <motion.div
              key={info.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center glow-sm group-hover:scale-110 transition-transform duration-300`}>
                <info.icon size={28} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="text-white font-bold font-poppins text-xl mb-3 text-center">{t(info.titleKey)}</h3>
              <p className="text-white/70 text-center leading-relaxed mb-6">{t(info.descriptionKey)}</p>

              {/* Action Button */}
              {info.link && (
                <a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full py-3 flex items-center justify-center gap-2 group/btn"
                >
                  <ExternalLink size={16} />
                  {t('tracking.viewTracking')}
                  <div className="ml-auto opacity-0 group-hover/btn:opacity-100 transition-opacity">
                    →
                  </div>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-white font-bold font-poppins text-2xl mb-4">{t('tracking.additionalInfo.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-red-400 font-semibold mb-2">{t('tracking.additionalInfo.deliveryArea.title')}</h4>
                <p className="text-white/70">{t('tracking.additionalInfo.deliveryArea.description')}</p>
              </div>
              <div>
                <h4 className="text-red-400 font-semibold mb-2">{t('tracking.additionalInfo.operatingHours.title')}</h4>
                <p className="text-white/70">{t('tracking.additionalInfo.operatingHours.description')}</p>
              </div>
              <div>
                <h4 className="text-red-400 font-semibold mb-2">{t('tracking.additionalInfo.deliveryMethods.title')}</h4>
                <p className="text-white/70">{t('tracking.additionalInfo.deliveryMethods.description')}</p>
              </div>
              <div>
                <h4 className="text-red-400 font-semibold mb-2">{t('tracking.additionalInfo.contactSupport.title')}</h4>
                <p className="text-white/70">{t('tracking.additionalInfo.contactSupport.description')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}