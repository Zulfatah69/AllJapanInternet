@extends('layouts.admin')

@section('content')

<div class="flex items-center justify-between mb-10">

    <div>

        <h1 class="text-4xl font-black mb-2">
            Testimonials
        </h1>

        <p class="text-gray-500">
            Manage customer testimonials
        </p>

    </div>

    <a
        href="{{ route('testimonials.create') }}"
        class="
            bg-black
            text-white
            px-6
            py-4
            rounded-2xl
            font-semibold
        "
    >
        + Add Testimonial
    </a>

</div>

<div class="grid grid-cols-4 gap-6">

    @forelse($testimonials as $testimonial)

        <div
            class="
                bg-white
                rounded-3xl
                shadow
                overflow-hidden
            "
        >

            <img
                src="{{ asset('storage/' . $testimonial->image) }}"
                class="
                    w-full
                    h-72
                    object-cover
                "
            >

            <div class="p-5">

                <div class="flex items-center gap-3">

                    <a
                        href="{{ route('testimonials.edit', $testimonial->id) }}"
                        class="
                            bg-yellow-400
                            px-4
                            py-2
                            rounded-xl
                            font-semibold
                        "
                    >
                        Edit
                    </a>

                    <form
                        action="{{ route('testimonials.destroy', $testimonial->id) }}"
                        method="POST"
                    >

                        @csrf
                        @method('DELETE')

                        <button
                            onclick="return confirm('Delete testimonial?')"
                            class="
                                bg-red-500
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                font-semibold
                            "
                        >
                            Delete
                        </button>

                    </form>

                </div>

            </div>

        </div>

    @empty

        <div
            class="
                col-span-4
                bg-white
                rounded-3xl
                shadow
                p-20
                text-center
                text-gray-500
            "
        >
            No testimonials found.
        </div>

    @endforelse

</div>

@endsection