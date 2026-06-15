<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat admin pertama jika belum ada
        if (!User::where('email', 'admin@alljapaninternet.com')->exists()) {
            User::create([
                'name' => 'Master Admin',
                'email' => 'admin@alljapaninternet.com',
                'password' => Hash::make('password123'),
            ]);
        }
    }
}
