<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Admin Panel</title>

    @vite([
        'resources/css/app.css',
        'resources/js/app.js'
    ])

</head>

<body class="bg-gray-100">

    <div class="min-h-screen flex">

        {{-- SIDEBAR --}}
        <aside class="w-64 bg-black text-white p-6">

            <h1 class="text-2xl font-bold mb-10">
                AJI Admin
            </h1>

            <nav class="space-y-3">

                <a
                    href="/dashboard"
                    class="block px-4 py-3 rounded hover:bg-gray-800"
                >
                    Dashboard
                </a>

                <a
                    href="/dashboard/categories"
                    class="block px-4 py-3 rounded hover:bg-gray-800"
                >
                    Categories
                </a>

                <a
                    href="/dashboard/products"
                    class="block px-4 py-3 rounded hover:bg-gray-800"
                >
                    Products
                </a>
                <a
                    href="/dashboard/product-variants"
                    class="block px-4 py-3 rounded hover:bg-gray-800"
                >
                    Product Variants
                </a>
                <a
                    href="/dashboard/shipping-methods"
                    class="block px-4 py-3 rounded hover:bg-gray-800"
                >
                    Shipping Methods
                </a>
                <a
                    href="/dashboard/purchase-periods"
                    class="block px-4 py-3 rounded hover:bg-gray-800"
                >
                    Purchase Periods
                </a>

                <a
                    href="/dashboard/variant-prices"
                    class="block px-4 py-3 rounded hover:bg-gray-800"
                >
                    Variant Prices
                </a>

                <a
                    href="/dashboard/promos"
                    class="block px-4 py-3 rounded hover:bg-gray-800"
                >
                    Promos
                </a>
                <a
                    href="/dashboard/settings"
                    class="block px-4 py-3 rounded hover:bg-gray-800"
                >
                    Theme Settings
                </a>
                <form
                    method="POST"
                    action="{{ route('logout') }}"
                    class="mt-10"
                >

                    @csrf

                    <button
                        type="submit"
                        class="w-full text-left px-4 py-3 rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>

                </form>
            </nav>

        </aside>

        {{-- CONTENT --}}
        <main class="flex-1 p-10">

            @yield('content')

        </main>

    </div>

</body>
</html>