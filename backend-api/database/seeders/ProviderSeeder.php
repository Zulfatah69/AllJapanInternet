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

            'AU',

            'Docomo',

            'Rakuten',

        ];

        foreach ($providers as $provider) {

            Provider::create([

                'nama' => $provider,

                'slug' => Str::slug(
                    $provider
                ),

            ]);
        }
    }
}