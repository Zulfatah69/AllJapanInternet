<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SimpleProduct extends Model
{
    protected $fillable = [

        'nama',

        'deskripsi',

        'gambar',

        'is_active',

    ];

    protected $casts = [

        'is_active'
            => 'boolean',

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