<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [

        'judul',

        'slug',

        'thumbnail',

        'konten',

        'status_aktif',

    ];
}