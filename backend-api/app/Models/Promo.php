<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promo extends Model
{
    protected $fillable = [

        'judul',

        'deskripsi',

        'gambar',

        'link',

        'is_active',
    ];

    protected $casts = [

        'is_active' => 'boolean',

        'start_date' => 'date',

        'end_date' => 'date',

    ];
}