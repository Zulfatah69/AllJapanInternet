@extends('layouts.admin')

@section('content')

<div class="flex items-center justify-between mb-10">

    <h1 class="text-4xl font-bold">
        Products
    </h1>

    <a
        href="{{ route('products.create') }}"
        class="bg-black text-white px-6 py-3 rounded-xl"
    >
        Add Product
    </a>

</div>

<div class="bg-white rounded-2xl shadow overflow-hidden">

    <table class="w-full">

        <thead class="bg-gray-100">

            <tr>

                <th class="text-left p-5">
                    Image
                </th>

                <th class="text-left p-5">
                    Product
                </th>

                <th class="text-left p-5">
                    Category
                </th>

                <th class="text-left p-5">
                    Provider
                </th>

                <th class="text-left p-5">
                    Code
                </th>

                <th class="text-left p-5">
                    Type
                </th>

                <th class="text-left p-5">
                    Billing
                </th>

                <th class="text-left p-5">
                    Best Seller
                </th>

                <th class="text-left p-5">
                    Status
                </th>

                <th class="text-right p-5">
                    Action
                </th>

            </tr>

        </thead>

        <tbody>

            @foreach($products as $product)

                <tr class="border-t">

                    <td class="p-5">

                        @if($product->thumbnail)

                            <img
                                src="{{ asset('storage/' . $product->thumbnail) }}"
                                class="w-20 h-20 object-cover rounded-xl"
                            >

                        @else

                            <div class="w-20 h-20 bg-gray-200 rounded-xl"></div>

                        @endif

                    </td>

                    <td class="p-5 font-semibold">
                        {{ $product->nama }}
                    </td>

                    <td class="p-5">
                        {{ $product->category->nama ?? '-' }}
                    </td>

                    <td class="p-5">
                        {{ $product->provider }}
                    </td>

                    <td class="p-5">
                        {{ $product->code ?? '-' }}
                    </td>

                    <td class="p-5">
                        {{ $product->type ?? '-' }}
                    </td>

                    <td class="p-5">
                        {{ $product->billing_type ?? '-' }}
                    </td>

                    <td class="p-5">

                        @if($product->best_seller)

                            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                Yes
                            </span>

                        @else

                            <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                No
                            </span>

                        @endif

                    </td>

                    <td class="p-5">

                        @if($product->is_active)

                            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                Active
                            </span>

                        @else

                            <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                Inactive
                            </span>

                        @endif

                    </td>

                    <td class="p-5">

                        <div class="flex justify-end gap-3 flex-wrap">

                            <form
                                action="{{ route('products.toggle', $product->id) }}"
                                method="POST"
                            >

                                @csrf
                                @method('PATCH')

                                <button
                                    class="px-4 py-2 rounded-lg
                                    {{ $product->is_active
                                        ? 'bg-yellow-400'
                                        : 'bg-green-500 text-white'
                                    }}"
                                >

                                    {{ $product->is_active
                                        ? 'Deactivate'
                                        : 'Activate'
                                    }}

                                </button>

                            </form>

                            <a
                                href="{{ route('products.edit', $product->id) }}"
                                class="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                            >
                                Edit
                            </a>

                            <form
                                action="{{ route('products.destroy', $product->id) }}"
                                method="POST"
                            >

                                @csrf
                                @method('DELETE')

                                <button
                                    class="px-4 py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Delete
                                </button>

                            </form>

                        </div>

                    </td>

                </tr>

            @endforeach

        </tbody>

    </table>

</div>

@endsection