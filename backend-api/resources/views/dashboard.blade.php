@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">

    Dashboard

</h1>

<div class="grid grid-cols-4 gap-6">

    <div class="bg-white rounded-2xl shadow p-8">

        <p class="text-gray-500 mb-2">

            Total Products

        </p>

        <h2 class="text-5xl font-bold">

            {{ $totalProducts }}

        </h2>

    </div>

    <div class="bg-white rounded-2xl shadow p-8">

        <p class="text-gray-500 mb-2">

            Active Products

        </p>

        <h2 class="text-5xl font-bold text-green-600">

            {{ $activeProducts }}

        </h2>

    </div>

    <div class="bg-white rounded-2xl shadow p-8">

        <p class="text-gray-500 mb-2">

            Categories

        </p>

        <h2 class="text-5xl font-bold">

            {{ $totalCategories }}

        </h2>

    </div>

    <div class="bg-white rounded-2xl shadow p-8">

        <p class="text-gray-500 mb-2">

            Promos

        </p>

        <h2 class="text-5xl font-bold text-pink-500">

            {{ $totalPromos }}

        </h2>

    </div>

</div>

@endsection