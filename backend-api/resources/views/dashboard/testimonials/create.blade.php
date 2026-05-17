@extends('layouts.admin')

@section('content')

<div class="max-w-3xl">

    <div class="mb-10">

        <h1
            class="
                text-4xl
                font-black
                mb-2
            "
        >
            Add Testimonial
        </h1>

        <p class="text-gray-500">
            Upload customer testimonial
        </p>

    </div>

    <form
        action="{{ route('testimonials.store') }}"
        method="POST"
        enctype="multipart/form-data"
        class="
            bg-white
            rounded-3xl
            shadow
            p-8
        "
    >

        @csrf

        <div class="mb-8">

            <label
                class="
                    block
                    mb-3
                    font-semibold
                "
            >
                Testimonial Image
            </label>

            <input
                type="file"
                name="image"
                required
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
            Save Testimonial
        </button>

    </form>

</div>

@endsection