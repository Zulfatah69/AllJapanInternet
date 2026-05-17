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
            Edit Category
        </h1>

        <p class="text-gray-500">
            Update category information
        </p>

    </div>

    <div
        class="
            bg-white
            rounded-3xl
            shadow
            p-10
        "
    >

        <form
            action="{{ route('categories.update', $category->id) }}"
            method="POST"
        >

            @csrf
            @method('PUT')

            {{-- NAME --}}
            <div class="mb-10">

                <label
                    class="
                        block
                        mb-3
                        font-semibold
                    "
                >
                    Category Name
                </label>

                <input
                    type="text"
                    name="nama"
                    value="{{ old('nama', $category->nama) }}"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                >

                @error('nama')

                    <p
                        class="
                            text-red-500
                            mt-2
                            text-sm
                        "
                    >
                        {{ $message }}
                    </p>

                @enderror

            </div>

            {{-- BUTTON --}}
            <div class="flex items-center gap-4">

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
                    Update Category
                </button>

                <a
                    href="{{ route('categories.index') }}"
                    class="
                        border
                        px-8
                        py-4
                        rounded-2xl
                        font-semibold
                    "
                >
                    Cancel
                </a>

            </div>

        </form>

    </div>

</div>

@endsection