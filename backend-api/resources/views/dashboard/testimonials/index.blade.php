@extends('layouts.admin')

@section('content')

<div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
    <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight mb-1">Testimoni</h1>
        <p class="text-slate-500 font-medium">Kelola ulasan dan testimoni pelanggan</p>
    </div>
    <a href="{{ route('testimonials.create') }}" class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors shadow-sm shadow-indigo-200 gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Testimoni
    </a>
</div>

@if($testimonials->isEmpty())
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
        <svg class="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        <h3 class="text-lg font-bold text-slate-800 mb-1">Belum ada testimoni</h3>
        <p class="text-slate-500 mb-6">Mulai tambahkan ulasan pelanggan untuk ditampilkan di website.</p>
        <a href="{{ route('testimonials.create') }}" class="inline-flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-indigo-600 px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm gap-2">
            Tambah Sekarang
        </a>
    </div>
@else
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @foreach($testimonials as $testimonial)
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                
                <div class="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                    @if($testimonial->image)
                        <img src="{{ asset('storage/' . $testimonial->image) }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    @else
                        <div class="w-full h-full flex items-center justify-center text-slate-300">
                            <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                    @endif
                </div>

                <div class="p-5 flex-1 flex flex-col bg-white">
                    <div class="flex items-center gap-2 mt-auto">
                        <a href="{{ route('testimonials.edit', $testimonial->id) }}" class="flex-1 inline-flex justify-center items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-2 rounded-xl text-sm font-semibold transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            Edit
                        </a>
                        <form action="{{ route('testimonials.destroy', $testimonial->id) }}" method="POST" class="flex-1">
                            @csrf
                            @method('DELETE')
                            <button onclick="return confirm('Apakah Anda yakin ingin menghapus testimoni ini?')" class="w-full inline-flex justify-center items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl text-sm font-semibold transition-colors">
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