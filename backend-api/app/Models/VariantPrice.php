<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VariantPrice extends Model
{
    protected $fillable = [

        'product_variant_id',
        'purchase_period_id',
        'harga',

    ];

    public function variant()
    {
        return $this->belongsTo(
            ProductVariant::class,
            'product_variant_id'
        );
    }

    public function period()
    {
        return $this->belongsTo(
            PurchasePeriod::class,
            'purchase_period_id'
        );
    }
}