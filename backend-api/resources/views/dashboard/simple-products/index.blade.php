@extends('layouts.admin')

@section('content')

<div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
    <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight mb-1">Produk WiFi</h1>
        <p class="text-slate-500 font-medium">Kelola perangkat dan layanan WiFi sederhana</p>
    </div>
    <a href="{{ route('simple-products.create') }}" class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors shadow-sm shadow-indigo-200 gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Produk
    </a>
</div>

@if($products->isEmpty())
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
        <svg class="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
        <h3 class="text-lg font-bold text-slate-800 mb-1">Belum ada produk WiFi</h3>
        <p class="text-slate-500 mb-6">Mulai tambahkan perangkat atau layanan WiFi Anda di sini.</p>
        <a href="{{ route('simple-products.create') }}" class="inline-flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-indigo-600 px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm gap-2">
            Tambah Sekarang
        </a>
    </div>
@else
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        @foreach($products as $product)
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                
                <div class="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    @if($product->gambar)
                        <img src="{{ asset('storage/' . $product->gambar) }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    @else
                        <div class="w-full h-full flex items-center justify-center text-slate-300">
                            <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                    @endif
                </div>

                <div class="p-5 flex-1 flex flex-col">
                    <h2 class="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{{ $product->nama }}</h2>
                    <p class="text-sm text-slate-500 mb-6 line-clamp-2 flex-1">{{ $product->deskripsi ?: 'Tidak ada deskripsi' }}</p>
                    
                    <div class="flex items-center gap-2 pt-4 border-t border-slate-100">
                        <a href="{{ route('simple-products.edit', $product->id) }}" class="flex-1 inline-flex justify-center items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-2 rounded-xl text-sm font-semibold transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            Edit
                        </a>
                        <form action="{{ route('simple-products.destroy', $product->id) }}" method="POST" class="flex-1">
                            @csrf
                            @method('DELETE')
                            <button onclick="return confirm('Apakah Anda yakin ingin menghapus produk ini?')" class="w-full inline-flex justify-center items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl text-sm font-semibold transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                Hapus
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        @endforeach
    </div>
@endif

@endsection