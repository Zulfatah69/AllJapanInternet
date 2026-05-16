<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\PurchasePeriod;

class PurchasePeriodController extends Controller
{
    public function index()
    {
        $periods = PurchasePeriod::where(
            'is_active',
            true
        )
        ->get();

        return response()->json(

            $periods->map(function ($period) {

                return [

                    'id'
                        => $period->id,

                    'nama'
                        => $period->nama,

                ];

            })

        );
    }
}