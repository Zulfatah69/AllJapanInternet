@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Edit Shipping Method
</h1>

<div class="bg-white rounded-2xl shadow p-8">

    <form
        action="{{ route('shipping-methods.update', $shippingMethod->id) }}"
        method="POST"
    >

        @csrf
        @method('PUT')

        {{-- NAME --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Name
            </label>

            <input
                type="text"
                name="nama"
                value="{{ $shippingMethod->nama }}"
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
                value="{{ $shippingMethod->harga }}"
                class="w-full border rounded-xl px-5 py-4"
            >

        </div>

        {{-- DESCRIPTION --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Description
            </label>

            <textarea
                name="deskripsi"
                rows="5"
                class="w-full border rounded-xl px-5 py-4"
            >{{ $shippingMethod->deskripsi }}</textarea>

        </div>

        <button
            class="bg-black text-white px-8 py-4 rounded-xl"
        >
            Update Shipping
        </button>

    </form>

</div>

@endsection