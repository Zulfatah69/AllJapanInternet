@extends('layouts.admin')

@section('content')

<div class="flex items-center justify-between mb-10">

    <h1 class="text-4xl font-bold">
        Categories
    </h1>

    <a
        href="{{ route('categories.create') }}"
        class="bg-black text-white px-6 py-3 rounded-xl"
    >
        Add Category
    </a>

</div>

<div class="bg-white rounded-2xl shadow overflow-hidden">

    <table class="w-full">

        <thead class="bg-gray-100">

            <tr>

                <th class="text-left p-5">
                    Name
                </th>

                <th class="text-left p-5">
                    Slug
                </th>

                <th class="text-right p-5">
                    Action
                </th>

            </tr>

        </thead>

        <tbody>

            @foreach($categories as $category)

                <tr class="border-t">

                    <td class="p-5">
                        {{ $category->nama }}
                    </td>

                    <td class="p-5">
                        {{ $category->slug }}
                    </td>

                    <td class="p-5 text-right">

                        <div class="flex justify-end gap-3">

                            <a
                                href="{{ route('categories.edit', $category->id) }}"
                                class="px-4 py-2 bg-yellow-400 rounded-lg"
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
                                    class="px-4 py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Delete
                                </button>

                            </form>

                        </div>

                    </td>

                </tr>

            @endforeach

        </tbody>

    </table>

</div>

@endsection