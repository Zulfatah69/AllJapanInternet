import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { getPage } from "@/services/page";

export default async function AboutPage() {

  const response = await getPage(
    "buku-panduan"
  );

  const page = response.data;

  return (
    <main>

      <Navbar />

      <div className="container-custom py-16">

        <h1 className="text-5xl font-bold mb-10">
          {page.judul}
        </h1>

        <div
          dangerouslySetInnerHTML={{
            __html: page.konten,
          }}
        />

      </div>

      <Footer />

    </main>
  );
}