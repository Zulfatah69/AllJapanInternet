<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPaymentMethod extends Model
{
    protected $fillable = [

        'product_id',

        'nama',

        'additional_price',

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
}