<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = [
        'nama_en',

        'product_id',

        'nama',

        'gb',

        'cycle_type',

        'monthly_price',

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

    public function billingPeriods()
    {
        return $this->hasMany(
            BillingPeriod::class,
        );
    }
}