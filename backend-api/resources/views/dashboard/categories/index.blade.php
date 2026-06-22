@extends('layouts.admin')

@section('content')

<div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
    <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight mb-1">Kategori</h1>
        <p class="text-slate-500 font-medium">Kelola kategori produk</p>
    </div>
    <a href="{{ route('categories.create') }}" class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors shadow-sm shadow-indigo-200 gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Kategori
    </a>
</div>

<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="bg-slate-50 text-left border-b border-slate-100">
                <tr>
                    <th class="p-5 text-sm font-semibold text-slate-600">Nama Kategori</th>
                    <th class="p-5 text-sm font-semibold text-slate-600">Slug</th>
                    <th class="p-5 text-sm font-semibold text-slate-600">Urutan</th>
                    <th class="p-5 text-sm font-semibold text-slate-600 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @forelse($categories as $category)
                    <tr class="hover:bg-slate-50/50 transition-colors">
                        <td class="p-5 font-bold text-slate-900">
                            {{ $category->nama }}
                        </td>
                        <td class="p-5 text-slate-500 font-mono text-sm">
                            {{ $category->slug }}
                        </td>
                        <td class="p-5 text-slate-700 font-medium">
                            {{ $category->sort_order }}
                        </td>
                        <td class="p-5">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('categories.edit', $category->id) }}" class="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors" title="Edit">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </a>
                                <form action="{{ route('categories.destroy', $category->id) }}" method="POST" class="inline-block">
                                    @csrf
                                    @method('DELETE')
                                    <button onclick="return confirm('Hapus kategori ini?')" class="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Hapus">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4" class="p-12 text-center text-slate-400">
                            <svg class="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                            <p class="font-medium">Belum ada kategori ditemukan</p>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

@endsection