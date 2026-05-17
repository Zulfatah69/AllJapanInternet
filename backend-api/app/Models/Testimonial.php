<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [

        'image',

    ];

    protected $appends = [

        'image_url',

    ];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {

            return null;
        }

        return asset(
            'storage/' . $this->image
        );
    }
}