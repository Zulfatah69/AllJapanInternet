@extends('layouts.admin')

@section('content')

<div class="flex items-center justify-between mb-10">

    <h1 class="text-4xl font-bold">
        Promos
    </h1>

    <a
        href="{{ route('promos.create') }}"
        class="bg-black text-white px-6 py-3 rounded-xl"
    >
        Add Promo
    </a>

</div>

<div class="bg-white rounded-2xl shadow overflow-hidden">

    <table class="w-full">

        <thead class="bg-gray-100">

            <tr>

                <th class="text-left p-5">
                    Image
                </th>

                <th class="text-left p-5">
                    Title
                </th>

                <th class="text-left p-5">
                    Link
                </th>

                <th class="text-right p-5">
                    Action
                </th>

            </tr>

        </thead>

        <tbody>

            @foreach($promos as $promo)

                <tr class="border-t">

                    <td class="p-5">

                        @if($promo->gambar)

                            <img
                                src="{{ asset('storage/' . $promo->gambar) }}"
                                class="w-32 h-20 object-cover rounded-xl"
                            >

                        @endif

                    </td>

                    <td class="p-5 font-semibold">
                        {{ $promo->judul }}
                    </td>

                    <td class="p-5">
                        {{ $promo->link }}
                    </td>

                    <td class="p-5">

                        <div class="flex justify-end gap-3">

                            <a
                                href="{{ route('promos.edit', $promo->id) }}"
                                class="px-4 py-2 bg-yellow-400 rounded-lg"
                            >
                                Edit
                            </a>

                            <form
                                action="{{ route('promos.destroy', $promo->id) }}"
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