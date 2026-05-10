export interface Provider {
  id: number;
  nama_provider: string;
}

export interface Produk {
  id: number;

  nama_produk: string;

  slug: string;

  thumbnail: string | null;

  best_seller: boolean;

  provider: Provider;
}