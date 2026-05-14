<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [

        'category_id',

        'nama',

        'slug',

        'provider',

        'code',

        'type',

        'billing_type',

        'deskripsi',

        'thumbnail',

        'best_seller',

        'is_active',

    ];

    protected $casts = [

        'best_seller' => 'boolean',

        'is_active' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }
}