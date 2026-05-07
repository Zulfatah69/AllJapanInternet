<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MetodePembayaran extends Model
{
    protected $guarded = [];

    public function ongkirProduk(): HasMany
    {
        return $this->hasMany(OngkirProduk::class);
    }
}