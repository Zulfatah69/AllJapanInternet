'use client';

import {
    useEffect,
    useState,
} from 'react';

import api from './lib/api';

import { getProducts }
from './services/product.service';

import { themes }
from './lib/theme';

export default function HomePage() {

    const [products, setProducts] =
        useState<any[]>([]);

    const [setting, setSetting] =
        useState<any>(null);

    const [promos, setPromos] =
        useState<any[]>([]);

    const [
        currentPromo,
        setCurrentPromo
    ] = useState(0);

    const [
        testimonials,
        setTestimonials
    ] = useState<any[]>([]);

    const [categories, setCategories] =
        useState<any[]>([]);

    const [
        selectedCategory,
        setSelectedCategory
    ] = useState('all');

    const [
        selectedType,
        setSelectedType
    ] = useState('all');
    const [providers, setProviders] =
        useState<any[]>([]);

    const [
        selectedProvider,
        setSelectedProvider
    ] = useState('all');
    useEffect(() => {

        loadProducts();

        loadPromos();

        loadTestimonials();

        loadSettings();

        loadCategories();

        loadProviders();

    }, []);

    useEffect(() => {

        if (promos.length === 0) {
            return;
        }

        const interval = setInterval(() => {

            setCurrentPromo((prev) =>

                prev === promos.length - 1
                    ? 0
                    : prev + 1
            );

        }, 5000);

        return () => clearInterval(interval);

    }, [promos]);

    async function loadProducts() {

        try {

            const data =
                await getProducts();

            setProducts(data);

        } catch (error) {

            console.log(error);

        }
    }

    async function loadPromos() {

        try {

            const response =
                await api.get(
                    '/promos'
                );

            setPromos(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    }

    async function loadTestimonials() {

        try {

            const response =
                await api.get(
                    '/testimonials'
                );

            setTestimonials(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    }

    async function loadSettings() {

        try {

            const response =
                await api.get(
                    '/settings'
                );

            setSetting(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    }

    async function loadCategories() {

        try {

            const response =
                await api.get(
                    '/categories'
                );

            setCategories(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    }
    async function loadProviders() {

        try {

            const response =
                await api.get(
                    '/providers'
                );

            setProviders(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    }
    const activeTheme =

        themes[
            setting?.theme || 'spring'
        ];

    const filteredProducts =

        products.filter((product) => {

            const matchCategory =

                selectedCategory === 'all'

                ||

                product.category?.slug ===
                selectedCategory;

            const matchType =

                selectedType === 'all'

                ||

                product.type ===
                selectedType;

            const matchProvider =

                selectedProvider === 'all'

                ||

                product.provider?.slug ===
                selectedProvider;

            return (
                matchCategory &&
                matchType &&
                matchProvider
            );
        });

    return (

        <main
            className={
                activeTheme.background
            }
        >

            {/* HERO PROMO */}

            {promos.length > 0 && (

                <section
                    className="
                        relative
                        h-screen
                        overflow-hidden
                    "
                >

                    <img
                        src={
                            promos[currentPromo]
                                .gambar_url
                        }
                        className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                        "
                    />

                    <div
                        className="
                            absolute
                            inset-0
                            bg-black/50
                        "
                    />

                    {/* LEFT BUTTON */}

                    <button
                        onClick={() =>

                            setCurrentPromo(

                                currentPromo === 0
                                    ? promos.length - 1
                                    : currentPromo - 1
                            )

                        }
                        className="
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            z-20
                            bg-white/20
                            backdrop-blur
                            text-white
                            w-14
                            h-14
                            rounded-full
                            text-3xl
                        "
                    >
                        ←
                    </button>

                    {/* RIGHT BUTTON */}

                    <button
                        onClick={() =>

                            setCurrentPromo(

                                currentPromo === promos.length - 1
                                    ? 0
                                    : currentPromo + 1
                            )

                        }
                        className="
                            absolute
                            right-5
                            top-1/2
                            -translate-y-1/2
                            z-20
                            bg-white/20
                            backdrop-blur
                            text-white
                            w-14
                            h-14
                            rounded-full
                            text-3xl
                        "
                    >
                        →
                    </button>

                    <div
                        className="
                            relative
                            z-10
                            h-full
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                            text-white
                            px-10
                        "
                    >

                        <h1
                            className="
                                text-4xl
                                md:text-6xl
                                lg:text-7xl
                                font-black
                                mb-6
                            "
                        >
                            {
                                promos[currentPromo]
                                    .judul
                            }
                        </h1>

                        <p
                            className="
                                text-lg
                                md:text-xl
                                lg:text-2xl
                                max-w-3xl
                                mb-10
                            "
                        >
                            {
                                promos[currentPromo]
                                    .deskripsi
                            }
                        </p>

                        <a
                            href={
                                promos[currentPromo]
                                    .link
                            }
                            className="
                                bg-white
                                text-black
                                px-6
                                py-4
                                md:px-10
                                md:py-5
                                rounded-3xl
                                text-xl
                                font-black
                            "
                        >
                            View Promo
                        </a>

                    </div>

                </section>

            )}

            {/* PRODUCTS */}

            <section className="p-5 md:p-10">

                <div className="mb-12">

                    <h2
                        className={`
                            text-3xl
                            md:text-5xl
                            font-black
                            mb-4

                            ${activeTheme.text}
                        `}
                    >
                        Products
                    </h2>

                    <p
                        className="
                            text-xl
                            text-gray-500
                        "
                    >
                        Internet SIM & eSIM for Japan
                    </p>

                </div>

                {/* TYPE FILTER */}

                <div
                    className="
                        flex
                        flex-wrap
                        gap-4
                        mb-6
                    "
                >

                    <button
                        onClick={() =>
                            setSelectedType('all')
                        }
                        className="
                            px-5
                            py-3
                            rounded-2xl
                            bg-black
                            text-white
                        "
                    >
                        All
                    </button>

                    <button
                        onClick={() =>
                            setSelectedType('monthly')
                        }
                        className="
                            px-5
                            py-3
                            rounded-2xl
                            border
                            bg-white
                        "
                    >
                        Monthly
                    </button>

                    <button
                        onClick={() =>
                            setSelectedType('yearly')
                        }
                        className="
                            px-5
                            py-3
                            rounded-2xl
                            border
                            bg-white
                        "
                    >
                        Yearly
                    </button>

                </div>

                {/* CATEGORY FILTER */}

                <div
                    className="
                        flex
                        flex-wrap
                        gap-4
                        mb-10
                    "
                >

                    <button
                        onClick={() =>
                            setSelectedCategory('all')
                        }
                        className="
                            px-5
                            py-3
                            rounded-2xl
                            bg-black
                            text-white
                        "
                    >
                        All Categories
                    </button>

                    {categories.map((category) => (

                        <button
                            key={category.id}
                            onClick={() =>

                                setSelectedCategory(
                                    category.slug
                                )

                            }
                            className="
                                px-5
                                py-3
                                rounded-2xl
                                border
                                bg-white
                            "
                        >

                            {category.nama}

                        </button>

                    ))}

                </div>
                <div
                    className="
                        flex
                        flex-wrap
                        gap-4
                        mb-10
                    "
                >

                    <button
                        onClick={() =>
                            setSelectedProvider('all')
                        }
                        className="
                            px-5
                            py-3
                            rounded-2xl
                            bg-black
                            text-white
                        "
                    >
                        All Providers
                    </button>

                    {providers.map((provider) => (

                        <button
                            key={provider.id}
                            onClick={() =>

                                setSelectedProvider(
                                    provider.slug
                                )

                            }
                            className="
                                px-5
                                py-3
                                rounded-2xl
                                border
                                bg-white
                            "
                        >

                            {provider.nama}

                        </button>

                    ))}

                </div>
                {/* PRODUCT GRID */}

                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-4
                        gap-8
                    "
                >

                    {filteredProducts.map((product) => (

                        <a
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="
                                bg-white
                                rounded-3xl
                                shadow
                                overflow-hidden
                                hover:scale-[1.02]
                                transition
                            "
                        >

                            <div className="relative">

                                <img
                                    src={
                                        product.thumbnail_url
                                    }
                                    className="
                                        w-full
                                        h-60
                                        md:h-72
                                        object-cover
                                    "
                                />

                                {product.is_best_seller && (

                                    <div
                                        className={`
                                            absolute
                                            top-4
                                            left-4
                                            text-white
                                            px-4
                                            py-2
                                            rounded-full
                                            text-sm
                                            font-bold

                                            ${activeTheme.accent}
                                        `}
                                    >
                                        BEST SELLER
                                    </div>

                                )}

                            </div>

                            <div className="p-6">

                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                        mb-2
                                    "
                                >
                                    {
                                        product
                                            .category
                                            ?.nama
                                    }
                                </p>

                                <h2
                                    className="
                                        text-lg
                                        md:text-xl
                                        lg:text-2xl
                                        font-black
                                        mb-3
                                    "
                                >
                                    {product.nama}
                                </h2>

                                <p
                                    className="
                                        text-gray-500
                                        mb-6
                                    "
                                >
                                    {
                                        product
                                            .provider
                                            ?.nama
                                    }
                                </p>

                                <p
                                    className="
                                        text-2xl
                                        md:text-3xl
                                        font-black
                                    "
                                >
                                    ¥
                                    {
                                        product
                                            .lowest_price
                                    }
                                </p>

                            </div>

                        </a>

                    ))}

                </div>

            </section>

            {/* TESTIMONIALS */}

            <section
                className="
                    p-5
                    md:p-10
                    bg-black
                    text-white
                "
            >

                <h2
                    className="
                        text-3xl
                        md:text-5xl
                        font-black
                        mb-10
                    "
                >
                    Testimonials
                </h2>

                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-4
                        gap-6
                    "
                >

                    {testimonials.map((item) => (

                        <img
                            key={item.id}
                            src={item.image_url}
                            className="
                                rounded-3xl
                                shadow
                                w-full
                            "
                        />

                    ))}

                </div>

            </section>

        </main>
    );
}