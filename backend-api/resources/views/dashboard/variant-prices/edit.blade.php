@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Edit Variant Price
</h1>

<div class="bg-white rounded-2xl shadow p-8">

    <form
        action="{{ route('variant-prices.update', $variantPrice->id) }}"
        method="POST"
    >

        @csrf
        @method('PUT')

        {{-- VARIANT --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Variant
            </label>

            <select
                name="product_variant_id"
                class="w-full border rounded-xl px-5 py-4"
            >

                @foreach($variants as $variant)

                    <option
                        value="{{ $variant->id }}"
                        @selected(
                            $variantPrice->product_variant_id
                            == $variant->id
                        )
                    >

                        {{ $variant->product->nama }}
                        -
                        {{ $variant->nama }}

                    </option>

                @endforeach

            </select>

        </div>

        {{-- PERIOD --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Purchase Period
            </label>

            <select
                name="purchase_period_id"
                class="w-full border rounded-xl px-5 py-4"
            >

                @foreach($periods as $period)

                    <option
                        value="{{ $period->id }}"
                        @selected(
                            $variantPrice->purchase_period_id
                            == $period->id
                        )
                    >

                        {{ $period->nama }}

                    </option>

                @endforeach

            </select>

        </div>

        {{-- PRICE --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Price
            </label>

            <input
                type="number"
                name="harga"
                value="{{ $variantPrice->harga }}"
                class="w-full border rounded-xl px-5 py-4"
            >

        </div>

        <button
            class="bg-black text-white px-8 py-4 rounded-xl"
        >
            Update Price
        </button>

    </form>

</div>

@endsection