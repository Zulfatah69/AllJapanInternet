import React, { createContext, useContext, useEffect, useState } from 'react';
import { appConfig } from '../services/config';
import { fetchBanners, fetchProducts, fetchTestimonials, fetchPage, normalizeProductResponse } from '../services/backend';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [modalProduct, setModalProduct] = useState(null);
  const [config] = useState(appConfig);
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const [bannerResponse, productResponse, bestSellerResponse, testimonialResponse] = await Promise.all([
          fetchBanners(),
          fetchProducts(),
          fetchProducts({ best_seller: true }),
          fetchTestimonials(),
        ]);

        const pageResponse = await fetchPage('home').catch(() => null);

        const loadedProducts = normalizeProductResponse(productResponse);
        const loadedBestSellers = normalizeProductResponse(
          bestSellerResponse?.data?.length ? bestSellerResponse : productResponse
        ).filter((item) => item.best_seller);

        setBanners(bannerResponse?.data ?? []);
        setProducts(Array.isArray(loadedProducts) ? loadedProducts : []);
        setBestSellers(Array.isArray(loadedBestSellers) ? loadedBestSellers : []);
        setTestimonials(testimonialResponse?.data ?? []);
        setPageData(pageResponse?.data ?? null);
        setError(null);
      } catch (err) {
        setError(err?.message || 'Failed to load backend data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const openModal = (product) => setModalProduct(product);
  const closeModal = () => setModalProduct(null);

  return (
    <AppContext.Provider
      value={{
        modalProduct,
        openModal,
        closeModal,
        config,
        banners,
        products,
        bestSellers,
        testimonials,
        pageData,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
