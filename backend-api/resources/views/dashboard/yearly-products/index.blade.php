@extends('layouts.admin')

@section('content')

<div class="flex items-center justify-between mb-10">
    <div>
        <h1 class="text-4xl font-black mb-2">Produk Tahunan</h1>
        <p class="text-gray-500">Kelola produk internet tahunan</p>
    </div>
    <a href="{{ route('yearly-products.create') }}" class="bg-black text-white px-6 py-4 rounded-2xl font-semibold">
        + Tambah Produk
    </a>
</div>

<div class="bg-white rounded-3xl shadow overflow-hidden mb-6 p-6">
    <form action="{{ route('yearly-products.index') }}" method="GET" class="flex flex-wrap items-end gap-4">
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
        <button type="submit" class="bg-black text-white px-6 py-3 rounded-xl font-bold">Filter</button>
        <a href="{{ route('yearly-products.index') }}" class="border px-6 py-3 rounded-xl font-bold bg-gray-50">Reset</a>
    </form>
</div>

<div class="bg-white rounded-3xl shadow overflow-hidden">
    <table class="w-full">
        <thead class="bg-gray-50 text-left">
            <tr>
                <th class="p-6">Produk</th>
                <th class="p-6">Provider</th>
                <th class="p-6">Varian</th>
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
                                <h2 class="font-bold text-lg">{{ $product->nama }}</h2>
                                <p class="text-gray-500">{{ $product->category->nama }}</p>
                            </div>
                        </div>
                    </td>
                    <td class="p-6">{{ $product->provider->nama }}</td>
                    <td class="p-6">
                        <div class="space-y-3">
                            @foreach($product->variants ?? [] as $variant)
                                <div class="border rounded-2xl p-4">
                                    <h3 class="font-bold mb-2">{{ $variant->nama }}</h3>
                                    <div class="flex flex-wrap gap-2">
                                        @foreach($variant->billingPeriods ?? [] as $period)
                                            @if($period->initial_price > 0)
                                                <span class="bg-gray-100 px-3 py-2 rounded-xl text-sm">
                                                    {{ $period->nama }} : ¥{{ number_format($period->initial_price) }}
                                                </span>
                                            @endif
                                        @endforeach
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </td>
                    <td class="p-6 text-center">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer toggle-active" data-id="{{ $product->id }}" {{ $product->is_active ? 'checked' : '' }}>
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </td>
                    <td class="p-6">
                        <div class="flex justify-end items-center gap-3">
                            <a href="{{ route('yearly-products.edit', $product->id) }}" class="border px-5 py-3 rounded-2xl font-semibold">Edit</a>
                            <form action="{{ route('yearly-products.destroy', $product->id) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button onclick="return confirm('Hapus produk ini?')" class="bg-red-500 text-white px-5 py-3 rounded-2xl font-semibold">Hapus</button>
                            </form>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="p-10 text-center text-gray-500">Tidak ada produk tahunan ditemukan.</td>
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
                
                fetch(`/dashboard/yearly-products/${productId}/toggle-active`, {
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