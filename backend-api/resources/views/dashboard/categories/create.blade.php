@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Add Category
</h1>

<div class="bg-white rounded-2xl shadow p-8 max-w-2xl">

    <form
        action="{{ route('categories.store') }}"
        method="POST"
    >

        @csrf

        <div class="mb-6">

            <label class="block mb-3 font-semibold">
                Category Name
            </label>

            <input
                type="text"
                name="nama"
                class="w-full border rounded-xl px-5 py-4"
                placeholder="Internet Bulanan"
            >

            @error('nama')

                <p class="text-red-500 mt-2">
                    {{ $message }}
                </p>

            @enderror

        </div>

        <button
            class="bg-black text-white px-8 py-4 rounded-xl"
        >
            Save Category
        </button>

    </form>

</div>

@endsection