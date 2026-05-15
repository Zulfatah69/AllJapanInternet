import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ProductModal({ product, onClose }) {
  const { t } = useTranslation();
  const { config } = useApp();
  const [imgIdx, setImgIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const images = product.images || [];

  const handleCopy = () => {
    navigator.clipboard.writeText(product.orderFormat || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waMsg = encodeURIComponent(`Halo kak, saya mau order:\n\n${product.orderFormat || product.name}`);
  const waLink = `${config.whatsapp}?text=${waMsg}`;

  const tabs = [
    { id: 'details', label: t('modal.details') },
    { id: 'benefits', label: t('modal.benefits') },
    { id: 'order', label: t('modal.orderFormat') },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="modal-content w-full"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-square md:aspect-auto md:min-h-[400px] bg-dark-100">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[imgIdx]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImgIdx(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-red-500 w-5' : 'bg-white/40'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-dark-50">
                  <span className="text-white/20 text-6xl">📦</span>
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-red-600/30 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col">
              <div className="mb-5">
                <p className="text-red-500 text-xs font-semibold tracking-wider uppercase mb-1">{product.kategori?.name}</p>
                <h2 className="text-white font-bold text-2xl font-poppins mb-2">{product.name}</h2>
                {product.provider?.name && (
                  <span className="badge text-xs text-white font-semibold bg-red-500/20 border border-red-500/30">
                    {product.provider.name}
                  </span>
                )}
              </div>

              <div className="glass rounded-2xl p-4 mb-5">
                <div className="text-white/40 text-xs mb-1">{t('modal.price')}</div>
                <div className="text-3xl font-bold text-gradient-red font-poppins">
                  Rp {Number(product.price || 0).toLocaleString('id-ID')}
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-btn text-xs flex-1 ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto min-h-[120px]">
                {activeTab === 'details' && (
                  <div className="space-y-2.5">
                    {[
                      { label: t('modal.quota'), value: product.quota },
                      { label: t('modal.duration'), value: product.masa },
                      { label: t('modal.shipping'), value: product.ongkir },
                      { label: t('modal.stock'), value: product.best_seller ? t('modal.inStock') : t('modal.checkAvailability') },
                    ].map(({ label, value }) =>
                      value ? (
                        <div key={label} className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-white/50 text-sm">{label}</span>
                          <span className="text-white text-sm font-medium">{value}</span>
                        </div>
                      ) : null
                    )}
                    {product.description && (
                      <p className="text-white/50 text-sm mt-3 leading-relaxed">{product.description}</p>
                    )}
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <ul className="space-y-2">
                    {(product.benefits || []).map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <span className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
                          <Check size={11} className="text-red-500" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'order' && (
                  <div>
                    <pre className="glass rounded-xl p-4 text-sm text-white/70 whitespace-pre-wrap font-sans leading-relaxed">
                      {product.orderFormat || '—'}
                    </pre>
                    <button
                      onClick={handleCopy}
                      className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl glass border border-white/10 hover:border-white/20 text-sm transition-all"
                    >
                      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      {copied ? t('modal.copied') : t('modal.copyOrder')}
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full flex items-center justify-center gap-2"
                >
                  {t('modal.orderViaWA')}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
