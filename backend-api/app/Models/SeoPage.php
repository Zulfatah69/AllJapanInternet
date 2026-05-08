<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoPage extends Model
{
    protected $fillable = [

        'halaman',

        'meta_title',

        'meta_description',

        'meta_keyword',

        'og_image',

        'status_aktif',

    ];
}