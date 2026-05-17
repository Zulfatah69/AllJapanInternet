<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Setting;

class SettingController extends Controller
{
    public function index()
    {
        return response()->json([

            'success' => true,

            'data' => [

                'theme'
                    => Setting::where(
                        'key',
                        'theme'
                    )->value('value'),

                'whatsapp_number'
                    => Setting::where(
                        'key',
                        'whatsapp_number'
                    )->value('value'),

            ]

        ]);
    }
}