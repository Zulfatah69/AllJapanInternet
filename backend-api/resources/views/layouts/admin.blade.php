<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="
            width=device-width,
            initial-scale=1.0
        "
    >

    <title>
        AJI Admin
    </title>

    @vite([
        'resources/css/app.css',
        'resources/js/app.js'
    ])

</head>

<body class="bg-gray-100">

<div class="flex min-h-screen">

    <aside
        class="
            w-72
            bg-black
            text-white
            p-8
            flex
            flex-col
        "
    >

        <div class="mb-12">

            <h1
                class="
                    text-4xl
                    font-black
                "
            >
                AJI Admin
            </h1>

            <p
                class="
                    text-gray-400
                    mt-2
                "
            >
                All Japan Internet
            </p>

        </div>

        <nav class="space-y-3">

            <a
                href="{{ route('dashboard') }}"
                class="
                    block
                    px-5
                    py-4
                    rounded-2xl
                    hover:bg-gray-900
                "
            >
                Dashboard
            </a>

            <a
                href="{{ route('categories.index') }}"
                class="
                    block
                    px-5
                    py-4
                    rounded-2xl
                    hover:bg-gray-900
                "
            >
                Categories
            </a>

            <a
                href="{{ route('providers.index') }}"
                class="
                    block
                    px-5
                    py-4
                    rounded-2xl
                    hover:bg-gray-900
                "
            >
                Providers
            </a>

            <a
                href="{{ route('monthly-products.index') }}"
                class="
                    block
                    px-5
                    py-4
                    rounded-2xl
                    hover:bg-gray-900
                "
            >
                Monthly Products
            </a>

            <a
                href="{{ route('yearly-products.index') }}"
                class="
                    block
                    px-5
                    py-4
                    rounded-2xl
                    hover:bg-gray-900
                "
            >
                Yearly Products
            </a>
            <a
                href="{{ route('simple-products.index') }}"
                class="
                    block
                    px-5
                    py-4
                    rounded-2xl
                    hover:bg-gray-900
                "
            >
                Wifi
            </a>
            <a
                href="{{ route('testimonials.index') }}"
                class="
                    block
                    px-5
                    py-4
                    rounded-2xl
                    hover:bg-gray-900
                "
            >
                Testimonials
            </a>

            <a
                href="{{ route('promos.index') }}"
                class="
                    block
                    px-5
                    py-4
                    rounded-2xl
                    hover:bg-gray-900
                "
            >
                Promos
            </a>

            <a
                href="{{ route('settings.edit') }}"
                class="
                    block
                    px-5
                    py-4
                    rounded-2xl
                    hover:bg-gray-900
                "
            >
                Settings
            </a>

        </nav>

        <div class="mt-auto pt-10">

            <form
                action="{{ route('logout') }}"
                method="POST"
            >

                @csrf

                <button
                    class="
                        w-full
                        bg-red-500
                        hover:bg-red-600
                        transition
                        py-4
                        rounded-2xl
                        font-bold
                    "
                >
                    Logout
                </button>

            </form>

        </div>

    </aside>

    <main
        class="
            flex-1
            p-10
        "
    >

        @yield('content')

    </main>

</div>

</body>
</html>