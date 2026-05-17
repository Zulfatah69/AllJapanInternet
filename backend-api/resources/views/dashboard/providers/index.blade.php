@extends('layouts.admin')

@section('content')

<div
    class="
        flex
        items-center
        justify-between
        mb-10
    "
>

    <div>

        <h1
            class="
                text-4xl
                font-black
                mb-2
            "
        >
            Providers
        </h1>

        <p class="text-gray-500">
            Manage internet providers
        </p>

    </div>

    <a
        href="{{ route('providers.create') }}"
        class="
            bg-black
            text-white
            px-6
            py-4
            rounded-2xl
            font-bold
        "
    >
        + Add Provider
    </a>

</div>

<div
    class="
        bg-white
        rounded-3xl
        shadow
        overflow-hidden
    "
>

    <table class="w-full">

        <thead
            class="
                bg-gray-100
                text-left
            "
        >

            <tr>

                <th class="p-6">
                    Logo
                </th>

                <th class="p-6">
                    Provider Name
                </th>

                <th class="p-6">
                    Slug
                </th>

                <th class="p-6 text-right">
                    Action
                </th>

            </tr>

        </thead>

        <tbody>

            @forelse($providers as $provider)

                <tr class="border-t">

                    {{-- LOGO --}}
                    <td class="p-6">

                        @if($provider->logo)

                            <img
                                src="{{ asset('storage/' . $provider->logo) }}"
                                class="
                                    w-16
                                    h-16
                                    rounded-2xl
                                    object-cover
                                "
                            >

                        @else

                            <div
                                class="
                                    w-16
                                    h-16
                                    rounded-2xl
                                    bg-gray-100
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-400
                                    text-sm
                                "
                            >
                                No Logo
                            </div>

                        @endif

                    </td>

                    {{-- NAME --}}
                    <td class="p-6 font-bold">

                        {{ $provider->nama }}

                    </td>

                    {{-- SLUG --}}
                    <td class="p-6 text-gray-500">

                        {{ $provider->slug }}

                    </td>

                    {{-- ACTION --}}
                    <td class="p-6">

                        <div
                            class="
                                flex
                                items-center
                                justify-end
                                gap-3
                            "
                        >

                            <a
                                href="{{ route('providers.edit', $provider->id) }}"
                                class="
                                    px-5
                                    py-3
                                    rounded-2xl
                                    border
                                    font-semibold
                                "
                            >
                                Edit
                            </a>

                            <form
                                action="{{ route('providers.destroy', $provider->id) }}"
                                method="POST"
                            >

                                @csrf
                                @method('DELETE')

                                <button
                                    onclick="
                                        return confirm(
                                            'Delete this provider?'
                                        )
                                    "
                                    class="
                                        px-5
                                        py-3
                                        rounded-2xl
                                        bg-red-500
                                        text-white
                                        font-semibold
                                    "
                                >
                                    Delete
                                </button>

                            </form>

                        </div>

                    </td>

                </tr>

            @empty

                <tr>

                    <td
                        colspan="4"
                        class="
                            p-10
                            text-center
                            text-gray-400
                        "
                    >
                        No providers found
                    </td>

                </tr>

            @endforelse

        </tbody>

    </table>

</div>

@endsection