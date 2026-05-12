import { Produk } from "@/types/produk";
import Link from "next/link";

interface Props {
  produk: Produk;
}

export default function ProductCard({
  produk,
}: Props) {
  return (
    <Link href={`/produk/${produk.slug}`}>

      <div className="border rounded-3xl overflow-hidden hover:shadow-xl transition cursor-pointer">

        <div className="aspect-video bg-gray-100" />

        <div className="p-6">

          {produk.best_seller && (
            <div className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full mb-4">
              Best Seller
            </div>
          )}

          <h3 className="text-2xl font-semibold">
            {produk.nama_produk}
          </h3>

          <p className="text-gray-500 mt-2">
            {produk.provider?.nama_provider}
          </p>

          <button className="mt-6 w-full bg-black text-white py-3 rounded-2xl">
            Detail Produk
          </button>

        </div>

      </div>

    </Link>
  );
}