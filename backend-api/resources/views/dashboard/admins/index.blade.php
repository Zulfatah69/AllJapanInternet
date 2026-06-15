@extends('layouts.admin')

@section('content')

<div class="flex items-center justify-between mb-10">
    <div>
        <h1 class="text-4xl font-black mb-2">Admin</h1>
        <p class="text-gray-500">Kelola akun administrator</p>
    </div>
    <a href="{{ route('admins.create') }}" class="bg-black text-white px-6 py-4 rounded-2xl font-bold">
        + Tambah Admin
    </a>
</div>

@if(session('success'))
    <div class="bg-green-100 text-green-700 p-4 rounded-xl mb-6">
        {{ session('success') }}
    </div>
@endif
@if(session('error'))
    <div class="bg-red-100 text-red-700 p-4 rounded-xl mb-6">
        {{ session('error') }}
    </div>
@endif

<div class="bg-white rounded-3xl shadow overflow-hidden">
    <table class="w-full">
        <thead class="bg-gray-100 text-left">
            <tr>
                <th class="p-6">Nama Admin</th>
                <th class="p-6">Email</th>
                <th class="p-6 text-right">Aksi</th>
            </tr>
        </thead>
        <tbody>
            @forelse($admins as $admin)
                <tr class="border-t">
                    <td class="p-6 font-bold">{{ $admin->name }}</td>
                    <td class="p-6 text-gray-500">{{ $admin->email }}</td>
                    <td class="p-6">
                        <div class="flex items-center justify-end gap-3">
                            <a href="{{ route('admins.edit', $admin->id) }}" class="px-5 py-3 rounded-2xl border font-semibold">
                                Edit
                            </a>
                            <form action="{{ route('admins.destroy', $admin->id) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button onclick="return confirm('Hapus admin ini?')" class="px-5 py-3 rounded-2xl bg-red-500 text-white font-semibold">
                                    Hapus
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="3" class="p-10 text-center text-gray-400">Tidak ada admin ditemukan</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

@endsection
