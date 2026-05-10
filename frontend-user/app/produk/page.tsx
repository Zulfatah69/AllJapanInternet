import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";

import ProductCard from "@/components/produk/ProductCard";

import { getProduk } from "@/services/produk";

interface Props {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function ProdukPage({
  searchParams,
}: Props) {

  const params = await searchParams;

  const response = await getProduk({
    search: params.search,
  });

  return (
    <main>

      <Navbar />

      <section className="py-16">

        <div className="container-custom">

          <div className="flex items-center justify-between mb-10">

            <h1 className="text-4xl font-bold">
              Semua Produk
            </h1>

            <form>

              <input
                type="text"
                name="search"
                placeholder="Cari produk..."
                defaultValue={params.search}
                className="border rounded-2xl px-5 py-3"
              />

            </form>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {response.data?.map((item: any) => (

              <ProductCard
                key={item.id}
                produk={item}
              />

            ))}

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}