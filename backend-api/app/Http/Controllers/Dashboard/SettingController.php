<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Setting;

use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function edit()
    {
        $theme = Setting::where(
            'key',
            'active_theme'
        )->first();

        return view(
            'dashboard.settings.edit',
            compact('theme')
        );
    }

    public function update(Request $request)
    {
        Setting::updateOrCreate(

            [
                'key' => 'active_theme'
            ],

            [
                'value' => $request->theme
            ]

        );

        return back();
    }
}