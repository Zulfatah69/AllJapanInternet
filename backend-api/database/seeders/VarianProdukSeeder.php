<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Produk;
use App\Models\VarianProduk;

class VarianProdukSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            [
                'produk' => 'Kartu Internet Bulanan Softbank',

                'varian' => [

                    [
                        'nama_varian' => '35GB',
                        'jumlah_gb' => 35,
                        'harga_bulanan' => 2600,
                    ],

                    [
                        'nama_varian' => '50GB',
                        'jumlah_gb' => 50,
                        'harga_bulanan' => 2700,
                    ],

                    [
                        'nama_varian' => '100GB',
                        'jumlah_gb' => 100,
                        'harga_bulanan' => 3200,
                    ],
                ]
            ],

            [
                'produk' => 'Kartu Internet Bulanan Softbank Jumbo',

                'varian' => [

                    [
                        'nama_varian' => '200GB',
                        'jumlah_gb' => 200,
                        'harga_bulanan' => 4500,
                    ],

                    [
                        'nama_varian' => '300GB',
                        'jumlah_gb' => 300,
                        'harga_bulanan' => 4850,
                    ],
                ]
            ],
        ];

        foreach ($data as $item) {

            $produk = Produk::where(
                'nama_produk',
                $item['produk']
            )->first();

            if (!$produk) {
                continue;
            }

            foreach ($item['varian'] as $varian) {

                VarianProduk::updateOrCreate(
                    [
                        'produk_id' => $produk->id,

                        'nama_varian'
                            => $varian['nama_varian'],
                    ],
                    [

                        'jumlah_gb'
                            => $varian['jumlah_gb'],

                        'harga_bulanan'
                            => $varian['harga_bulanan'],

                        'status_aktif'
                            => true,
                    ]
                );
            }
        }
    }
}