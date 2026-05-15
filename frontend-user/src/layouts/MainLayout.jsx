import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';
import ProductModal from '../components/ui/ProductModal';
import { useApp } from '../context/AppContext';

export default function MainLayout({ children }) {
  const { modalProduct, closeModal } = useApp();
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />
      {modalProduct && <ProductModal product={modalProduct} onClose={closeModal} />}
    </div>
  );
}
