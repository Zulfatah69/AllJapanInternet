@extends('layouts.admin')

@section('content')

<div class="mb-10">
    <h1 class="text-4xl font-black mb-2">Edit Admin</h1>
    <p class="text-gray-500">Ubah data administrator</p>
</div>

<form action="{{ route('admins.update', $admin->id) }}" method="POST" class="bg-white rounded-3xl p-10 shadow max-w-2xl">
    @csrf
    @method('PUT')

    <div class="mb-6">
        <label class="block text-sm font-bold text-gray-700 mb-2">Nama Admin</label>
        <input type="text" name="name" value="{{ old('name', $admin->name) }}" class="w-full bg-gray-50 border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-black" required>
        @error('name')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
    </div>

    <div class="mb-6">
        <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
        <input type="email" name="email" value="{{ old('email', $admin->email) }}" class="w-full bg-gray-50 border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-black" required>
        @error('email')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
    </div>

    <hr class="my-8 border-gray-200">
    <h3 class="font-bold text-lg mb-4">Ubah Password (Opsional)</h3>
    <p class="text-sm text-gray-500 mb-4">Kosongkan jika tidak ingin mengubah password.</p>

    <div class="mb-6">
        <label class="block text-sm font-bold text-gray-700 mb-2">Password Baru</label>
        <input type="password" name="password" class="w-full bg-gray-50 border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-black">
        @error('password')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
    </div>

    <div class="mb-10">
        <label class="block text-sm font-bold text-gray-700 mb-2">Konfirmasi Password Baru</label>
        <input type="password" name="password_confirmation" class="w-full bg-gray-50 border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-black">
    </div>

    <div class="flex items-center gap-4">
        <button type="submit" class="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-900">
            Perbarui
        </button>
        <a href="{{ route('admins.index') }}" class="text-gray-500 font-bold hover:text-black">
            Batal
        </a>
    </div>
</form>

@endsection
