@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Edit Product
</h1>

<div class="bg-white rounded-2xl shadow p-8">

    <form
        action="{{ route('products.update', $product->id) }}"
        method="POST"
        enctype="multipart/form-data"
    >

        @csrf
        @method('PUT')

        <div class="grid grid-cols-2 gap-8">

            {{-- CATEGORY --}}
            <div>

                <label class="block mb-3 font-semibold">
                    Category
                </label>

                <select
                    name="category_id"
                    class="w-full border rounded-xl px-5 py-4"
                >

                    @foreach($categories as $category)

                        <option
                            value="{{ $category->id }}"
                            @selected($product->category_id == $category->id)
                        >

                            {{ $category->nama }}

                        </option>

                    @endforeach

                </select>

            </div>

            {{-- PROVIDER --}}
            <div>

                <label class="block mb-3 font-semibold">
                    Provider
                </label>

                <input
                    type="text"
                    name="provider"
                    value="{{ $product->provider }}"
                    class="w-full border rounded-xl px-5 py-4"
                >

            </div>

        </div>

        {{-- PRODUCT NAME --}}
        <div class="mt-8">

            <label class="block mb-3 font-semibold">
                Product Name
            </label>

            <input
                type="text"
                name="nama"
                value="{{ $product->nama }}"
                class="w-full border rounded-xl px-5 py-4"
            >

        </div>

        {{-- DESCRIPTION --}}
        <div class="mt-8">

            <label class="block mb-3 font-semibold">
                Description
            </label>

            <textarea
                name="deskripsi"
                rows="6"
                class="w-full border rounded-xl px-5 py-4"
            >{{ $product->deskripsi }}</textarea>

        </div>

        {{-- OLD IMAGE --}}
        @if($product->thumbnail)

            <div class="mt-8">

                <img
                    src="{{ asset('storage/' . $product->thumbnail) }}"
                    class="w-40 rounded-2xl"
                >

            </div>

        @endif

        {{-- THUMBNAIL --}}
        <div class="mt-8">

            <label class="block mb-3 font-semibold">
                Thumbnail
            </label>

            <input
                type="file"
                name="thumbnail"
                class="w-full border rounded-xl px-5 py-4"
            >

        </div>

        {{-- BEST SELLER --}}
        <div class="mt-8 flex items-center gap-3">

            <input
                type="checkbox"
                name="best_seller"
                value="1"
                class="w-5 h-5"
                @checked($product->best_seller)
            >

            <label class="font-semibold">
                Best Seller
            </label>

        </div>

        {{-- BUTTON --}}
        <div class="mt-10">

            <button
                class="bg-black text-white px-8 py-4 rounded-xl"
            >
                Update Product
            </button>

        </div>

    </form>

</div>

@endsection