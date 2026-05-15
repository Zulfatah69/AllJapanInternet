import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ArrowRight, CreditCard, Truck, Smartphone, Headphones } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    icon: Smartphone,
    titleKey: 'howToOrder.steps.step1.title',
    descriptionKey: 'howToOrder.steps.step1.description',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    icon: Headphones,
    titleKey: 'howToOrder.steps.step2.title',
    descriptionKey: 'howToOrder.steps.step2.description',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 3,
    icon: CreditCard,
    titleKey: 'howToOrder.steps.step3.title',
    descriptionKey: 'howToOrder.steps.step3.description',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 4,
    icon: Truck,
    titleKey: 'howToOrder.steps.step4.title',
    descriptionKey: 'howToOrder.steps.step4.description',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 5,
    icon: CheckCircle,
    titleKey: 'howToOrder.steps.step5.title',
    descriptionKey: 'howToOrder.steps.step5.description',
    color: 'from-red-500 to-red-600'
  }
];

const PAYMENT_METHODS = [
  { name: 'Softbank', logo: '/logos/softbank.png', color: '#e31937' },
  { name: 'Docomo', logo: '/logos/docomo.png', color: '#e40026' },
  { name: 'AU', logo: '/logos/au.png', color: '#0099ff' },
  { name: 'Rakuten', logo: '/logos/rakuten.png', color: '#bf0000' },
  { name: 'COD', logo: '/logos/cod.png', color: '#10b981' },
  { name: 'Transfer', logo: '/logos/transfer.png', color: '#6366f1' },
  { name: 'Konbini', logo: '/logos/konbini.png', color: '#f59e0b' }
];

export default function HowToOrderSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-to-order" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-badge mb-4">{t('howToOrder.badge')}</div>
          <h2 className="section-title">{t('howToOrder.title')}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {t('howToOrder.subtitle')}
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative mb-20">
          {/* Timeline Line */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="glass rounded-2xl p-6 text-center hover:border-red-500/30 transition-all duration-300 group">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center glow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon size={28} className="text-white" />
                  </div>

                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.id}
                  </div>

                  {/* Content */}
                  <h3 className="text-white font-bold font-poppins text-lg mb-2">{t(step.titleKey)}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{t(step.descriptionKey)}</p>
                </div>

                {/* Arrow */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 z-10">
                    <ArrowRight size={20} className="text-red-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white font-poppins mb-8">{t('howToOrder.paymentTitle')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-4xl mx-auto">
            {PAYMENT_METHODS.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="glass rounded-xl p-4 hover:border-red-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: method.color }}
                  />
                </div>
                <div className="text-white font-semibold text-sm">{method.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}