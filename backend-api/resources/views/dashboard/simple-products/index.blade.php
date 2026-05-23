@extends('layouts.admin')

@section('content')

<div class="max-w-7xl">

    <div
        class="
            flex
            justify-between
            items-center
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
                Wifi
            </h1>

            <p class="text-gray-500">
                Manage Wifi
            </p>

        </div>

        <a
            href="{{ route('simple-products.create') }}"
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
            grid
            grid-cols-3
            gap-8
        "
    >

        @foreach($products as $product)

            <div
                class="
                    bg-white
                    rounded-3xl
                    shadow
                    overflow-hidden
                "
            >

                @if($product->gambar)

                    <img
                        src="{{ asset('storage/' . $product->gambar) }}"
                        class="
                            w-full
                            h-64
                            object-cover
                        "
                    >

                @endif

                <div class="p-6">

                    <h2
                        class="
                            text-2xl
                            font-black
                            mb-3
                        "
                    >
                        {{ $product->nama }}
                    </h2>

                    <p
                        class="
                            text-gray-500
                            mb-6
                        "
                    >
                        {{ $product->deskripsi }}
                    </p>

                    <div class="flex gap-3">

                        <a
                            href="{{ route('simple-products.edit', $product->id) }}"
                            class="
                                bg-yellow-400
                                px-5
                                py-3
                                rounded-2xl
                                font-semibold
                            "
                        >
                            Edit
                        </a>

                        <form
                            action="{{ route('simple-products.destroy', $product->id) }}"
                            method="POST"
                        >

                            @csrf
                            @method('DELETE')

                            <button
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

                </div>

            </div>

        @endforeach

    </div>

</div>

@endsection