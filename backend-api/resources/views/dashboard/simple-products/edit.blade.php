@extends('layouts.admin')

@section('content')

<div class="max-w-4xl">

    <h1
        class="
            text-4xl
            font-black
            mb-10
        "
    >
        Edit Wifi
    </h1>

    <form
        action="{{ route('simple-products.update', $product->id) }}"
        method="POST"
        enctype="multipart/form-data"
        class="
            bg-white
            rounded-3xl
            shadow
            p-10
            space-y-6
        "
    >

        @csrf
        @method('PUT')

        <div>

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

        <div>

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

        @if($product->gambar)

            <img
                src="{{ asset('storage/' . $product->gambar) }}"
                class="
                    w-64
                    rounded-3xl
                "
            >

        @endif

        <div>

            <label class="block mb-3 font-semibold">
                Image
            </label>

            <input
                type="file"
                name="gambar"
                class="
                    w-full
                    border
                    rounded-2xl
                    px-5
                    py-4
                "
            >

        </div>

        <button
            class="
                bg-black
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
            "
        >
            Update Product
        </button>

    </form>

</div>

@endsection