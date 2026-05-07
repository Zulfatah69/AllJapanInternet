<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PeriodePembelian extends Model
{
    protected $guarded = [];

    public function varianProduk(): BelongsTo
    {
        return $this->belongsTo(
            VarianProduk::class,
            'varian_produk_id'
        );
    }
}