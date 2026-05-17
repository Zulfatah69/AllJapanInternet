@extends('layouts.admin')

@section('content')

<div
    class="
        flex
        items-center
        justify-between
        mb-10
    "
>

    <div>

        <h1
            class="
                text-4xl
                font-black
                mb-2
            "
        >
            Yearly Products
        </h1>

        <p class="text-gray-500">
            Manage yearly internet products
        </p>

    </div>

    <a
        href="{{ route('yearly-products.create') }}"
        class="
            bg-black
            text-white
            px-6
            py-4
            rounded-2xl
            font-semibold
        "
    >
        + Add Product
    </a>

</div>

<div
    class="
        bg-white
        rounded-3xl
        shadow
        overflow-hidden
    "
>

    <table class="w-full">

        <thead
            class="
                bg-gray-50
                text-left
            "
        >

            <tr>

                <th class="p-6">
                    Product
                </th>

                <th class="p-6">
                    Provider
                </th>

                <th class="p-6">
                    Variants
                </th>

                <th class="p-6">
                    Actions
                </th>

            </tr>

        </thead>

        <tbody>

            @forelse($products as $product)

                <tr class="border-t">

                    <td class="p-6">

                        <div
                            class="
                                flex
                                items-center
                                gap-4
                            "
                        >

                            @if($product->thumbnail)

                                <img
                                    src="{{ asset('storage/' . $product->thumbnail) }}"
                                    class="
                                        w-20
                                        h-20
                                        rounded-2xl
                                        object-cover
                                    "
                                >

                            @endif

                            <div>

                                <h2
                                    class="
                                        font-bold
                                        text-lg
                                    "
                                >
                                    {{ $product->nama }}
                                </h2>

                                <p class="text-gray-500">
                                    {{ $product->category->nama }}
                                </p>

                            </div>

                        </div>

                    </td>

                    <td class="p-6">

                        {{ $product->provider->nama }}

                    </td>

                    <td class="p-6">

                        <div class="space-y-3">

                            @foreach(
                                $product->yearlyVariants
                                as $variant
                            )

                                <div
                                    class="
                                        border
                                        rounded-2xl
                                        p-4
                                    "
                                >

                                    <h3
                                        class="
                                            font-bold
                                            mb-2
                                        "
                                    >
                                        {{ $variant->nama }}
                                    </h3>

                                    <div
                                        class="
                                            flex
                                            flex-wrap
                                            gap-2
                                        "
                                    >

                                        @foreach(
                                            $variant->activePeriods
                                            as $period
                                        )

                                            <span
                                                class="
                                                    bg-gray-100
                                                    px-3
                                                    py-2
                                                    rounded-xl
                                                    text-sm
                                                "
                                            >
                                                {{ $period->nama }}
                                                :
                                                ¥{{ number_format($period->harga) }}
                                            </span>

                                        @endforeach

                                    </div>

                                </div>

                            @endforeach

                        </div>

                    </td>

                    <td class="p-6">

                        <div
                            class="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <a
                                href="{{ route('yearly-products.edit', $product->id) }}"
                                class="
                                    bg-yellow-400
                                    px-4
                                    py-2
                                    rounded-xl
                                    font-semibold
                                "
                            >
                                Edit
                            </a>

                            <form
                                action="{{ route('yearly-products.destroy', $product->id) }}"
                                method="POST"
                            >

                                @csrf
                                @method('DELETE')

                                <button
                                    onclick="return confirm('Delete product?')"
                                    class="
                                        bg-red-500
                                        text-white
                                        px-4
                                        py-2
                                        rounded-xl
                                        font-semibold
                                    "
                                >
                                    Delete
                                </button>

                            </form>

                        </div>

                    </td>

                </tr>

            @empty

                <tr>

                    <td
                        colspan="4"
                        class="
                            p-10
                            text-center
                            text-gray-500
                        "
                    >
                        No yearly products found.
                    </td>

                </tr>

            @endforelse

        </tbody>

    </table>

</div>

@endsection