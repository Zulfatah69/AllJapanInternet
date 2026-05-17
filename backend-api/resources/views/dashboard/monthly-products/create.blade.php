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
            Add Monthly Product
        </h1>

        <p class="text-gray-500">
            Create new monthly internet product
        </p>

    </div>

    <form
        action="{{ route('monthly-products.store') }}"
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

                    <label
                        class="
                            block
                            mb-3
                            font-semibold
                        "
                    >
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

                    <label
                        class="
                            block
                            mb-3
                            font-semibold
                        "
                    >
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

                    <label
                        class="
                            block
                            mb-3
                            font-semibold
                        "
                    >
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

                <div>

                    <label
                        class="
                            block
                            mb-2
                            font-semibold
                        "
                    >
                        Cycle Type
                    </label>

                    <select
                        name="cycle_type"
                        class="
                            w-full
                            border
                            rounded-2xl
                            px-5
                            py-4
                        "
                    >

                        <option value="VT">
                            VT (20-28)
                        </option>

                        <option value="GJ">
                            GJ (18-24)
                        </option>

                    </select>

                </div>

                <div class="mb-6">

                    <label
                        class="
                            block
                            mb-3
                            font-semibold
                        "
                    >
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

                    <label
                        class="
                            block
                            mb-3
                            font-semibold
                        "
                    >
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
                            Product Variants
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

                        <div>

                            <label
                                class="
                                    block
                                    mb-3
                                    font-semibold
                                "
                            >
                                COD Price
                            </label>

                            <input
                                type="number"
                                name="payment_methods[0][additional_price]"
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
                                name="payment_methods[0][nama]"
                                value="COD"
                            >

                        </div>

                        <div>

                            <label
                                class="
                                    block
                                    mb-3
                                    font-semibold
                                "
                            >
                                TF Price
                            </label>

                            <input
                                type="number"
                                name="payment_methods[1][additional_price]"
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
                                name="payment_methods[1][nama]"
                                value="TF"
                            >

                        </div>

                        <div>

                            <label
                                class="
                                    block
                                    mb-3
                                    font-semibold
                                "
                            >
                                Motobarai Price
                            </label>

                            <input
                                type="number"
                                name="payment_methods[2][additional_price]"
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
                                name="payment_methods[2][nama]"
                                value="MOTOBARAI"
                            >

                        </div>

                        <div>

                            <label
                                class="
                                    block
                                    mb-3
                                    font-semibold
                                "
                            >
                                Smartpit Price
                            </label>

                            <input
                                type="number"
                                name="payment_methods[3][additional_price]"
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
                                name="payment_methods[3][nama]"
                                value="SMARTPIT"
                            >

                        </div>

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

    let variantIndex =
        document.querySelectorAll(
            '#variantContainer > div'
        ).length;

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
                        GB
                    </label>

                    <input
                        type="text"
                        name="variants[${currentIndex}][gb]"
                        class="
                            w-full
                            border
                            rounded-2xl
                            px-5
                            py-4
                        "
                    >

                </div>
            
                <div>

                    <label class="block mb-2 font-semibold">
                        Monthly Price
                    </label>

                    <input
                        type="number"
                        name="variants[${currentIndex}][monthly_price]"
                        class="
                            w-full
                            border
                            rounded-2xl
                            px-5
                            py-4
                        "
                    >

                </div>

                <div class="grid grid-cols-3 gap-4">

                    <div>

                        <label class="block mb-2 text-sm font-semibold">
                            1-10
                        </label>

                        <input
                            type="number"
                            name="variants[${currentIndex}][billing_periods][1-10]"
                            class="
                                w-full
                                border
                                rounded-2xl
                                px-4
                                py-3
                            "
                        >

                    </div>

                    <div>

                        <label class="block mb-2 text-sm font-semibold">
                            11-19
                        </label>

                        <input
                            type="number"
                            name="variants[${currentIndex}][billing_periods][11-19]"
                            class="
                                w-full
                                border
                                rounded-2xl
                                px-4
                                py-3
                            "
                        >

                    </div>

                    <div>

                        <label class="block mb-2 text-sm font-semibold">
                            20-31
                        </label>

                        <input
                            type="number"
                            name="variants[${currentIndex}][billing_periods][20-31]"
                            class="
                                w-full
                                border
                                rounded-2xl
                                px-4
                                py-3
                            "
                        >

                    </div>

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