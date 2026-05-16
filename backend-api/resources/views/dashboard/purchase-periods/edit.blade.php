@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Edit Purchase Period
</h1>

<div class="bg-white rounded-2xl shadow p-8">

    <form
        action="{{ route('purchase-periods.update', $purchasePeriod->id) }}"
        method="POST"
    >

        @csrf
        @method('PUT')

        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Period Name
            </label>

            <input
                type="text"
                name="nama"
                value="{{ $purchasePeriod->nama }}"
                class="w-full border rounded-xl px-5 py-4"
            >

        </div>

        <button
            class="bg-black text-white px-8 py-4 rounded-xl"
        >
            Update Period
        </button>

    </form>

</div>

@endsection