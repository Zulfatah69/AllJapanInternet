"use client";

import Link from "next/link";

import {
  useEffect,
  useState
} from "react";

import {
  getProducts
} from "../services/api";
import { formatLowestPrice } from "../lib/productPrice";
import { useLanguage } from "../context/LanguageContext";

export default function ProductsPage() {

  const { language } = useLanguage();

  const [products,
    setProducts] =
    useState<any[]>([]);

  const [filtered,
    setFiltered] =
    useState<any[]>([]);

  const [search,
    setSearch] =
    useState("");

  const [selectedCategory,
    setSelectedCategory] =
    useState("all");

  useEffect(() => {

    async function fetchData() {

      const response =
        await getProducts();

      setProducts(
        response.data || []
      );

      setFiltered(
        response.data || []
      );

    }

    fetchData();

  }, []);

  useEffect(() => {

    let result =
      [...products];

    /* SEARCH */

    if (search) {

      result = result.filter(
        (product) =>

          product.nama
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }

    /* CATEGORY */

    if (
      selectedCategory !==
      "all"
    ) {

      result = result.filter(
        (product) =>

          product.category ===
          selectedCategory
      );

    }

    setFiltered(result);

  }, [

    search,
    selectedCategory,
    products

  ]);

  const categories = [

    "all",

    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    )

  ];

  return (

    <main
      className="
        max-w-7xl
        mx-auto
        px-6
        py-16
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-6
          mb-12
        "
      >

        <div>

          <h1
            className="
              text-5xl
              font-black
              mb-3
            "
          >
            Products
          </h1>

          <p
            className="
              text-gray-500
              text-lg
            "
          >
            Explore Japanese
            internet products
          </p>

        </div>

        {/* SEARCH */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-4
          "
        >

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              w-full
              md:w-80
              bg-white
            "
          />

          {/* CATEGORY */}

          <select
            value={
              selectedCategory
            }
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              bg-white
            "
          >

            {categories.map(
              (category) => (

                <option
                  key={category}
                  value={category}
                >

                  {category}

                </option>

              )
            )}

          </select>

        </div>

      </div>

      {/* EMPTY */}

      {filtered.length === 0 && (

        <div
          className="
            text-center
            py-32
          "
        >

          <h2
            className="
              text-4xl
              font-black
              mb-4
            "
          >
            No Product Found
          </h2>

          <p
            className="
              text-gray-500
            "
          >
            Try another keyword
          </p>

        </div>

      )}

      {/* PRODUCTS */}

      <div
        className="
          grid
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
        "
      >

        {filtered.map(
          (product: any) => (

            <Link
              key={product.id}
              href={`/products/${product.slug}`}
            >

              <div
                className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-sm
                  hover:shadow-2xl
                  transition
                  duration-300
                  h-full
                "
              >

                <div
                  className="
                    overflow-hidden
                  "
                >

                  <img
                    src={product.thumbnail}
                    className="
                      w-full
                      h-72
                      object-cover
                      hover:scale-105
                      transition
                      duration-500
                    "
                  />

                </div>

                <div className="p-6">

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-4
                    "
                  >

                    <span
                      className="
                        text-sm
                        bg-gray-100
                        px-3
                        py-1
                        rounded-full
                      "
                    >
                      {product.provider}
                    </span>

                    {product.best_seller && (

                      <span
                        className="
                          text-xs
                          bg-red-500
                          text-white
                          px-3
                          py-1
                          rounded-full
                        "
                      >
                        Best Seller
                      </span>

                    )}

                  </div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      mb-3
                    "
                  >
                    {product.nama}
                  </h2>

                  <p
                    className="
                      text-gray-500
                      line-clamp-2
                      mb-6
                    "
                  >
                    {product.deskripsi}
                  </p>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div>

                      <p
                        className="
                          text-sm
                          text-gray-400
                        "
                      >
                        Starting From
                      </p>

                      <p
                        className="
                          text-2xl
                          font-black
                          text-red-500
                        "
                      >
                        {formatLowestPrice(product, language)}
                      </p>

                    </div>

                    <div
                      className="
                        bg-black
                        text-white
                        px-5
                        py-3
                        rounded-2xl
                      "
                    >
                      View
                    </div>

                  </div>

                </div>

              </div>

            </Link>

          )
        )}

      </div>

    </main>

  );
}