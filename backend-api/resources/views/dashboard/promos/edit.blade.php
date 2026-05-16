@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Edit Promo
</h1>

<div class="bg-white rounded-2xl shadow p-8">

    <form
        action="{{ route('promos.update', $promo->id) }}"
        method="POST"
        enctype="multipart/form-data"
    >

        @csrf
        @method('PUT')

        {{-- TITLE --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Title
            </label>

            <input
                type="text"
                name="judul"
                value="{{ $promo->judul }}"
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
            >{{ $promo->deskripsi }}</textarea>

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
                    value="{{ optional($promo->start_date)->format('Y-m-d') }}"
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
                    value="{{ optional($promo->end_date)->format('Y-m-d') }}"
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
                value="{{ $promo->link }}"
                class="w-full border rounded-xl px-5 py-4"
            >

        </div>

        {{-- OLD IMAGE --}}
        @if($promo->gambar)

            <div class="mb-8">

                <label class="block mb-3 font-semibold">
                    Current Image
                </label>

                <img
                    src="{{ asset('storage/' . $promo->gambar) }}"
                    class="w-40 rounded-2xl border"
                >

            </div>

        @endif

        {{-- IMAGE --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Replace Image
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
            Update Promo
        </button>

    </form>

</div>

@endsection