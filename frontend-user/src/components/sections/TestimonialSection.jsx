
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function TestimonialSection() {
  const { t } = useTranslation();
  const { testimonials, loading, error } = useApp();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  if (loading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center text-white/60">{t('loading')}</div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10"
        >
          {t('testimonials.title')}
        </motion.h2>

        {error ? (
          <div className="text-center text-white/60">{error}</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-white/60">{t('testimonials.empty')}</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 font-bold">
                    {item.nama?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.nama}</h4>
                    <p className="text-white/40 text-sm">{item.pekerjaan || t('testimonials.defaultJob')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating || 5)].map((_, index) => (
                    <Star key={index} size={16} className="text-yellow-300" />
                  ))}
                </div>

                <p className="text-white/70 leading-relaxed">{item.isi_testimoni}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
