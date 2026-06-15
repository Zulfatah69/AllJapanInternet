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
            Categories
        </h1>

        <p class="text-gray-500">
            Manage product categories
        </p>

    </div>

    <a
        href="{{ route('categories.create') }}"
        class="
            bg-black
            text-white
            px-6
            py-4
            rounded-2xl
            font-bold
        "
    >
        + Add Category
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
                    Category Name
                </th>

                <th class="p-6">
                    Slug
                </th>

                <th class="p-6">
                    Urutan
                </th>

                <th class="p-6 text-right">
                    Action
                </th>

            </tr>

        </thead>

        <tbody>

            @forelse($categories as $category)

                <tr class="border-t">

                    <td class="p-6 font-bold">

                        {{ $category->nama }}

                    </td>

                    <td class="p-6 text-gray-500">

                        {{ $category->slug }}

                    </td>

                    <td class="p-6">
                        {{ $category->sort_order }}
                    </td>

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
                                href="{{ route('categories.edit', $category->id) }}"
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
                                action="{{ route('categories.destroy', $category->id) }}"
                                method="POST"
                            >

                                @csrf
                                @method('DELETE')

                                <button
                                    onclick="
                                        return confirm(
                                            'Delete this category?'
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
                        colspan="3"
                        class="
                            p-10
                            text-center
                            text-gray-400
                        "
                    >
                        No categories found
                    </td>

                </tr>

            @endforelse

        </tbody>

    </table>

</div>

@endsection