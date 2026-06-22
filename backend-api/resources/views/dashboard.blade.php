@extends('layouts.admin')

@section('content')

<div class="mb-10">

    <h1
        class="
            text-3xl
            font-black
            tracking-tight
            text-slate-900
            mb-2
        "
    >
        Ringkasan Dasbor
    </h1>

    <p class="text-slate-500 font-medium">
        Ringkasan statistik data All Japan Internet
    </p>

</div>

<div
    class="
        grid
        grid-cols-4
        gap-6
    "
>

    <div
        class="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-100
            p-6
            transition-shadow
            hover:shadow-md
        "
    >

        <p
            class="
                text-slate-500
                font-medium
                mb-2
            "
        >
            Total Produk
        </p>

        <h2
            class="
                text-4xl
                font-black
                text-slate-800
            "
        >
            {{ $totalProducts }}
        </h2>

    </div>

    <div
        class="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-100
            p-6
            transition-shadow
            hover:shadow-md
        "
    >

        <p
            class="
                text-slate-500
                font-medium
                mb-2
            "
        >
            Produk Bulanan
        </p>

        <h2
            class="
                text-4xl
                font-black
                text-blue-600
            "
        >
            {{ $monthlyProducts }}
        </h2>

    </div>

    <div
        class="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-100
            p-6
            transition-shadow
            hover:shadow-md
        "
    >

        <p
            class="
                text-slate-500
                font-medium
                mb-2
            "
        >
            Produk Tahunan
        </p>

        <h2
            class="
                text-4xl
                font-black
                text-teal-600
            "
        >
            {{ $yearlyProducts }}
        </h2>

    </div>

    <div
        class="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-100
            p-6
            transition-shadow
            hover:shadow-md
        "
    >

        <p
            class="
                text-slate-500
                font-medium
                mb-2
            "
        >
            Kategori
        </p>

        <h2
            class="
                text-4xl
                font-black
                text-pink-600
            "
        >
            {{ $totalCategories }}
        </h2>

    </div>

</div>

<div
    class="
        grid
        grid-cols-4
        gap-6
        mt-6
    "
>

    <div
        class="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-100
            p-6
            transition-shadow
            hover:shadow-md
        "
    >

        <p
            class="
                text-slate-500
                font-medium
                mb-2
            "
        >
            Penyedia (Provider)
        </p>

        <h2
            class="
                text-4xl
                font-black
                text-amber-600
            "
        >
            {{ $totalProviders }}
        </h2>

    </div>

    <div
        class="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-100
            p-6
            transition-shadow
            hover:shadow-md
        "
    >

        <p
            class="
                text-slate-500
                font-medium
                mb-2
            "
        >
            Testimoni
        </p>

        <h2
            class="
                text-4xl
                font-black
                text-purple-600
            "
        >
            {{ $totalTestimonials }}
        </h2>

    </div>

    <div
        class="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-100
            p-6
            transition-shadow
            hover:shadow-md
        "
    >

        <p
            class="
                text-slate-500
                font-medium
                mb-2
            "
        >
            Promo
        </p>

        <h2
            class="
                text-4xl
                font-black
                text-red-600
            "
        >
            {{ $totalPromos }}
        </h2>

    </div>

    <div
        class="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-100
            p-6
            transition-shadow
            hover:shadow-md
        "
    >

        <p
            class="
                text-slate-500
                font-medium
                mb-2
            "
        >
            Produk Wifi
        </p>

        <h2
            class="
                text-4xl
                font-black
                text-indigo-600
            "
        >
            {{ $totalWifiProducts }}
        </h2>

    </div>

</div>

@endsection