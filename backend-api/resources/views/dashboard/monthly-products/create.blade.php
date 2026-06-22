@extends('layouts.admin')

@section('content')

<div class="max-w-7xl">

    <div class="mb-8 flex items-center justify-between">
        <div>
            <div class="flex items-center gap-2 mb-2 text-sm font-medium text-slate-500">
                <a href="{{ route('monthly-products.index') }}" class="hover:text-indigo-600 transition-colors">Produk Bulanan</a>
                <span>/</span>
                <span class="text-slate-800">Tambah Baru</span>
            </div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Tambah Produk Bulanan</h1>
        </div>
    </div>

    <form
        action="{{ route('monthly-products.store') }}"
        method="POST"
        enctype="multipart/form-data"
    >

        @csrf

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

            <div class="lg:col-span-8 space-y-8">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Informasi Produk
                        </h2>
                    </div>

                    <div class="p-6 space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label class="block mb-2 text-sm font-semibold text-slate-700">Kategori</label>
                                <select name="category_id" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                                    <option value="">Pilih Kategori</option>
                                    @foreach($categories as $category)
                                        <option value="{{ $category->id }}">{{ $category->nama }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div>
                                <label class="block mb-2 text-sm font-semibold text-slate-700">Penyedia (Provider)</label>
                                <select name="provider_id" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                                    <option value="">Pilih Penyedia</option>
                                    @foreach($providers as $provider)
                                        <option value="{{ $provider->id }}">{{ $provider->nama }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-semibold text-slate-700">Nama Produk</label>
                            <input type="text" name="nama" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Masukkan nama produk">
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-semibold text-slate-700">Nama Produk (Inggris)</label>
                            <input type="text" name="nama_en" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Product name in English">
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-semibold text-slate-700">Tipe Siklus (Cycle)</label>
                            <select name="cycle_type" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                                <option value="VT">VT (Tgl 20-28)</option>
                                <option value="GJ">GJ (Tgl 18-24)</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-semibold text-slate-700">Deskripsi</label>
                            <textarea name="deskripsi" rows="4" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Penjelasan tentang produk"></textarea>
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-semibold text-slate-700">Deskripsi (Inggris)</label>
                            <textarea name="deskripsi_en" rows="4" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Product description in English"></textarea>
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-semibold text-slate-700">Thumbnail Produk</label>
                            <x-image-upload name="thumbnail" />
                        </div>

                        <div class="flex items-center gap-3 bg-amber-50 border border-amber-100 p-4 rounded-xl">
                            <input type="checkbox" name="best_seller" value="1" id="best_seller" class="w-5 h-5 rounded text-amber-500 border-amber-300 focus:ring-amber-500">
                            <label for="best_seller" class="font-semibold text-amber-700 cursor-pointer">
                                Tandai sebagai Best Seller
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Variants Section -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            Varian Produk
                        </h2>
                        <button type="button" id="addVariant" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            Tambah Varian
                        </button>
                    </div>

                    <div id="variantContainer" class="p-6 space-y-6"></div>
                </div>
            </div>

            <div class="lg:col-span-4 space-y-8">

                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-8">
                    <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                            Metode Pembayaran
                        </h2>
                    </div>

                    <div class="p-6">
                        <p class="text-sm text-slate-500 mb-6">Tentukan biaya tambahan untuk setiap metode pembayaran.</p>
                        
                        <div class="space-y-4">
                            @php
                                $methods = ['COD', 'TF', 'MOTOBARAI', 'SMARTPIT'];
                            @endphp

                            @foreach($methods as $index => $method)
                                <div class="grid grid-cols-2 gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div>
                                        <span class="font-bold text-slate-700 flex items-center gap-2">
                                            @if($method == 'COD')
                                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                            @elseif($method == 'TF')
                                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                                            @else
                                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            @endif
                                            {{ $method }}
                                        </span>
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-xs font-semibold text-slate-500 uppercase">Harga Tambahan (¥)</label>
                                        <input type="number" name="payment_methods[{{ $index }}][additional_price]" value="0" class="w-full border-slate-200 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white">
                                        <input type="hidden" name="payment_methods[{{ $index }}][nama]" value="{{ $method }}">
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    
                    <div class="p-6 bg-slate-50 border-t border-slate-100">
                        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-bold shadow-sm shadow-indigo-200 transition-colors flex justify-center items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            Simpan Produk
                        </button>
                        <a href="{{ route('monthly-products.index') }}" class="block w-full text-center mt-3 px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors">
                            Batal
                        </a>
                    </div>
                </div>

            </div>

        </div>

    </form>

</div>

<script>

    let variantIndex =
        document.querySelectorAll(
            '#variantContainer > div'
        ).length;

    function addVariant() {

        const currentIndex =
            variantIndex;

        const html = `
            <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5 relative group transition-all hover:border-indigo-300">
                <button type="button" onclick="this.parentElement.remove()" class="absolute top-4 right-4 bg-white text-red-500 border border-red-100 hover:bg-red-50 hover:text-red-600 p-2 rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm opacity-100 transition-opacity">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Hapus
                </button>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2 text-sm font-semibold text-slate-700">Kapasitas (GB / Mbps)</label>
                        <input type="text" name="variants[${currentIndex}][gb]" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Misal: 50 GB">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-semibold text-slate-700">Harga Dasar Bulanan (¥)</label>
                        <input type="number" name="variants[${currentIndex}][monthly_price]" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500" placeholder="0">
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-200">
                    <p class="text-sm font-bold text-slate-700 mb-3">Harga Berdasarkan Siklus Penagihan (Billing Periods)</p>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <label class="block mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Tanggal 1-10</label>
                            <div class="relative">
                                <span class="absolute left-3 top-2.5 text-slate-400 font-medium">¥</span>
                                <input type="number" name="variants[${currentIndex}][billing_periods][1-10]" class="w-full border-slate-200 rounded-lg pl-8 pr-3 py-2 text-center focus:ring-indigo-500 focus:border-indigo-500" placeholder="0">
                            </div>
                        </div>
                        <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <label class="block mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Tanggal 11-19</label>
                            <div class="relative">
                                <span class="absolute left-3 top-2.5 text-slate-400 font-medium">¥</span>
                                <input type="number" name="variants[${currentIndex}][billing_periods][11-19]" class="w-full border-slate-200 rounded-lg pl-8 pr-3 py-2 text-center focus:ring-indigo-500 focus:border-indigo-500" placeholder="0">
                            </div>
                        </div>
                        <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <label class="block mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Tanggal 20-31</label>
                            <div class="relative">
                                <span class="absolute left-3 top-2.5 text-slate-400 font-medium">¥</span>
                                <input type="number" name="variants[${currentIndex}][billing_periods][20-31]" class="w-full border-slate-200 rounded-lg pl-8 pr-3 py-2 text-center focus:ring-indigo-500 focus:border-indigo-500" placeholder="0">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document
            .getElementById(
                'variantContainer'
            )
            .insertAdjacentHTML(
                'beforeend',
                html
            );

        variantIndex++;
    }

    document
        .getElementById('addVariant')
        .addEventListener(
            'click',
            addVariant
        );

</script>

@endsection