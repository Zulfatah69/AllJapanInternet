<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchasePeriod extends Model
{
    protected $fillable = [

        'nama',

        'is_active',

    ];

    protected $casts = [

        'is_active' => 'boolean',

    ];

    public function variantPrices()
    {
        return $this->hasMany(
            VariantPrice::class
        );
    }
}