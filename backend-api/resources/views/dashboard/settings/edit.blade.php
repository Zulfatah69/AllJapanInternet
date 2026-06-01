@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Pengaturan
</h1>

<div class="bg-white rounded-3xl shadow p-10">

    <form action="{{ route('settings.update') }}" method="POST">
        @csrf

        <div class="grid grid-cols-2 gap-8 mb-8">
            <div>
                <label class="block mb-3 font-semibold">WhatsApp</label>
                <input
                    type="text"
                    name="whatsapp"
                    value="{{ $setting->whatsapp }}"
                    class="w-full border rounded-2xl px-5 py-4"
                >
            </div>

            <div>
                <label class="block mb-3 font-semibold">Tema Website</label>
                <select name="theme" class="w-full border rounded-2xl px-5 py-4">
                    <option value="spring" @selected($setting->theme == 'spring')>🌸 Spring</option>
                    <option value="summer" @selected($setting->theme == 'summer')>☀️ Summer</option>
                    <option value="autumn" @selected($setting->theme == 'autumn')>🍁 Autumn</option>
                    <option value="winter" @selected($setting->theme == 'winter')>❄️ Winter</option>
                </select>
            </div>
        </div>

        <button class="bg-black text-white px-8 py-4 rounded-2xl font-semibold">
            Simpan Pengaturan
        </button>
    </form>
</div>

@endsection