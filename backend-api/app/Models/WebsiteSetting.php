<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebsiteSetting extends Model
{
    protected $fillable = [

        'nama_website',

        'logo',

        'favicon',

        'email',

        'no_wa',

        'alamat',

        'facebook',

        'instagram',

        'tiktok',

        'youtube',

    ];
}