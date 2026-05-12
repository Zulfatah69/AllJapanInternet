import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <main>

      <Navbar />

      <div className="container-custom py-16">

        <h1 className="text-5xl font-bold mb-10">
          Contact
        </h1>

        <div className="space-y-4 text-lg">

          <p>
            WhatsApp: 08123456789
          </p>

          <p>
            Email: admin@alljapaninternet.com
          </p>

        </div>

      </div>

      <Footer />

    </main>
  );
}