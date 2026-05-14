@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Edit Variant
</h1>

<div class="bg-white rounded-2xl shadow p-8">

    <form
        action="{{ route('product-variants.update', $productVariant->id) }}"
        method="POST"
    >

        @csrf
        @method('PUT')

        {{-- PRODUCT --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Product
            </label>

            <select
                name="product_id"
                class="w-full border rounded-xl px-5 py-4"
            >

                @foreach($products as $product)

                    <option
                        value="{{ $product->id }}"
                        @selected($productVariant->product_id == $product->id)
                    >

                        {{ $product->nama }}

                    </option>

                @endforeach

            </select>

        </div>

        {{-- VARIANT NAME --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Variant Name
            </label>

            <input
                type="text"
                name="nama"
                value="{{ $productVariant->nama }}"
                class="w-full border rounded-xl px-5 py-4"
            >

        </div>

        {{-- GB --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                GB
            </label>

            <input
                type="number"
                name="gb"
                value="{{ $productVariant->gb }}"
                class="w-full border rounded-xl px-5 py-4"
            >

        </div>

        {{-- PRICE --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Price
            </label>

            <input
                type="number"
                name="harga"
                value="{{ $productVariant->harga }}"
                class="w-full border rounded-xl px-5 py-4"
            >

        </div>

        {{-- BUTTON --}}
        <button
            class="bg-black text-white px-8 py-4 rounded-xl"
        >
            Update Variant
        </button>

    </form>

</div>

@endsection