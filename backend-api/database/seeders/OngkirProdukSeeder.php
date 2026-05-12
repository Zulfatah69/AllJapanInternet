<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Produk;
use App\Models\MetodePembayaran;
use App\Models\OngkirProduk;

class OngkirProdukSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            [
                'produk' => 'Kartu Internet Bulanan Softbank',

                'ongkir' => [

                    [
                        'metode' => 'COD',

                        'harga_ongkir' => 700,
                    ],

                    [
                        'metode' => 'TF',

                        'harga_ongkir' => 0,
                    ],

                    [
                        'metode' => 'Motobarai',

                        'harga_ongkir' => 520,
                    ],
                ]
            ],

            [
                'produk' => 'E-SIM Softbank',

                'ongkir' => [

                    [
                        'metode' => 'TF',

                        'harga_ongkir' => 0,
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

            foreach ($item['ongkir'] as $ongkir) {

                $metode = MetodePembayaran::where(
                    'nama_metode',
                    $ongkir['metode']
                )->first();

                if (!$metode) {
                    continue;
                }

                OngkirProduk::updateOrCreate(
                    [

                        'produk_id'
                            => $produk->id,

                        'metode_pembayaran_id'
                            => $metode->id,
                    ],
                    [

                        'harga_ongkir'
                            => $ongkir['harga_ongkir'],
                    ]
                );
            }
        }
    }
}