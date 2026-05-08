import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";

import ProductCard from "@/components/produk/ProductCard";

import { getDetailProduk } from "@/services/produk";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DetailProduk({
  params,
}: Props) {

  const { slug } = await params;

  const response =
    await getDetailProduk(slug);

  const produk = response.data;

  return (
    <main>

      <Navbar />

      <section className="py-16">

        <div className="container-custom">

          <div className="grid md:grid-cols-2 gap-10">

            {/* IMAGE */}
            <div>

              <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden">

                {produk.thumbnail ? (
                  <img
                    src={produk.thumbnail}
                    alt={produk.nama_produk}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    No Image
                  </div>
                )}

              </div>

            </div>

            {/* CONTENT */}
            <div>

              <div className="flex flex-wrap gap-3 mb-5">

                {produk.best_seller && (
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
                    Best Seller
                  </div>
                )}

                {produk.esim && (
                  <div className="bg-black text-white px-4 py-2 rounded-full text-sm">
                    E-SIM
                  </div>
                )}

                {produk.unlimited && (
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">
                    Unlimited
                  </div>
                )}

              </div>

              <h1 className="text-5xl font-bold">
                {produk.nama_produk}
              </h1>

              <p className="mt-4 text-gray-500 text-lg">
                {produk.provider?.nama_provider}
              </p>

              {produk.deskripsi && (
                <p className="mt-8 leading-relaxed text-gray-700">
                  {produk.deskripsi}
                </p>
              )}

              {/* VARIAN */}
              <div className="mt-12">

                <h2 className="text-2xl font-bold mb-6">
                  Varian Produk
                </h2>

                <div className="space-y-5">

                  {produk.varian?.map((item: any) => (

                    <div
                      key={item.id}
                      className="border rounded-3xl p-6"
                    >

                      <div className="flex justify-between items-center">

                        <div>

                          <h3 className="text-2xl font-semibold">
                            {item.nama_varian}
                          </h3>

                          <p className="text-gray-500 mt-1">
                            {item.jumlah_gb} GB
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="text-3xl font-bold">
                            ¥ {item.harga_bulanan}
                          </p>

                          <p className="text-sm text-gray-500">
                            per bulan
                          </p>

                        </div>

                      </div>

                      {/* PERIODE */}
                      {item.periode_pembelian?.length > 0 && (

                        <div className="mt-8">

                          <h4 className="font-semibold mb-4">
                            Harga Awal
                          </h4>

                          <div className="space-y-3">

                            {item.periode_pembelian.map(
                              (periode: any) => (

                                <div
                                  key={periode.id}
                                  className="bg-gray-50 rounded-2xl p-4 flex justify-between"
                                >

                                  <div>

                                    <p className="font-medium">
                                      {periode.nama_periode}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                      {periode.tanggal_mulai}
                                      {" - "}
                                      {periode.tanggal_selesai}
                                    </p>

                                  </div>

                                  <div className="font-bold">
                                    ¥ {periode.harga_awal}
                                  </div>

                                </div>
                              )
                            )}

                          </div>

                        </div>
                      )}

                    </div>
                  ))}

                </div>

              </div>

              {/* ONGKIR */}
              {produk.ongkir?.length > 0 && (

                <div className="mt-12">

                  <h2 className="text-2xl font-bold mb-6">
                    Ongkir & Pembayaran
                  </h2>

                  <div className="space-y-3">

                    {produk.ongkir.map((item: any) => (

                      <div
                        key={item.id}
                        className="border rounded-2xl p-5 flex justify-between"
                      >

                        <div>
                          {item.metode_pembayaran?.nama_metode}
                        </div>

                        <div className="font-bold">

                          {item.harga_ongkir == 0
                            ? "Gratis"
                            : `¥ ${item.harga_ongkir}`}

                        </div>

                      </div>
                    ))}

                  </div>

                </div>
              )}

              {/* NOTE */}
              {produk.catatan && (

                <div className="mt-12 border rounded-3xl p-6 bg-yellow-50">

                  <h2 className="text-2xl font-bold mb-4">
                    Catatan
                  </h2>

                  <p className="leading-relaxed">
                    {produk.catatan}
                  </p>

                </div>
              )}

            </div>

          </div>

          {/* RELATED */}
          {response.related_product?.length > 0 && (

            <div className="mt-24">

              <h2 className="text-4xl font-bold mb-10">
                Produk Lainnya
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {response.related_product.map(
                  (item: any) => (

                    <ProductCard
                      key={item.id}
                      produk={item}
                    />
                  )
                )}

              </div>

            </div>
          )}

        </div>

      </section>

      <Footer />

    </main>
  );
}