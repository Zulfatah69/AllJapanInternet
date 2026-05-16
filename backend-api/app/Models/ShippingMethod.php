<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingMethod extends Model
{
    protected $fillable = [

        'nama',

        'harga',

        'deskripsi',

        'is_active',
    ];

    protected $casts = [

        'is_active' => 'boolean',
    ];
}