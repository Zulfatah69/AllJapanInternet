<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    protected $fillable = [

        'nama',

        'slug',

        'logo',

    ];

    public function products()
    {
        return $this->hasMany(
            Product::class
        );
    }
}