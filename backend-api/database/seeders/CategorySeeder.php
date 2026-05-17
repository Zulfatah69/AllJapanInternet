<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Category;

use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [

            'KARTU INTERNET BULANAN',

            'E-SIM INTERNET BULANAN',

            'POCKET WIFI',

            'KARTU TELPON + DATA INTERNET',

            'KARTU INTERNET TAHUNAN',

            'E-SIM INTERNET TAHUNAN',
        ];

        foreach ($categories as $category) {

            Category::create([

                'nama' => $category,

                'slug' => Str::slug(
                    $category
                ),

            ]);
        }
    }
}