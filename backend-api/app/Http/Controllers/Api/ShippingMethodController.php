<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\ShippingMethod;

class ShippingMethodController extends Controller
{
    public function index()
    {
        $methods = ShippingMethod::where(
            'is_active',
            true
        )
        ->get();

        return response()->json(

            $methods->map(function ($method) {

                return [

                    'id'
                        => $method->id,

                    'nama'
                        => $method->nama,

                    'harga'
                        => $method->harga,

                    'deskripsi'
                        => $method->deskripsi,

                ];

            })

        );
    }
}