import "../../styles/Navbar.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container-custom h-20 flex items-center justify-between">

        <Link href="/" className="text-2xl font-bold">
          AllJapanInternet
        </Link>

        <nav className="nav-links">
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