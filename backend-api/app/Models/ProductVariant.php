<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = [

        'product_id',
        'nama',
        'gb',
        'is_active',

    ];

    protected $casts = [

        'is_active' => 'boolean',

    ];

    public function product()
    {
        return $this->belongsTo(
            Product::class
        );
    }

    public function prices()
    {
        return $this->hasMany(
            VariantPrice::class
        );
    }
}