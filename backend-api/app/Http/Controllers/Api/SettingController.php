<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Setting;

class SettingController extends Controller
{
    public function index()
    {
        $theme = Setting::where(
            'key',
            'active_theme'
        )->first();

        return response()->json([

            'theme'
                => $theme?->value
                    ?? 'spring',

        ]);
    }
}