@extends('layouts.admin')

@section('content')

<div class="max-w-4xl mx-auto">

    <div class="mb-8 flex items-center justify-between">
        <div>
            <div class="flex items-center gap-2 mb-2 text-sm font-medium text-slate-500">
                <a href="{{ route('simple-products.index') }}" class="hover:text-indigo-600 transition-colors">Produk WiFi</a>
                <span>/</span>
                <span class="text-slate-800">Edit Produk</span>
            </div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Edit Produk: {{ $product->nama }}</h1>
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
                <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Informasi Produk WiFi
            </h2>
        </div>

        <form action="{{ route('simple-products.update', $product->id) }}" method="POST" enctype="multipart/form-data" class="p-6 space-y-6">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block mb-2 text-sm font-semibold text-slate-700">Nama Produk</label>
                    <input type="text" name="nama" value="{{ old('nama', $product->nama) }}" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Contoh: Router WiFi 5G">
                </div>

                <div>
                    <label class="block mb-2 text-sm font-semibold text-slate-700">Nama Produk (Inggris)</label>
                    <input type="text" name="nama_en" value="{{ old('nama_en', $product->nama_en) }}" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Example: 5G WiFi Router">
                </div>
            </div>

            <div>
                <label class="block mb-2 text-sm font-semibold text-slate-700">Deskripsi Produk</label>
                <textarea name="deskripsi" rows="4" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">{{ old('deskripsi', $product->deskripsi) }}</textarea>
            </div>

            <div>
                <label class="block mb-2 text-sm font-semibold text-slate-700">Deskripsi Produk (Inggris)</label>
                <textarea name="deskripsi_en" rows="4" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">{{ old('deskripsi_en', $product->deskripsi_en) }}</textarea>
            </div>

            <div>
                <label class="block mb-2 text-sm font-semibold text-slate-700">Gambar Produk</label>
                <x-image-upload name="gambar" :existingImage="$product->gambar" />
            </div>

            <div class="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                <a href="{{ route('simple-products.index') }}" class="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
                    Batal
                </a>
                <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-sm shadow-indigo-200 transition-colors flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Simpan Perubahan
                </button>
            </div>

        </form>
    </div>

</div>

@endsection