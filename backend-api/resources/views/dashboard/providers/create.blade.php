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
            Add Provider
        </h1>

        <p class="text-gray-500">
            Create new internet provider
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
            action="{{ route('providers.store') }}"
            method="POST"
            enctype="multipart/form-data"
        >

            @csrf

            {{-- NAME --}}
            <div class="mb-8">

                <label
                    class="
                        block
                        mb-3
                        font-semibold
                    "
                >
                    Provider Name
                </label>

                <input
                    type="text"
                    name="nama"
                    value="{{ old('nama') }}"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                    placeholder="Softbank"
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

            {{-- LOGO --}}
            <div class="mb-10">

                <label
                    class="
                        block
                        mb-3
                        font-semibold
                    "
                >
                    Provider Logo
                </label>

                <input
                    type="file"
                    name="logo"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                >

                @error('logo')

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
                    Save Provider
                </button>

                <a
                    href="{{ route('providers.index') }}"
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