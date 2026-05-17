@extends('layouts.admin')

@section('content')

<div class="mb-10">

    <h1
        class="
            text-4xl
            font-black
            mb-2
        "
    >
        Dashboard
    </h1>

    <p class="text-gray-500">
        All Japan Internet admin overview
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
            rounded-3xl
            shadow
            p-8
        "
    >

        <p
            class="
                text-gray-500
                mb-3
            "
        >
            Total Products
        </p>

        <h2
            class="
                text-5xl
                font-black
            "
        >
            {{ $totalProducts }}
        </h2>

    </div>

    <div
        class="
            bg-white
            rounded-3xl
            shadow
            p-8
        "
    >

        <p
            class="
                text-gray-500
                mb-3
            "
        >
            Monthly Products
        </p>

        <h2
            class="
                text-5xl
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
            rounded-3xl
            shadow
            p-8
        "
    >

        <p
            class="
                text-gray-500
                mb-3
            "
        >
            Yearly Products
        </p>

        <h2
            class="
                text-5xl
                font-black
                text-green-600
            "
        >
            {{ $yearlyProducts }}
        </h2>

    </div>

    <div
        class="
            bg-white
            rounded-3xl
            shadow
            p-8
        "
    >

        <p
            class="
                text-gray-500
                mb-3
            "
        >
            Categories
        </p>

        <h2
            class="
                text-5xl
                font-black
                text-pink-500
            "
        >
            {{ $totalCategories }}
        </h2>

    </div>

</div>

<div
    class="
        grid
        grid-cols-2
        gap-6
        mt-6
    "
>

    <div
        class="
            bg-white
            rounded-3xl
            shadow
            p-8
        "
    >

        <p
            class="
                text-gray-500
                mb-3
            "
        >
            Providers
        </p>

        <h2
            class="
                text-5xl
                font-black
                text-orange-500
            "
        >
            {{ $totalProviders }}
        </h2>

    </div>

    <div
        class="
            bg-white
            rounded-3xl
            shadow
            p-8
        "
    >

        <p
            class="
                text-gray-500
                mb-3
            "
        >
            Testimonials
        </p>

        <h2
            class="
                text-5xl
                font-black
                text-purple-600
            "
        >
            {{ $totalTestimonials }}
        </h2>

    </div>

</div>

@endsection