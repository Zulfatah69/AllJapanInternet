import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";

import ProductCard from "@/components/produk/ProductCard";

import { getBestSeller } from "@/services/produk";

import BenefitSection from "@/components/home/BenefitSection";

import Footer from "@/components/layout/Footer";

export default async function Home() {

  const produk = await getBestSeller();

  return (
    <main>

      <Navbar />

      <HeroSection />

      <BenefitSection />

      <section className="py-16">

        <div className="container-custom">

          <h2 className="text-3xl font-bold mb-10">
            Best Seller
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {produk.data?.map((item: any) => (
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