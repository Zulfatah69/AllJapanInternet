<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebsiteSetting extends Model
{
    protected $guarded = [];

    public static function getValue($key)
    {
        return self::where('key', $key)
            ->value('value');
    }
}