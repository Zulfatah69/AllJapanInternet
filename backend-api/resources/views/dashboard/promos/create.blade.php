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
                required
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
                required
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