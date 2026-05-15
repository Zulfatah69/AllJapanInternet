import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Download, Eye, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function GuideBookSection() {
  const { t } = useTranslation();
  const { config } = useApp();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = config.guideBookPdf;
    link.download = 'Buku_Panduan_All_Japan_Internet.pdf';
    link.click();
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <section id="guide-book" className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-badge mb-4">Buku Panduan</div>
          <h2 className="section-title">Panduan Lengkap</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Unduh buku panduan lengkap untuk memahami cara menggunakan layanan internet kami di Jepang
          </p>
        </motion.div>

        {/* Guide Book Card */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-8 hover:border-red-500/30 transition-all duration-300 group"
          >
            {/* Book Cover */}
            <div className="relative mb-8">
              <div className="aspect-[3/4] bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-red-500/20 transition-shadow duration-300">
                <div className="text-center">
                  <BookOpen size={64} className="text-white mx-auto mb-4 opacity-80" />
                  <div className="text-white font-bold font-poppins text-xl">All Japan Internet</div>
                  <div className="text-white/80 text-sm">Buku Panduan</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <FileText size={20} className="text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-8">
              <h3 className="text-white font-bold font-poppins text-2xl mb-4">
                Buku Panduan Lengkap
              </h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Panduan komprehensif yang berisi informasi lengkap tentang cara menggunakan kartu internet,
                eSIM, pocket wifi, dan layanan home wifi di Jepang. Termasuk tips dan trik untuk mendapatkan
                pengalaman internet terbaik selama di Jepang.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-red-400">50+</div>
                  <div className="text-white/60 text-sm">Halaman</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-red-400">PDF</div>
                  <div className="text-white/60 text-sm">Format</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-red-400">Free</div>
                  <div className="text-white/60 text-sm">Download</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handlePreview}
                className="btn-secondary flex-1 py-3 flex items-center justify-center gap-2"
              >
                <Eye size={18} />
                Preview PDF
              </button>
              <button
                onClick={handleDownload}
                className="btn-whatsapp flex-1 py-3 flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>
          </motion.div>
        </div>

        {/* PDF Preview Modal */}
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Preview Buku Panduan</h3>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <iframe
                  src={config.guideBookPdf}
                  className="w-full h-[70vh] border-0 rounded-xl"
                  title="Buku Panduan Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}