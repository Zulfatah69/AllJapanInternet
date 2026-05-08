<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Produk;
use App\Models\VarianProduk;
use App\Models\PeriodePembelian;

class PeriodePembelianSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            [
                'produk' => 'Kartu Internet Bulanan Softbank',

                'periode' => [

                    [
                        'nama_periode' => 'Tanggal 1 - 10',

                        'tanggal_mulai' => 1,

                        'tanggal_selesai' => 10,

                        'harga_awal' => 3500,
                    ],

                    [
                        'nama_periode' => 'Tanggal 11 - 20',

                        'tanggal_mulai' => 11,

                        'tanggal_selesai' => 20,

                        'harga_awal' => 2500,
                    ],

                    [
                        'nama_periode' => 'Tanggal 21 - 31',

                        'tanggal_mulai' => 21,

                        'tanggal_selesai' => 31,

                        'harga_awal' => 1500,
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

            $varian = VarianProduk::where(
                'produk_id',
                $produk->id
            )->get();

            foreach ($varian as $v) {

                foreach ($item['periode'] as $periode) {

                    PeriodePembelian::updateOrCreate(
                        [

                            'varian_produk_id'
                                => $v->id,

                            'nama_periode'
                                => $periode['nama_periode'],
                        ],
                        [

                            'tanggal_mulai'
                                => $periode['tanggal_mulai'],

                            'tanggal_selesai'
                                => $periode['tanggal_selesai'],

                            'harga_awal'
                                => $periode['harga_awal'],
                        ]
                    );
                }
            }
        }
    }
}