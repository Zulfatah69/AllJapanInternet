@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Theme Settings
</h1>

<div class="bg-white rounded-2xl shadow p-8 max-w-2xl">

    <form
        action="{{ route('settings.update') }}"
        method="POST"
    >

        @csrf

        <div class="mb-8">

            <label class="block mb-4 font-semibold">
                Active Theme
            </label>

            <select
                name="theme"
                class="w-full border rounded-xl px-5 py-4"
            >

                <option
                    value="spring"
                    @selected($theme?->value == 'spring')
                >
                    Spring 🌸
                </option>

                <option
                    value="summer"
                    @selected($theme?->value == 'summer')
                >
                    Summer ☀️
                </option>

                <option
                    value="autumn"
                    @selected($theme?->value == 'autumn')
                >
                    Autumn 🍁
                </option>

                <option
                    value="winter"
                    @selected($theme?->value == 'winter')
                >
                    Winter ❄️
                </option>

            </select>

        </div>

        <button
            class="bg-black text-white px-8 py-4 rounded-xl"
        >
            Save Theme
        </button>

    </form>

</div>

@endsection