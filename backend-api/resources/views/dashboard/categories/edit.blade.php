@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Edit Category
</h1>

<div class="bg-white rounded-2xl shadow p-8 max-w-2xl">

    <form
        action="{{ route('categories.update', $category->id) }}"
        method="POST"
    >

        @csrf
        @method('PUT')

        <div class="mb-6">

            <label class="block mb-3 font-semibold">
                Category Name
            </label>

            <input
                type="text"
                name="nama"
                value="{{ $category->nama }}"
                class="w-full border rounded-xl px-5 py-4"
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
            Update Category
        </button>

    </form>

</div>

@endsection