import api from "./api";

export async function getProduk(
  searchParams?: {
    search?: string;
    provider?: string;
    kategori?: string;
  }
) {

  const response = await api.get(
    "/produk",
    {
      params: searchParams,
    }
  );

  return response.data;
}

export async function getBestSeller() {

  const response = await api.get(
    "/produk?best_seller=1"
  );

  return response.data;
}

export async function getDetailProduk(
  slug: string
) {

  const response = await api.get(
    `/produk/${slug}`
  );

  return response.data;
}