@extends('layouts.admin')

@section('content')

<div class="flex items-center justify-between mb-10">

    <h1 class="text-4xl font-bold">
        Variant Prices
    </h1>

    <a
        href="{{ route('variant-prices.create') }}"
        class="bg-black text-white px-6 py-3 rounded-xl"
    >
        Add Price
    </a>

</div>

<div class="bg-white rounded-2xl shadow overflow-hidden">

    <table class="w-full">

        <thead class="bg-gray-100">

            <tr>

                <th class="text-left p-5">
                    Product
                </th>

                <th class="text-left p-5">
                    Variant
                </th>

                <th class="text-left p-5">
                    Period
                </th>

                <th class="text-left p-5">
                    Price
                </th>

                <th class="text-right p-5">
                    Action
                </th>

            </tr>

        </thead>

        <tbody>

            @foreach($prices as $price)

                <tr class="border-t">

                    <td class="p-5">

                        {{ $price->variant->product->nama ?? '-' }}

                    </td>

                    <td class="p-5 font-semibold">

                        {{ $price->variant->nama }}

                    </td>

                    <td class="p-5">

                        {{ $price->period->nama }}

                    </td>

                    <td class="p-5">

                        ¥{{ number_format($price->harga) }}

                    </td>

                    <td class="p-5">

                        <div class="flex justify-end gap-3">

                            <a
                                href="{{ route('variant-prices.edit', $price->id) }}"
                                class="px-4 py-2 bg-yellow-400 rounded-lg"
                            >
                                Edit
                            </a>

                            <form
                                action="{{ route('variant-prices.destroy', $price->id) }}"
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