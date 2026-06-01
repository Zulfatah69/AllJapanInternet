@extends('layouts.admin')

@section('content')

<div class="flex items-center justify-between mb-10">
    <div>
        <h1 class="text-4xl font-black mb-2">Produk Bulanan</h1>
        <p class="text-gray-500">Kelola produk internet bulanan</p>
    </div>
    <a href="{{ route('monthly-products.create') }}" class="bg-black text-white px-6 py-4 rounded-2xl font-bold">
        + Tambah Produk
    </a>
</div>

<div class="bg-white rounded-3xl shadow overflow-hidden mb-6 p-6">
    <form action="{{ route('monthly-products.index') }}" method="GET" class="flex flex-wrap items-end gap-4">
        <div>
            <label class="block text-sm font-bold mb-2">Kategori</label>
            <select name="category_id" class="border rounded-xl px-4 py-3 min-w-[200px]">
                <option value="">Semua Kategori</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}" {{ request('category_id') == $category->id ? 'selected' : '' }}>
                        {{ $category->nama }}
                    </option>
                @endforeach
            </select>
        </div>
        <div>
            <label class="block text-sm font-bold mb-2">Provider</label>
            <select name="provider_id" class="border rounded-xl px-4 py-3 min-w-[200px]">
                <option value="">Semua Provider</option>
                @foreach($providers as $provider)
                    <option value="{{ $provider->id }}" {{ request('provider_id') == $provider->id ? 'selected' : '' }}>
                        {{ $provider->nama }}
                    </option>
                @endforeach
            </select>
        </div>
        <div>
            <label class="block text-sm font-bold mb-2">Cycle Type</label>
            <select name="cycle_type" class="border rounded-xl px-4 py-3 min-w-[200px]">
                <option value="">Semua Cycle Type</option>
                <option value="VT" {{ request('cycle_type') == 'VT' ? 'selected' : '' }}>VT</option>
                <option value="GJ" {{ request('cycle_type') == 'GJ' ? 'selected' : '' }}>GJ</option>
            </select>
        </div>
        <button type="submit" class="bg-black text-white px-6 py-3 rounded-xl font-bold">Filter</button>
        <a href="{{ route('monthly-products.index') }}" class="border px-6 py-3 rounded-xl font-bold bg-gray-50">Reset</a>
    </form>
</div>

<div class="bg-white rounded-3xl shadow overflow-hidden">
    <table class="w-full">
        <thead class="bg-gray-100 text-left">
            <tr>
                <th class="p-6">Produk</th>
                <th class="p-6">Kategori</th>
                <th class="p-6">Provider</th>
                <th class="p-6 text-center">Status</th>
                <th class="p-6 text-right">Aksi</th>
            </tr>
        </thead>
        <tbody>
            @forelse($products as $product)
                <tr class="border-t">
                    <td class="p-6">
                        <div class="flex items-center gap-4">
                            @if($product->thumbnail)
                                <img src="{{ asset('storage/' . $product->thumbnail) }}" class="w-20 h-20 rounded-2xl object-cover">
                            @endif
                            <div>
                                <h2 class="font-bold">{{ $product->nama }}</h2>
                                @if($product->best_seller)
                                    <span class="inline-block mt-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">Best Seller</span>
                                @endif
                            </div>
                        </div>
                    </td>
                    <td class="p-6">{{ $product->category->nama }}</td>
                    <td class="p-6">
                        {{ $product->provider->nama }} 
                        @if($product->cycle_type)
                            <span class="text-gray-500 text-sm">({{ $product->cycle_type }})</span>
                        @endif
                    </td>
                    <td class="p-6 text-center">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer toggle-active" data-id="{{ $product->id }}" {{ $product->is_active ? 'checked' : '' }}>
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </td>
                    <td class="p-6">
                        <div class="flex justify-end gap-3">
                            <a href="{{ route('monthly-products.edit', $product->id) }}" class="border px-5 py-3 rounded-2xl font-semibold">Edit</a>
                            <form action="{{ route('monthly-products.destroy', $product->id) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button onclick="return confirm('Hapus produk ini?')" class="bg-red-500 text-white px-5 py-3 rounded-2xl font-semibold">Hapus</button>
                            </form>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="p-10 text-center text-gray-400">Tidak ada produk ditemukan</td>
                </tr>
            @endforelse
        </tbody>
    </table>
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