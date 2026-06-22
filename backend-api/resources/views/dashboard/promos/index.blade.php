@extends('layouts.admin')

@section('content')

<div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
    <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight mb-1">Promo</h1>
        <p class="text-slate-500 font-medium">Kelola banner dan penawaran promo</p>
    </div>
    <a href="{{ route('promos.create') }}" class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors shadow-sm shadow-indigo-200 gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Promo
    </a>
</div>

<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    @if($promos->isEmpty())
        <div class="p-12 text-center">
            <svg class="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
            <h3 class="text-lg font-bold text-slate-800 mb-1">Belum ada promo</h3>
            <p class="text-slate-500 mb-6">Mulai tambahkan banner promo untuk ditampilkan ke pelanggan.</p>
            <a href="{{ route('promos.create') }}" class="inline-flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-indigo-600 px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm gap-2">
                Tambah Sekarang
            </a>
        </div>
    @else
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th class="text-left text-xs font-bold text-slate-500 uppercase tracking-wider p-5">Banner Promo</th>
                        <th class="text-left text-xs font-bold text-slate-500 uppercase tracking-wider p-5">Judul</th>
                        <th class="text-right text-xs font-bold text-slate-500 uppercase tracking-wider p-5">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @foreach($promos as $promo)
                        <tr class="hover:bg-slate-50/50 transition-colors group">
                            <td class="p-5 w-48">
                                <div class="relative w-32 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                    @if($promo->gambar)
                                        <img src="{{ asset('storage/' . $promo->gambar) }}" class="w-full h-full object-cover">
                                    @else
                                        <div class="w-full h-full flex items-center justify-center text-slate-400">
                                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                    @endif
                                </div>
                            </td>
                            <td class="p-5">
                                <p class="font-bold text-slate-800">{{ $promo->judul }}</p>
                            </td>
                            <td class="p-5 text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <a href="{{ route('promos.edit', $promo->id) }}" class="inline-flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg font-semibold transition-colors text-sm gap-1.5" title="Edit">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                        Edit
                                    </a>
                                    <form action="{{ route('promos.destroy', $promo->id) }}" method="POST" class="inline-block">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" onclick="return confirm('Apakah Anda yakin ingin menghapus promo ini?')" class="inline-flex items-center justify-center text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg font-semibold transition-colors text-sm gap-1.5" title="Hapus">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            Hapus
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @endif
</div>

@endsection