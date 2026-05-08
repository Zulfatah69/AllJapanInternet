<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\SeoPage;

class SeoPageSeeder extends Seeder
{
    public function run(): void
    {
        SeoPage::updateOrCreate(
            ['halaman' => 'home'],
            [
                'meta_title'
                    => 'AllJapanInternet - SIM Card & Pocket WiFi Jepang',

                'meta_description'
                    => 'Jual SIM Card, E-SIM, dan Pocket WiFi Jepang murah dan cepat.',

                'meta_keyword'
                    => 'sim card jepang, esim jepang, pocket wifi jepang',
            ]
        );
    }
}