<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Produk;
use App\Models\Provider;
use App\Models\KategoriProduk;

use Illuminate\Support\Str;

class ProdukSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            [
                'nama_produk' => 'Kartu Internet Bulanan Softbank',

                'provider' => 'Softbank',

                'kategori' => 'Kartu Internet Bulanan',

                'kode_pembayaran' => 'VT',

                'tanggal_pembayaran' => '20-28',

                'best_seller' => true,
            ],

            [
                'nama_produk' => 'Kartu Internet Bulanan Softbank Jumbo',

                'provider' => 'Softbank Jumbo',

                'kategori' => 'Kartu Internet Bulanan',

                'kode_pembayaran' => 'VT',

                'tanggal_pembayaran' => '20-28',
            ],

            [
                'nama_produk' => 'Kartu Internet Bulanan Docomo',

                'provider' => 'Docomo',

                'kategori' => 'Kartu Internet Bulanan',

                'kode_pembayaran' => 'GJ',

                'tanggal_pembayaran' => '18-24',
            ],

            [
                'nama_produk' => 'Pocket WiFi Softbank',

                'provider' => 'Softbank',

                'kategori' => 'Pocket WiFi',

                'kode_pembayaran' => 'GJ',

                'tanggal_pembayaran' => '18-24',
            ],

            [
                'nama_produk' => 'E-SIM Softbank',

                'provider' => 'Softbank',

                'kategori' => 'E-SIM',

                'kode_pembayaran' => 'VT',

                'tanggal_pembayaran' => '20-28',
            ],
        ];

        foreach ($data as $item) {

            $provider = Provider::where(
                'nama_provider',
                $item['provider']
            )->first();

            $kategori = KategoriProduk::where(
                'nama_kategori',
                $item['kategori']
            )->first();

            Produk::updateOrCreate(
                [
                    'slug' => Str::slug(
                        $item['nama_produk']
                    )
                ],
                [

                    'kategori_produk_id'
                        => $kategori?->id,

                    'provider_id'
                        => $provider?->id,

                    'nama_produk'
                        => $item['nama_produk'],

                    'slug'
                        => Str::slug(
                            $item['nama_produk']
                        ),

                    'kode_pembayaran'
                        => $item['kode_pembayaran'],

                    'tanggal_pembayaran'
                        => $item['tanggal_pembayaran'],

                    'best_seller'
                        => $item['best_seller'] ?? false,

                    'produk_populer'
                        => true,

                    'tampil_di_home'
                        => true,

                    'status_aktif'
                        => true,
                ]
            );
        }
    }
}