<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimoni extends Model
{
    protected $fillable = [

        'nama',

        'pekerjaan',

        'foto',

        'rating',

        'isi_testimoni',

        'status_aktif',

    ];
}