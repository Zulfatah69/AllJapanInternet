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
        'start_date',
        'end_date',
        'is_active',

    ];

    protected $casts = [

        'is_active' => 'boolean',

    ];

    protected $appends = [

        'gambar_url',

    ];

    public function getGambarUrlAttribute()
    {
        if (!$this->gambar) {

            return null;
        }

        return asset(
            'storage/' . $this->gambar
        );
    }
}