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
        Add Wifi
    </h1>

    <form
        action="{{ route('simple-products.store') }}"
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

        <div>

            <label class="block mb-3 font-semibold">
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
            ></textarea>

        </div>

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
            Save Product
        </button>

    </form>

</div>

@endsection