<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [

        'website_name',

        'logo',

        'favicon',

        'whatsapp',

        'telegram',

        'line',

        'email',

        'instagram',

        'tiktok',

        'youtube',

        'footer_text',

        'theme',

    ];
}