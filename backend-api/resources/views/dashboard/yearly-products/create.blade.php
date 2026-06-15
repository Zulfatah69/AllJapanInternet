@extends('layouts.admin')

@section('content')

<div class="max-w-7xl">

    <div class="mb-10">

        <h1
            class="
                text-4xl
                font-black
                mb-2
            "
        >
            Add Yearly Product
        </h1>

        <p class="text-gray-500">
            Create yearly internet product
        </p>

    @if ($errors->any())
        <div class="bg-red-100 border border-red-400 text-red-700 px-5 py-4 rounded-2xl mb-8 font-semibold">
            <ul class="list-disc pl-5 space-y-1">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form
        action="{{ route('yearly-products.store') }}"
        method="POST"
        enctype="multipart/form-data"
    >

        @csrf

        <div class="grid grid-cols-2 gap-8">

            <div
                class="
                    bg-white
                    rounded-3xl
                    shadow
                    p-8
                "
            >

                <h2
                    class="
                        text-2xl
                        font-black
                        mb-8
                    "
                >
                    Product Information
                </h2>

                <div class="mb-6">

                    <label class="block mb-3 font-semibold">
                        Category
                    </label>

                    <select
                        name="category_id"
                        class="
                            w-full
                            border
                            rounded-2xl
                            px-5
                            py-4
                        "
                    >

                        @foreach($categories as $category)

                            <option
                                value="{{ $category->id }}"
                            >

                                {{ $category->nama }}

                            </option>

                        @endforeach

                    </select>

                </div>

                <div class="mb-6">

                    <label class="block mb-3 font-semibold">
                        Provider
                    </label>

                    <select
                        name="provider_id"
                        class="
                            w-full
                            border
                            rounded-2xl
                            px-5
                            py-4
                        "
                    >

                        @foreach($providers as $provider)

                            <option
                                value="{{ $provider->id }}"
                            >

                                {{ $provider->nama }}

                            </option>

                        @endforeach

                    </select>

                </div>

                <div class="mb-6">

                    <label class="block mb-3 font-semibold">
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="nama"
                        class="
                            w-full
                            border
                            rounded-2xl
                            px-5
                            py-4
                        "
                    >

                </div>

                <div class="mb-6">

                    <label class="block mb-3 font-semibold">
                        Product Name (Inggris)
                    </label>

                    <input
                        type="text"
                        name="nama_en"
                        class="
                            w-full
                            border
                            rounded-2xl
                            px-5
                            py-4
                        "
                    >

                </div>

                <div class="mb-6">

                    <label class="block mb-3 font-semibold">
                        Description
                    </label>

                    <textarea
                        name="deskripsi"
                        rows="6"
                        class="
                            w-full
                            border
                            rounded-2xl
                            px-5
                            py-4
                        "
                    ></textarea>

                </div>

                <div class="mb-6">

                    <label class="block mb-3 font-semibold">
                        Description (Inggris)
                    </label>

                    <textarea
                        name="deskripsi_en"
                        rows="6"
                        class="
                            w-full
                            border
                            rounded-2xl
                            px-5
                            py-4
                        "
                    ></textarea>

                </div>

                <div class="mb-6">

                    <label class="block mb-3 font-semibold">
                        Thumbnail
                    </label>

                    <input
                        type="file"
                        name="thumbnail"
                        class="
                            w-full
                            border
                            rounded-2xl
                            px-5
                            py-4
                        "
                    >

                </div>

                <div class="flex items-center gap-3">

                    <input
                        type="checkbox"
                        name="best_seller"
                        value="1"
                        class="
                            w-5
                            h-5
                        "
                    >

                    <label class="font-semibold">
                        Best Seller
                    </label>

                </div>

            </div>

            <div class="space-y-8">

                <div
                    class="
                        bg-white
                        rounded-3xl
                        shadow
                        p-8
                    "
                >

                    <div
                        class="
                            flex
                            items-center
                            justify-between
                            mb-8
                        "
                    >

                        <h2
                            class="
                                text-2xl
                                font-black
                            "
                        >
                            Variants
                        </h2>

                        <button
                            type="button"
                            id="addVariant"
                            class="
                                bg-black
                                text-white
                                px-5
                                py-3
                                rounded-2xl
                                font-semibold
                            "
                        >
                            + Add Variant
                        </button>

                    </div>

                    <div
                        id="variantContainer"
                        class="space-y-6"
                    ></div>

                </div>

                <div
                    class="
                        bg-white
                        rounded-3xl
                        shadow
                        p-8
                    "
                >

                    <h2
                        class="
                            text-2xl
                            font-black
                            mb-8
                        "
                    >
                        Payment Methods
                    </h2>

                    <div class="space-y-6">

                        @php

                            $methods = [

                                'COD',
                                'TF',
                                'MOTOBARAI',
                                'SMARTPIT',

                            ];

                        @endphp

                        @foreach($methods as $index => $method)

                            <div>

                                <label
                                    class="
                                        block
                                        mb-3
                                        font-semibold
                                    "
                                >
                                    {{ $method }}
                                </label>

                                <input
                                    type="number"
                                    name="payment_methods[{{ $index }}][additional_price]"
                                    class="
                                        w-full
                                        border
                                        rounded-2xl
                                        px-5
                                        py-4
                                    "
                                >

                                <input
                                    type="hidden"
                                    name="payment_methods[{{ $index }}][nama]"
                                    value="{{ $method }}"
                                >

                            </div>

                        @endforeach

                    </div>

                </div>

            </div>

        </div>

        <button
            class="
                mt-10
                bg-black
                text-white
                px-10
                py-5
                rounded-3xl
                font-bold
                text-lg
            "
        >
            Save Product
        </button>

    </form>

</div>

<script>

    let variantIndex = 0;

    function addVariant() {

        const currentIndex =
            variantIndex;

        const html = `

            <div
                class="
                    border
                    rounded-3xl
                    p-6
                    space-y-5
                    relative
                "
            >

                <button
                    type="button"
                    onclick="this.parentElement.remove()"
                    class="
                        absolute
                        top-4
                        right-4
                        text-red-500
                        font-bold
                    "
                >
                    ✕
                </button>

                <div>

                    <label class="block mb-2 font-semibold">
                        Variant Name
                    </label>

                    <input
                        type="text"
                        name="variants[${currentIndex}][nama]"
                        placeholder="35GB"
                        class="
                            w-full
                            border
                            rounded-2xl
                            px-5
                            py-4
                        "
                    >

                </div>

                <div
                    class="
                        grid
                        grid-cols-2
                        lg:grid-cols-3
                        gap-4
                    "
                >

                    ${[
                        '13 BULAN',
                        '12 BULAN',
                        '9 BULAN',
                        '6 BULAN',
                        '3 BULAN',
                    ].map(period => `

                        <div>

                            <label
                                class="
                                    block
                                    mb-2
                                    text-sm
                                    font-semibold
                                "
                            >
                                ${period}
                            </label>

                            <input
                                type="number"
                                name="variants[${currentIndex}][periods][${period}]"
                                class="
                                    w-full
                                    border
                                    rounded-2xl
                                    px-4
                                    py-3
                                "
                            >

                        </div>

                    `).join('')}

                </div>

            </div>

        `;

        document
            .getElementById(
                'variantContainer'
            )
            .insertAdjacentHTML(
                'beforeend',
                html
            );

        variantIndex++;
    }

    document
        .getElementById('addVariant')
        .addEventListener(
            'click',
            addVariant
        );

</script>

@endsection