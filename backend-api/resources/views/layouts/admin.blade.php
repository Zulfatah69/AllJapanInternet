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

<body class="bg-slate-50 font-sans antialiased text-slate-800">

<div class="flex min-h-screen">

    <aside
        class="
            w-72
            bg-slate-900
            text-slate-300
            p-8
            flex
            flex-col
            shadow-xl
            z-10
        "
    >

        <div class="mb-10">

            <h1
                class="
                    text-3xl
                    font-black
                    tracking-tight
                    text-white
                "
            >
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">AJI</span> Admin
            </h1>

            <p
                class="
                    text-slate-500
                    text-sm
                    font-medium
                    mt-1
                "
            >
                All Japan Internet
            </p>

        </div>

        <nav class="space-y-2 font-medium">

            <a
                href="{{ route('dashboard') }}"
                class="
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition-colors
                    {{ request()->routeIs('dashboard') ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white' }}
                "
            >
                Dasbor
            </a>

            <a
                href="{{ route('categories.index') }}"
                class="
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition-colors
                    {{ request()->routeIs('categories.*') ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white' }}
                "
            >
                Kategori
            </a>

            <a
                href="{{ route('providers.index') }}"
                class="
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition-colors
                    {{ request()->routeIs('providers.*') ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white' }}
                "
            >
                Penyedia (Providers)
            </a>

            <a
                href="{{ route('monthly-products.index') }}"
                class="
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition-colors
                    {{ request()->routeIs('monthly-products.*') ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white' }}
                "
            >
                Produk Bulanan
            </a>

            <a
                href="{{ route('yearly-products.index') }}"
                class="
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition-colors
                    {{ request()->routeIs('yearly-products.*') ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white' }}
                "
            >
                Produk Tahunan
            </a>
            <a
                href="{{ route('simple-products.index') }}"
                class="
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition-colors
                    {{ request()->routeIs('simple-products.*') ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white' }}
                "
            >
                Produk Wifi
            </a>
            <a
                href="{{ route('testimonials.index') }}"
                class="
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition-colors
                    {{ request()->routeIs('testimonials.*') ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white' }}
                "
            >
                Testimoni
            </a>

            <a
                href="{{ route('promos.index') }}"
                class="
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition-colors
                    {{ request()->routeIs('promos.*') ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white' }}
                "
            >
                Promo
            </a>

            <a
                href="{{ route('settings.edit') }}"
                class="
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition-colors
                    {{ request()->routeIs('settings.*') ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white' }}
                "
            >
                Pengaturan
            </a>

            <a
                href="{{ route('admins.index') }}"
                class="
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition-colors
                    {{ request()->routeIs('admins.*') ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white' }}
                "
            >
                Kelola Admin
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
                        bg-red-500/10
                        text-red-500
                        hover:bg-red-500
                        hover:text-white
                        transition-colors
                        py-3
                        rounded-xl
                        font-bold
                    "
                >
                    Keluar
                </button>

            </form>

        </div>

    </aside>

    <main
        class="
            flex-1
            p-10
            overflow-y-auto
            h-screen
        "
    >
        <div class="max-w-7xl mx-auto">
            @yield('content')
        </div>

    </main>

</div>

</body>
</html>