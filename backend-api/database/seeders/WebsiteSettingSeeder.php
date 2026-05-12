<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\WebsiteSetting;

class WebsiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [

            'nama_website' => 'AllJapanInternet',

            'whatsapp' => '08123456789',

            'email' => 'admin@alljapaninternet.com',

            'instagram' => 'https://instagram.com/',

            'alamat' => 'Tokyo, Japan',

            'link_tracking_japan_post'
                => 'https://trackings.post.japanpost.jp/',

            'link_tracking_yamato'
                => 'https://track.kuronekoyamato.co.jp/',

            'footer_text'
                => 'AllJapanInternet © 2026',
        ];

        foreach ($settings as $key => $value) {

            WebsiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}