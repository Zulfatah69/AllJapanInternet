@extends('layouts.admin')

@section('content')

<div class="max-w-4xl mx-auto">

    <div class="mb-8 flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Pengaturan Website</h1>
            <p class="text-slate-500 font-medium mt-1">Kelola konfigurasi dasar dan tema aplikasi</p>
        </div>
    </div>

    @if (session('success'))
        <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
            <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <h3 class="text-sm font-semibold text-green-800">{{ session('success') }}</h3>
                </div>
            </div>
        </div>
    @endif

    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Konfigurasi Umum
            </h2>
        </div>

        <form action="{{ route('settings.update') }}" method="POST" class="p-6 space-y-6">
            @csrf

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block mb-2 text-sm font-semibold text-slate-700">Nomor WhatsApp</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </div>
                        <input
                            type="text"
                            name="whatsapp"
                            value="{{ old('whatsapp', $setting->whatsapp) }}"
                            class="w-full border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder="Contoh: 6281234567890"
                        >
                    </div>
                    <p class="text-xs text-slate-500 mt-2">Gunakan format internasional tanpa tanda '+' (contoh: 628...)</p>
                </div>

                <div>
                    <label class="block mb-2 text-sm font-semibold text-slate-700">Tema Website</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                        </div>
                        <select name="theme" class="w-full border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none">
                            <option value="spring" @selected(old('theme', $setting->theme) == 'spring')>🌸 Spring (Musim Semi)</option>
                            <option value="summer" @selected(old('theme', $setting->theme) == 'summer')>☀️ Summer (Musim Panas)</option>
                            <option value="autumn" @selected(old('theme', $setting->theme) == 'autumn')>🍁 Autumn (Musim Gugur)</option>
                            <option value="winter" @selected(old('theme', $setting->theme) == 'winter')>❄️ Winter (Musim Dingin)</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pt-6 border-t border-slate-100 flex items-center justify-end">
                <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-sm shadow-indigo-200 transition-colors flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Simpan Pengaturan
                </button>
            </div>
        </form>
    </div>

</div>

@endsection