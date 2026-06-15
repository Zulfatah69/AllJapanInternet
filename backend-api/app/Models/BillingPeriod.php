<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BillingPeriod extends Model
{
    protected $fillable = [
        'nama_en',

        'product_variant_id',

        'nama',

        'initial_price',

    ];

    public function variant()
    {
        return $this->belongsTo(
            ProductVariant::class,
            'product_variant_id'
        );
    }
}