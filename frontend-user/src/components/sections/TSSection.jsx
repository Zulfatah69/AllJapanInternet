import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HelpCircle, MessageCircle, Phone, Mail, AlertTriangle, CheckCircle } from 'lucide-react';

const TS_DATA = [
  {
    id: 1,
    categoryKey: 'ts.items.activation.category',
    titleKey: 'ts.items.activation.title',
    descriptionKey: 'ts.items.activation.description',
    solutionKey: 'ts.items.activation.solution',
    icon: AlertTriangle,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 2,
    categoryKey: 'ts.items.internet.category',
    titleKey: 'ts.items.internet.title',
    descriptionKey: 'ts.items.internet.description',
    solutionKey: 'ts.items.internet.solution',
    icon: AlertTriangle,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 3,
    categoryKey: 'ts.items.shipping.category',
    titleKey: 'ts.items.shipping.title',
    descriptionKey: 'ts.items.shipping.description',
    solutionKey: 'ts.items.shipping.solution',
    icon: CheckCircle,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 4,
    categoryKey: 'ts.items.payment.category',
    titleKey: 'ts.items.payment.title',
    descriptionKey: 'ts.items.payment.description',
    solutionKey: 'ts.items.payment.solution',
    icon: CheckCircle,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 5,
    categoryKey: 'ts.items.esim.category',
    titleKey: 'ts.items.esim.title',
    descriptionKey: 'ts.items.esim.description',
    solutionKey: 'ts.items.esim.solution',
    icon: AlertTriangle,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 6,
    categoryKey: 'ts.items.pocketWifi.category',
    titleKey: 'ts.items.pocketWifi.title',
    descriptionKey: 'ts.items.pocketWifi.description',
    solutionKey: 'ts.items.pocketWifi.solution',
    icon: AlertTriangle,
    color: 'from-yellow-500 to-yellow-600'
  }
];

const CONTACT_METHODS = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Response tercepat 24/7',
    contact: '+62 812-3456-7890',
    color: 'from-green-500 to-green-600',
    link: 'https://wa.me/6281234567890'
  },
  {
    icon: Phone,
    title: 'Telepon',
    description: 'Senin - Sabtu, 09:00 - 21:00 WIB',
    contact: '+62 21-1234-5678',
    color: 'from-blue-500 to-blue-600',
    link: 'tel:+622112345678'
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Response dalam 24 jam',
    contact: 'support@alljapaninternet.com',
    color: 'from-red-500 to-red-600',
    link: 'mailto:support@alljapaninternet.com'
  }
];

export default function TSSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ts" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-badge mb-4">{t('ts.badge')}</div>
          <h2 className="section-title">{t('ts.title')}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {t('ts.subtitle')}
          </p>
        </motion.div>

        {/* TS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TS_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-1">{t(item.categoryKey)}</div>
                  <h3 className="text-white font-bold font-poppins text-lg leading-tight">{t(item.titleKey)}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm mb-4 leading-relaxed">{t(item.descriptionKey)}</p>

              {/* Solution */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-red-400 font-semibold text-sm mb-2">{t('ts.solutionLabel')}</div>
                <div className="text-white/80 text-sm whitespace-pre-line leading-relaxed">{t(item.solutionKey)}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white font-poppins mb-8">{t('ts.needHelp')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {CONTACT_METHODS.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center glow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon size={28} className="text-white" />
                </div>
                <h4 className="text-white font-bold font-poppins text-lg mb-2">{method.title}</h4>
                <p className="text-white/60 text-sm mb-4">{method.description}</p>
                <div className="text-red-400 font-semibold text-sm mb-4">{method.contact}</div>
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full py-2.5 text-sm"
                >
                  {t('ts.contactNow')}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}