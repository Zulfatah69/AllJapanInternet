<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\KategoriProduk;

use Illuminate\Support\Str;

class KategoriProdukSeeder extends Seeder
{
    public function run(): void
    {
        $kategori = [

            'Kartu Internet Bulanan',

            'E-SIM',

            'Pocket WiFi',

            'Kartu Telepon + Data Internet',

            'Kartu Internet Tahunan',

        ];

        foreach ($kategori as $item) {

            KategoriProduk::updateOrCreate(
                [
                    'slug' => Str::slug($item)
                ],
                [
                    'nama_kategori' => $item,
                ]
            );
        }
    }
}