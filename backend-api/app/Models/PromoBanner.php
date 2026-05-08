<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromoBanner extends Model
{
    protected $fillable = [

        'judul',

        'sub_judul',

        'thumbnail',

        'link',

        'status_aktif',

    ];
}