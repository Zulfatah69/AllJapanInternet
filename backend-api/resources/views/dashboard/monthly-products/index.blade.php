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
            Monthly Products
        </h1>

        <p class="text-gray-500">
            Manage monthly internet products
        </p>

    </div>

    <a
        href="{{ route('monthly-products.create') }}"
        class="
            bg-black
            text-white
            px-6
            py-4
            rounded-2xl
            font-bold
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
                bg-gray-100
                text-left
            "
        >

            <tr>

                <th class="p-6">
                    Product
                </th>

                <th class="p-6">
                    Category
                </th>

                <th class="p-6">
                    Provider
                </th>

                <th class="p-6">
                    Status
                </th>

                <th class="p-6 text-right">
                    Action
                </th>

            </tr>

        </thead>

        <tbody>

            @forelse($products as $product)

                <tr class="border-t">

                    <td class="p-6">

                        <div class="flex items-center gap-4">

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

                                <h2 class="font-bold">

                                    {{ $product->nama }}

                                </h2>

                                @if($product->best_seller)

                                    <span
                                        class="
                                            inline-block
                                            mt-2
                                            bg-red-500
                                            text-white
                                            text-xs
                                            px-3
                                            py-1
                                            rounded-full
                                        "
                                    >
                                        Best Seller
                                    </span>

                                @endif

                            </div>

                        </div>

                    </td>

                    <td class="p-6">

                        {{ $product->category->nama }}

                    </td>

                    <td class="p-6">

                        {{ $product->provider->nama }}

                    </td>

                    <td class="p-6">

                        @if($product->is_active)

                            <span
                                class="
                                    bg-green-100
                                    text-green-700
                                    px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                    font-semibold
                                "
                            >
                                Active
                            </span>

                        @else

                            <span
                                class="
                                    bg-red-100
                                    text-red-700
                                    px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                    font-semibold
                                "
                            >
                                Inactive
                            </span>

                        @endif

                    </td>

                    <td class="p-6">

                        <div
                            class="
                                flex
                                justify-end
                                gap-3
                            "
                        >

                            <a
                                href="{{ route('monthly-products.edit', $product->id) }}"
                                class="
                                    border
                                    px-5
                                    py-3
                                    rounded-2xl
                                    font-semibold
                                "
                            >
                                Edit
                            </a>

                            <form
                                action="{{ route('monthly-products.destroy', $product->id) }}"
                                method="POST"
                            >

                                @csrf
                                @method('DELETE')

                                <button
                                    onclick="
                                        return confirm(
                                            'Delete this product?'
                                        )
                                    "
                                    class="
                                        bg-red-500
                                        text-white
                                        px-5
                                        py-3
                                        rounded-2xl
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
                        colspan="5"
                        class="
                            p-10
                            text-center
                            text-gray-400
                        "
                    >
                        No products found
                    </td>

                </tr>

            @endforelse

        </tbody>

    </table>

</div>

@endsection