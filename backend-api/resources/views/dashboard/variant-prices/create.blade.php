@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Add Variant Price
</h1>

<div class="bg-white rounded-2xl shadow p-8">

    <form
        action="{{ route('variant-prices.store') }}"
        method="POST"
    >

        @csrf

        {{-- VARIANT --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Variant
            </label>

            <select
                name="product_variant_id"
                class="w-full border rounded-xl px-5 py-4"
            >

                <option value="">
                    Select Variant
                </option>

                @foreach($variants as $variant)

                    <option value="{{ $variant->id }}">

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

                <option value="">
                    Select Period
                </option>

                @foreach($periods as $period)

                    <option value="{{ $period->id }}">

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
                class="w-full border rounded-xl px-5 py-4"
                placeholder="4100"
            >

        </div>

        <button
            class="bg-black text-white px-8 py-4 rounded-xl"
        >
            Save Price
        </button>

    </form>

</div>

@endsection