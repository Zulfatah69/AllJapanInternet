<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Promo;

class PromoController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();

        $promos = Promo::where(
            'is_active',
            true
        )
        ->where(function ($query) use ($today) {

            $query->whereNull('start_date')
                ->orWhere(
                    'start_date',
                    '<=',
                    $today
                );

        })
        ->where(function ($query) use ($today) {

            $query->whereNull('end_date')
                ->orWhere(
                    'end_date',
                    '>=',
                    $today
                );

        })
        ->latest()
        ->get();

        return response()->json(

            $promos->map(function ($promo) {

                return [

                    'id'
                        => $promo->id,

                    'judul'
                        => $promo->judul,

                    'deskripsi'
                        => $promo->deskripsi,

                    'gambar'
                        => $promo->gambar
                            ? asset(
                                'storage/' .
                                $promo->gambar
                            )
                            : null,

                    'link'
                        => $promo->link,

                ];

            })

        );
    }
}