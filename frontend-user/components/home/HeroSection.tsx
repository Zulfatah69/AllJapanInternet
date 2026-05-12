export default function HeroSection() {
  return (
    <section className="py-24">

      <div className="container-custom">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <div className="inline-block bg-red-100 text-red-500 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Internet Jepang Terbaik
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              SIM Card & Pocket WiFi
              Untuk Jepang
            </h1>

            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              Solusi internet cepat, stabil,
              dan murah untuk kebutuhan
              harian di Jepang.
            </p>

            <div className="mt-10 flex gap-4">

              <button className="bg-black text-white px-7 py-4 rounded-2xl">
                Lihat Produk
              </button>

              <button className="border px-7 py-4 rounded-2xl">
                WhatsApp
              </button>

            </div>

          </div>

          <div>

            <div className="aspect-square rounded-3xl bg-gray-100" />

          </div>

        </div>

      </div>

    </section>
  );
}