<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [

        'category_id',

        'provider_id',

        'nama',

        'slug',

        'type',

        'cycle_type',

        'deskripsi',

        'thumbnail',

        'best_seller',

        'is_active',

    ];

    protected $casts = [

        'best_seller' => 'boolean',

        'is_active' => 'boolean',

    ];

    protected $appends = [

        'thumbnail_url',

    ];

    public function category()
    {
        return $this->belongsTo(
            Category::class
        );
    }

    public function provider()
    {
        return $this->belongsTo(
            Provider::class
        );
    }

    public function variants()
    {
        return $this->hasMany(
            ProductVariant::class
        );
    }

    public function paymentMethods()
    {
        return $this->hasMany(
            ProductPaymentMethod::class
        );
    }

    public function yearlyActivePeriods()
    {
        return $this->hasMany(
            YearlyActivePeriod::class
        );
    }
    public function yearlyVariants()
    {
        return $this->hasMany(
            YearlyProductVariant::class
        );
    }
    public function getThumbnailUrlAttribute()
    {
        if (!$this->thumbnail) {

            return null;
        }

        return asset(
            'storage/' . $this->thumbnail
        );
    }
}