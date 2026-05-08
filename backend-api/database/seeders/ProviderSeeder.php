<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Provider;

use Illuminate\Support\Str;

class ProviderSeeder extends Seeder
{
    public function run(): void
    {
        $providers = [

            'Softbank',
            'Softbank Jumbo',
            'Docomo',
            'Rakuten',
            'AU',

        ];

        foreach ($providers as $provider) {

            Provider::updateOrCreate(
                [
                    'slug' => Str::slug($provider)
                ],
                [
                    'nama_provider' => $provider,
                ]
            );
        }
    }
}