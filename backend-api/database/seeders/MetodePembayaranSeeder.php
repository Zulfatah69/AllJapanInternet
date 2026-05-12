<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\MetodePembayaran;

class MetodePembayaranSeeder extends Seeder
{
    public function run(): void
    {
        $metode = [

            'COD',
            'TF',
            'Motobarai',
            'Smartpit',

        ];

        foreach ($metode as $item) {

            MetodePembayaran::updateOrCreate(
                [
                    'nama_metode' => $item
                ]
            );
        }
    }
}