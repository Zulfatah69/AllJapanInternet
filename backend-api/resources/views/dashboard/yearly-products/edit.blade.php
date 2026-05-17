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
            Edit Yearly Product
        </h1>

        <p class="text-gray-500">
            Update yearly internet product
        </p>

    </div>

    <form
        action="{{ route('yearly-products.update', $product->id) }}"
        method="POST"
        enctype="multipart/form-data"
    >

        @csrf
        @method('PUT')

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
                                @selected(
                                    $product->category_id
                                    == $category->id
                                )
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
                                @selected(
                                    $product->provider_id
                                    == $provider->id
                                )
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
                        value="{{ $product->nama }}"
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
                    >{{ $product->deskripsi }}</textarea>

                </div>

                @if($product->thumbnail)

                    <div class="mb-6">

                        <img
                            src="{{ asset('storage/' . $product->thumbnail) }}"
                            class="
                                w-64
                                rounded-3xl
                                mb-4
                            "
                        >

                        <a
                            href="{{ route('yearly-products.delete-image', $product->id) }}"
                            onclick="
                                event.preventDefault();

                                if(confirm('Delete image?')) {

                                    document
                                        .getElementById(
                                            'delete-image-form'
                                        )
                                        .submit();
                                }
                            "
                            class="
                                inline-block
                                bg-red-500
                                text-white
                                px-5
                                py-3
                                rounded-2xl
                                font-semibold
                            "
                        >
                            Delete Image
                        </a>

                        <form
                            id="delete-image-form"
                            action="{{ route('yearly-products.delete-image', $product->id) }}"
                            method="POST"
                            class="hidden"
                        >

                            @csrf
                            @method('DELETE')

                        </form>

                    </div>

                @endif

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
                        @checked($product->best_seller)
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
                        class="space-y-8"
                    >

                        @foreach(
                            $product->yearlyVariants
                            as $index => $variant
                        )

                            <div
                                class="
                                    border
                                    rounded-3xl
                                    p-6
                                    space-y-5
                                    relative
                                "
                            >

                                <input
                                    type="hidden"
                                    name="variants[{{ $index }}][id]"
                                    value="{{ $variant->id }}"
                                >

                                <div>

                                    <label
                                        class="
                                            block
                                            mb-2
                                            font-semibold
                                        "
                                    >
                                        Variant Name
                                    </label>

                                    <input
                                        type="text"
                                        name="variants[{{ $index }}][nama]"
                                        value="{{ $variant->nama }}"
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
                                        grid-cols-5
                                        gap-4
                                    "
                                >

                                    @foreach(
                                        $variant->activePeriods
                                        as $period
                                    )

                                        <div>

                                            <label
                                                class="
                                                    block
                                                    mb-2
                                                    text-sm
                                                    font-semibold
                                                "
                                            >
                                                {{ $period->nama }}
                                            </label>

                                            <input
                                                type="number"
                                                name="variants[{{ $index }}][periods][{{ $period->nama }}]"
                                                value="{{ $period->harga }}"
                                                class="
                                                    w-full
                                                    border
                                                    rounded-2xl
                                                    px-4
                                                    py-3
                                                "
                                            >

                                        </div>

                                    @endforeach

                                </div>

                            </div>

                        @endforeach

                    </div>

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

                        @foreach(
                            $product->paymentMethods
                            as $index => $payment
                        )

                            <div>

                                <label
                                    class="
                                        block
                                        mb-3
                                        font-semibold
                                    "
                                >
                                    {{ $payment->nama }}
                                </label>

                                <input
                                    type="number"
                                    name="payment_methods[{{ $index }}][additional_price]"
                                    value="{{ $payment->additional_price }}"
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
                                    value="{{ $payment->nama }}"
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
            Update Product
        </button>

    </form>

</div>

<script>

    let variantIndex =
        {{ count($product->yearlyVariants) }};

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
                        grid-cols-5
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