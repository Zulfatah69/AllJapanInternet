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
                required
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
                Max size: 2MB. Biarkan kosong jika tidak ingin mengubah gambar.
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