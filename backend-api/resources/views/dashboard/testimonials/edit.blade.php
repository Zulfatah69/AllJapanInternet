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
            Edit Testimonial
        </h1>

        <p class="text-gray-500">
            Update testimonial image
        </p>

    </div>

    <form
        action="{{ route('testimonials.update', $testimonial->id) }}"
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
        @method('PUT')

        <div class="mb-8">

            <img
                src="{{ asset('storage/' . $testimonial->image) }}"
                class="
                    w-64
                    rounded-3xl
                    mb-6
                "
            >

            <label
                class="
                    block
                    mb-3
                    font-semibold
                "
            >
                Replace Image
            </label>

            <input
                type="file"
                name="image"
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
            Update Testimonial
        </button>

    </form>

</div>

@endsection