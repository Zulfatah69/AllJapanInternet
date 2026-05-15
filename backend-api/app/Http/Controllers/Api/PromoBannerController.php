<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PromoBanner;

class PromoBannerController extends Controller
{
    public function index()
    {
        $promo = PromoBanner::where('status_aktif', true)
            ->where('tampil_di_home', true)
            ->orderBy('urutan')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $promo
        ]);
    }
}