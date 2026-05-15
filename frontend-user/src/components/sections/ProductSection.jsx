import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { Search, ChevronDown, ChevronRight, Package, ShoppingBag, Eye, SlidersHorizontal } from 'lucide-react';

function ProductCard({ product, provider }) {
  const { t, config, openModal } = useApp();
  const waMsg = encodeURIComponent(
    t('products.orderMessage', {
      provider: provider.name,
      package: product.name,
      price: Number(product.price || 0).toLocaleString('id-ID'),
    })
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 hover:border-red-500/30 border border-transparent transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-sm">{product.name}</span>
        <span className="badge badge-green text-xs">{product.masa || t('products.noDuration')}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
        <div>
          <div className="text-white/40">{t('products.price')}</div>
          <div className="text-red-400 font-bold">Rp {Number(product.price || 0).toLocaleString('id-ID')}</div>
        </div>
        <div>
          <div className="text-white/40">{t('products.shipping')}</div>
          <div className="text-white font-medium">{product.ongkir || '-'}</div>
        </div>
        <div>
          <div className="text-white/40">{t('products.quota')}</div>
          <div className="text-white font-medium">{product.quota || '-'}</div>
        </div>
      </div>
      <a
        href={`${config.whatsapp}?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp w-full text-xs py-2 flex items-center justify-center gap-1.5"
      >
        <ShoppingBag size={12} /> {t('products.orderViaWA')}
      </a>
      <button
        onClick={() => openModal(product)}
        className="mt-3 btn-secondary w-full text-xs py-2 flex items-center justify-center gap-1.5"
      >
        <Eye size={12} /> {t('products.viewDetail')}
      </button>
    </motion.div>
  );
}

function ProviderAccordion({ provider }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className={`accordion-item mb-2 ${open ? 'active' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-white font-semibold text-sm">{provider.name}</span>
          <span className="badge badge-red text-xs">{provider.products?.length} {t('products.packageWord')}</span>
        </div>
        <ChevronDown size={16} className={`text-white/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {provider.products?.map((pkg) => (
                <ProductCard key={pkg.id} product={pkg} provider={provider} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategorySection({ category, filteredProviders }) {
  const { t } = useTranslation();

  if (!category) {
    return (
      <div className="text-center py-12 text-white/30">
        <Package size={40} className="mx-auto mb-3 opacity-30" />
        <p>{t('products.noCategory')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="glass rounded-2xl p-5 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center">
          <Package size={22} className="text-red-500" />
        </div>
        <div>
          <h3 className="text-white font-bold text-xl font-poppins">{category.name}</h3>
        </div>
        <div className="ml-auto glass-red rounded-lg px-4 py-2 text-center">
          <div className="text-red-400 text-xs">{t('products.providers')}</div>
          <div className="text-white font-bold">{filteredProviders?.length || 0}</div>
        </div>
      </div>

      <div className="space-y-2">
        {filteredProviders.length === 0 ? (
          <div className="text-center py-12 text-white/30">
            <Package size={40} className="mx-auto mb-3 opacity-30" />
            <p>{t('products.noResults')}</p>
          </div>
        ) : (
          filteredProviders.map((provider) => (
            <ProviderAccordion key={provider.id} provider={provider} />
          ))
        )}
      </div>
    </>
  );
}

export default function ProductSection() {
  const { t } = useTranslation();
  const { products, loading, error } = useApp();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState(null);

  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((product) => {
      const category = product.kategori || { id: 'uncategorized', name: t('products.other') };
      const provider = product.provider || { id: 'unknown', name: t('products.unknownProvider') };

      if (!map.has(category.id)) {
        map.set(category.id, { id: category.id, name: category.name, providers: new Map() });
      }

      const categoryEntry = map.get(category.id);
      if (!categoryEntry.providers.has(provider.id)) {
        categoryEntry.providers.set(provider.id, { id: provider.id, name: provider.name, products: [] });
      }

      categoryEntry.providers.get(provider.id).products.push(product);
    });

    return Array.from(map.values()).map((category) => ({
      ...category,
      providers: Array.from(category.providers.values()),
    }));
  }, [products, t]);

  useEffect(() => {
    if (categories.length && !categories.some((cat) => cat.id === activeCat)) {
      setActiveCat(categories[0].id);
    }
  }, [categories, activeCat]);

  const activeCategory = categories.find((category) => category.id === activeCat) || categories[0];

  const filteredProviders = activeCategory?.providers?.map((provider) => ({
    ...provider,
    products: provider.products.filter((product) => {
      if (!search) return true;
      const term = search.toLowerCase();
      return (
        product.name.toLowerCase().includes(term) ||
        product.provider.name.toLowerCase().includes(term) ||
        product.kategori.name.toLowerCase().includes(term)
      );
    }),
  })).filter((provider) => provider.products.length > 0) || [];

  if (loading) {
    return (
      <section id="products" className="section-padding relative overflow-hidden">
        <div className="container-custom relative z-10 text-center text-white/60">{t('loading')}</div>
      </section>
    );
  }

  return (
    <section id="products" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-red-950/10 blur-3xl rounded-full pointer-events-none" />

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="section-badge mx-auto"><Package size={12} /> {t('products.badge')}</div>
          <h2 className="section-title">
            <span className="text-white">{t('products.titlePart1')} </span>
            <span className="text-gradient-red">{t('products.titlePart2')}</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">{t('products.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-3 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder={t('products.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-glass pl-11"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all">
            <SlidersHorizontal size={14} /> {t('products.filter')}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`tab-btn ${activeCat === cat.id ? 'active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {error ? (
          <div className="text-center text-white/60">{error}</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory?.id || 'empty'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <CategorySection category={activeCategory} filteredProviders={filteredProviders} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
