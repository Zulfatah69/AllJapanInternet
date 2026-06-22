@extends('layouts.admin')

@section('content')

<div class="max-w-3xl">

    <div class="mb-8 flex items-center justify-between">
        <div>
            <div class="flex items-center gap-2 mb-2 text-sm font-medium text-slate-500">
                <a href="{{ route('categories.index') }}" class="hover:text-indigo-600 transition-colors">Kategori</a>
                <span>/</span>
                <span class="text-slate-800">Edit Kategori</span>
            </div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Edit Kategori</h1>
        </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">

        <form action="{{ route('categories.update', $category->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="space-y-6">
                {{-- NAME --}}
                <div>
                    <label class="block mb-2 text-sm font-semibold text-slate-700">
                        Nama Kategori
                    </label>
                    <input type="text" name="nama" value="{{ old('nama', $category->nama) }}" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                    @error('nama')
                        <p class="text-red-500 mt-2 text-sm">{{ $message }}</p>
                    @enderror
                </div>

                {{-- NAME (EN) --}}
                <div>
                    <label class="block mb-2 text-sm font-semibold text-slate-700">
                        Nama Kategori (Inggris)
                    </label>
                    <input type="text" name="nama_en" value="{{ old('nama_en', $category->nama_en) }}" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                    @error('nama_en')
                        <p class="text-red-500 mt-2 text-sm">{{ $message }}</p>
                    @enderror
                </div>

                {{-- SORT ORDER --}}
                <div>
                    <label class="block mb-2 text-sm font-semibold text-slate-700">
                        Urutan (Sort Order)
                    </label>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $category->sort_order) }}" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                    @error('sort_order')
                        <p class="text-red-500 mt-2 text-sm">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            {{-- BUTTON --}}
            <div class="mt-8 flex justify-end gap-4 border-t border-slate-100 pt-6">
                <a href="{{ route('categories.index') }}" class="px-8 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                    Batal
                </a>
                <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-sm shadow-indigo-200 transition-colors">
                    Simpan Perubahan
                </button>
            </div>

        </form>

    </div>

</div>

@endsection