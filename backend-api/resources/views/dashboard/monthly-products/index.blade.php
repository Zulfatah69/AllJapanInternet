@extends('layouts.admin')

@section('content')

<div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
    <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight mb-1">Produk Bulanan</h1>
        <p class="text-slate-500 font-medium">Kelola data produk internet bulanan Anda</p>
    </div>
    <a href="{{ route('monthly-products.create') }}" class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors shadow-sm shadow-indigo-200 gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Produk
    </a>
</div>

<div class="bg-white rounded-2xl shadow-sm border border-slate-100 mb-8 p-6">
    <form action="{{ route('monthly-products.index') }}" method="GET" class="flex flex-wrap items-end gap-5">
        <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-semibold text-slate-700 mb-2">Kategori</label>
            <select name="category_id" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Semua Kategori</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}" {{ request('category_id') == $category->id ? 'selected' : '' }}>
                        {{ $category->nama }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-semibold text-slate-700 mb-2">Penyedia (Provider)</label>
            <select name="provider_id" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Semua Provider</option>
                @foreach($providers as $provider)
                    <option value="{{ $provider->id }}" {{ request('provider_id') == $provider->id ? 'selected' : '' }}>
                        {{ $provider->nama }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="flex-1 min-w-[150px]">
            <label class="block text-sm font-semibold text-slate-700 mb-2">Siklus (Cycle)</label>
            <select name="cycle_type" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Semua Siklus</option>
                <option value="VT" {{ request('cycle_type') == 'VT' ? 'selected' : '' }}>VT</option>
                <option value="GJ" {{ request('cycle_type') == 'GJ' ? 'selected' : '' }}>GJ</option>
            </select>
        </div>
        <div class="flex items-center gap-3">
            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Terapkan Filter</button>
            <a href="{{ route('monthly-products.index') }}" class="border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-semibold transition-colors">Reset</a>
        </div>
    </form>
</div>

<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="bg-slate-50 text-left border-b border-slate-100">
                <tr>
                    <th class="p-5 text-sm font-semibold text-slate-600">Info Produk</th>
                    <th class="p-5 text-sm font-semibold text-slate-600">Kategori</th>
                    <th class="p-5 text-sm font-semibold text-slate-600">Penyedia</th>
                    <th class="p-5 text-sm font-semibold text-slate-600 text-center">Status</th>
                    <th class="p-5 text-sm font-semibold text-slate-600 text-right">Aksi</th>
                </tr>
            </thead>
        <tbody class="divide-y divide-slate-100">
            @forelse($products as $product)
                <tr class="hover:bg-slate-50/50 transition-colors">
                    <td class="p-5">
                        <div class="flex items-center gap-4">
                            @if($product->thumbnail)
                                <img src="{{ asset('storage/' . $product->thumbnail) }}" class="w-14 h-14 rounded-xl object-cover border border-slate-200">
                            @else
                                <div class="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                                    <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>
                            @endif
                            <div>
                                <h2 class="font-bold text-slate-900">{{ $product->nama }}</h2>
                                @if($product->best_seller)
                                    <span class="inline-block mt-1 bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">Best Seller</span>
                                @endif
                            </div>
                        </div>
                    </td>
                    <td class="p-5">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                            {{ $product->category->nama }}
                        </span>
                    </td>
                    <td class="p-5 font-medium text-slate-700">
                        {{ $product->provider->nama }} 
                        @if($product->cycle_type)
                            <span class="text-slate-400 text-sm ml-1">({{ $product->cycle_type }})</span>
                        @endif
                    </td>
                    <td class="p-5 text-center">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer toggle-active" data-id="{{ $product->id }}" {{ $product->is_active ? 'checked' : '' }}>
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </td>
                    <td class="p-5">
                        <div class="flex justify-end gap-2">
                            <a href="{{ route('monthly-products.edit', $product->id) }}" class="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors" title="Edit">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </a>
                            <form action="{{ route('monthly-products.destroy', $product->id) }}" method="POST" class="inline-block">
                                @csrf
                                @method('DELETE')
                                <button onclick="return confirm('Apakah Anda yakin ingin menghapus produk ini?')" class="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Hapus">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="p-12 text-center text-slate-400">
                        <svg class="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                        <p class="font-medium">Belum ada produk bulanan yang ditambahkan</p>
                    </td>
                </tr>
            @endforelse
        </tbody>
        </table>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const toggles = document.querySelectorAll('.toggle-active');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', function() {
                const productId = this.getAttribute('data-id');
                const isChecked = this.checked;
                
                fetch(`/dashboard/monthly-products/${productId}/toggle-active`, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if(!data.success) {
                        this.checked = !isChecked; // revert
                        alert('Gagal mengubah status');
                    }
                })
                .catch(error => {
                    console.error(error);
                    this.checked = !isChecked; // revert
                    alert('Terjadi kesalahan');
                });
            });
        });
    });
</script>

@endsection