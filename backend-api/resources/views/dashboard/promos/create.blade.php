@extends('layouts.admin')

@section('content')

<div class="max-w-4xl mx-auto">

    <div class="mb-8 flex items-center justify-between">
        <div>
            <div class="flex items-center gap-2 mb-2 text-sm font-medium text-slate-500">
                <a href="{{ route('promos.index') }}" class="hover:text-indigo-600 transition-colors">Promo</a>
                <span>/</span>
                <span class="text-slate-800">Tambah Baru</span>
            </div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Tambah Banner Promo</h1>
        </div>
    </div>

    @if ($errors->any())
        <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <h3 class="text-sm font-semibold text-red-800 mb-1">Terdapat kesalahan pengisian form:</h3>
                    <ul class="list-disc pl-4 text-sm text-red-700 space-y-1">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    @endif

    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Informasi Promo
            </h2>
        </div>

        <form action="{{ route('promos.store') }}" method="POST" enctype="multipart/form-data" class="p-6 space-y-6">
            @csrf

            <div>
                <label class="block mb-2 text-sm font-semibold text-slate-700">Judul Promo</label>
                <input type="text" name="judul" value="{{ old('judul') }}" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Contoh: Promo Spesial Ramadhan" required>
            </div>

            <div>
                <label class="block mb-2 text-sm font-semibold text-slate-700">Banner Promo</label>
                <x-image-upload name="gambar" />
                <p class="text-sm text-slate-500 mt-2 flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Ukuran maksimal 2MB. Format: JPG, PNG, GIF. Direkomendasikan menggunakan aspek rasio horizontal (misal: 16:9).
                </p>
            </div>

            <div class="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                <a href="{{ route('promos.index') }}" class="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
                    Batal
                </a>
                <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-sm shadow-indigo-200 transition-colors flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Simpan Promo
                </button>
            </div>

        </form>
    </div>

</div>

@endsection