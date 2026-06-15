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
            Edit Provider
        </h1>

        <p class="text-gray-500">
            Update provider information
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
            action="{{ route('providers.update', $provider->id) }}"
            method="POST"
            enctype="multipart/form-data"
        >

            @csrf
            @method('PUT')

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
                    value="{{ old('nama', $provider->nama) }}"
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

            {{-- NAME (EN) --}}
            <div class="mb-8">

                <label
                    class="
                        block
                        mb-3
                        font-semibold
                    "
                >
                    Provider Name (Inggris)
                </label>

                <input
                    type="text"
                    name="nama_en"
                    value="{{ old('nama_en', $provider->nama_en) }}"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                >

                @error('nama_en')

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

            {{-- CURRENT LOGO --}}
            @if($provider->logo)

                <div class="mb-8">

                    <label
                        class="
                            block
                            mb-3
                            font-semibold
                        "
                    >
                        Current Logo
                    </label>

                    <img
                        src="{{ asset('storage/' . $provider->logo) }}"
                        class="
                            w-32
                            h-32
                            rounded-3xl
                            object-cover
                            border
                        "
                    >

                </div>

            @endif

            {{-- LOGO --}}
            <div class="mb-10">

                <label
                    class="
                        block
                        mb-3
                        font-semibold
                    "
                >
                    New Logo
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
                    Update Provider
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