<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OngkirProduk extends Model
{
    protected $guarded = [];

    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class);
    }

    public function metodePembayaran(): BelongsTo
    {
        return $this->belongsTo(
            MetodePembayaran::class,
            'metode_pembayaran_id'
        );
    }
}