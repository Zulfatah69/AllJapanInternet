import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container-custom h-20 flex items-center justify-between">

        <Link href="/" className="text-2xl font-bold">
          AllJapanInternet
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/produk">Produk</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/how-to-order">How To Order</Link>
          <Link href="/contact">Contact</Link>
        </nav>

      </div>
    </header>
  );
}