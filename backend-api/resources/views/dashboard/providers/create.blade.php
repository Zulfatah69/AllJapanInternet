@extends('layouts.admin')

@section('content')

<div class="max-w-3xl">

    <div class="mb-8 flex items-center justify-between">
        <div>
            <div class="flex items-center gap-2 mb-2 text-sm font-medium text-slate-500">
                <a href="{{ route('providers.index') }}" class="hover:text-indigo-600 transition-colors">Penyedia Layanan</a>
                <span>/</span>
                <span class="text-slate-800">Tambah Baru</span>
            </div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Tambah Penyedia</h1>
        </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">

        <form action="{{ route('providers.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="space-y-6">
                {{-- NAME --}}
                <div>
                    <label class="block mb-2 text-sm font-semibold text-slate-700">
                        Nama Penyedia Layanan
                    </label>
                    <input type="text" name="nama" value="{{ old('nama') }}" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Softbank">
                    @error('nama')
                        <p class="text-red-500 mt-2 text-sm">{{ $message }}</p>
                    @enderror
                </div>

                {{-- NAME (EN) --}}
                <div>
                    <label class="block mb-2 text-sm font-semibold text-slate-700">
                        Nama Penyedia Layanan (Inggris)
                    </label>
                    <input type="text" name="nama_en" value="{{ old('nama_en') }}" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Softbank">
                    @error('nama_en')
                        <p class="text-red-500 mt-2 text-sm">{{ $message }}</p>
                    @enderror
                </div>

                {{-- LOGO --}}
                <div>
                    <label class="block mb-2 text-sm font-semibold text-slate-700">
                        Logo Penyedia Layanan
                    </label>
                    <x-image-upload name="logo" />
                    @error('logo')
                        <p class="text-red-500 mt-2 text-sm">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            {{-- BUTTON --}}
            <div class="mt-8 flex justify-end gap-4 border-t border-slate-100 pt-6">
                <a href="{{ route('providers.index') }}" class="px-8 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                    Batal
                </a>
                <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-sm shadow-indigo-200 transition-colors">
                    Simpan Penyedia
                </button>
            </div>

        </form>

    </div>

</div>

@endsection