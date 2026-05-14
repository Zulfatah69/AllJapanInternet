@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Add Promo
</h1>

<div class="bg-white rounded-2xl shadow p-8">

    <form
        action="{{ route('promos.store') }}"
        method="POST"
        enctype="multipart/form-data"
    >

        @csrf

        {{-- TITLE --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Title
            </label>

            <input
                type="text"
                name="judul"
                class="w-full border rounded-xl px-5 py-4"
                placeholder="Promo Mei"
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
            ></textarea>

        </div>

        {{-- PROMO DATE --}}
        <div class="grid grid-cols-2 gap-6 mb-8">

            <div>

                <label class="block mb-3 font-semibold">
                    Start Date
                </label>

                <input
                    type="date"
                    name="start_date"
                    class="w-full border rounded-xl px-5 py-4"
                >

            </div>

            <div>

                <label class="block mb-3 font-semibold">
                    End Date
                </label>

                <input
                    type="date"
                    name="end_date"
                    class="w-full border rounded-xl px-5 py-4"
                >

            </div>

        </div>

        {{-- LINK --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Link
            </label>

            <input
                type="text"
                name="link"
                class="w-full border rounded-xl px-5 py-4"
                placeholder="https://..."
            >

        </div>

        {{-- IMAGE --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Image
            </label>

            <input
                type="file"
                name="gambar"
                class="w-full border rounded-xl px-5 py-4"
            >

            <p class="text-sm text-gray-500 mt-2">
                Max size: 2MB
            </p>

        </div>

        <button
            class="bg-black text-white px-8 py-4 rounded-xl"
        >
            Save Promo
        </button>

    </form>

</div>

@endsection