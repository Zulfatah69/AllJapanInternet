import api from './api';

const normalizeProduct = (product) => {
  const firstVariant = Array.isArray(product.varian) ? product.varian[0] : undefined;
  const firstOngkir = Array.isArray(product.ongkir) ? product.ongkir[0] : undefined;

  const provider = {
    id: product.provider?.id,
    name: product.provider?.nama_provider,
    slug: product.provider?.slug,
  };

  const kategori = {
    id: product.kategori?.id,
    name: product.kategori?.nama_kategori,
    slug: product.kategori?.slug,
  };

  const price = firstVariant?.harga_bulanan ?? 0;
  const quota = firstVariant?.jumlah_gb ? `${firstVariant.jumlah_gb}GB` : undefined;
  const masa = firstVariant?.masa_aktif_bulan ? `${firstVariant.masa_aktif_bulan} Bulan` : undefined;
  const ongkir = firstOngkir?.harga_ongkir ? `¥${firstOngkir.harga_ongkir}` : undefined;

  return {
    id: product.id,
    slug: product.slug,
    name: product.nama_produk,
    thumbnail: product.thumbnail,
    images: product.thumbnail ? [product.thumbnail] : [],
    description: product.deskripsi,
    notes: product.catatan,
    best_seller: product.best_seller,
    popular: product.produk_populer,
    provider,
    kategori,
    varian: Array.isArray(product.varian)
      ? product.varian.map((variant) => ({
          id: variant.id,
          name: variant.nama_varian,
          quota: variant.jumlah_gb ? `${variant.jumlah_gb}GB` : '',
          price: variant.harga_bulanan,
          duration: variant.masa_aktif_bulan ? `${variant.masa_aktif_bulan} Bulan` : '',
        }))
      : [],
    price,
    quota,
    masa,
    ongkir,
    benefits: [product.catatan].filter(Boolean),
    orderFormat: `Nama: \nAlamat: \nProduk: ${product.nama_produk}${firstVariant?.nama_varian ? `\nVarian: ${firstVariant.nama_varian}` : ''}`,
  };
};

export const fetchBanners = () => api.get('/promo-banner');
export const fetchTestimonials = () => api.get('/testimoni');
export const fetchProducts = (params = {}) => api.get('/produk', { params });
export const fetchProductBySlug = (slug) => api.get(`/produk/${slug}`);
export const fetchPage = (slug) => api.get(`/page/${slug}`);
export const normalizeProductResponse = (response) => {
  if (!response?.data) return [];
  return Array.isArray(response.data)
    ? response.data.map(normalizeProduct)
    : normalizeProduct(response.data);
};
