<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'admin@alljapaninternet.com'
            ],
            [
                'name' => 'Admin',
                'password' => bcrypt('password'),
            ]
        );

        $this->call([

            ProviderSeeder::class,
            KategoriProdukSeeder::class,
            MetodePembayaranSeeder::class,
            WebsiteSettingSeeder::class,
            SeoPageSeeder::class,
            ProdukSeeder::class,
            VarianProdukSeeder::class,
            PeriodePembelianSeeder::class,
            OngkirProdukSeeder::class,
        ]);
    }
}