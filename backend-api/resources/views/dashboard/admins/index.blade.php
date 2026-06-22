@extends('layouts.admin')

@section('content')

<div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
    <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight mb-1">Administrator</h1>
        <p class="text-slate-500 font-medium">Kelola akun administrator sistem</p>
    </div>
    <a href="{{ route('admins.create') }}" class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors shadow-sm shadow-indigo-200 gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Admin
    </a>
</div>

@if(session('success'))
    <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
        <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
                <h3 class="text-sm font-semibold text-green-800">{{ session('success') }}</h3>
            </div>
        </div>
    </div>
@endif
@if(session('error'))
    <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
        <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
                <h3 class="text-sm font-semibold text-red-800">{{ session('error') }}</h3>
            </div>
        </div>
    </div>
@endif

<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="bg-slate-50 border-b border-slate-100">
                <tr>
                    <th class="text-left text-xs font-bold text-slate-500 uppercase tracking-wider p-5">Nama Admin</th>
                    <th class="text-left text-xs font-bold text-slate-500 uppercase tracking-wider p-5">Email</th>
                    <th class="text-right text-xs font-bold text-slate-500 uppercase tracking-wider p-5">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @forelse($admins as $admin)
                    <tr class="hover:bg-slate-50/50 transition-colors group">
                        <td class="p-5">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                                    {{ substr($admin->name, 0, 1) }}
                                </div>
                                <div>
                                    <p class="font-bold text-slate-800">{{ $admin->name }}</p>
                                    @if(auth()->id() === $admin->id)
                                        <span class="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Anda</span>
                                    @endif
                                </div>
                            </div>
                        </td>
                        <td class="p-5">
                            <p class="text-slate-600 font-medium">{{ $admin->email }}</p>
                        </td>
                        <td class="p-5 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admins.edit', $admin->id) }}" class="inline-flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg font-semibold transition-colors text-sm gap-1.5" title="Edit">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    Edit
                                </a>
                                @if(auth()->id() !== $admin->id)
                                    <form action="{{ route('admins.destroy', $admin->id) }}" method="POST" class="inline-block">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" onclick="return confirm('Apakah Anda yakin ingin menghapus admin ini?')" class="inline-flex items-center justify-center text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg font-semibold transition-colors text-sm gap-1.5" title="Hapus">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            Hapus
                                        </button>
                                    </form>
                                @endif
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3" class="p-10 text-center">
                            <div class="flex flex-col items-center justify-center text-slate-400">
                                <svg class="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                <p class="text-sm font-medium">Tidak ada admin lain yang ditemukan</p>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

@endsection
