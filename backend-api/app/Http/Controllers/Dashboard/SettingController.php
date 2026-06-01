<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Setting;

use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function edit()
    {
        $setting = Setting::first();

        if (!$setting) {

            $setting = Setting::create([]);
        }

        return view(
            'dashboard.settings.edit',
            compact('setting')
        );
    }

    public function update(Request $request)
    {
        $setting = Setting::first();

        $setting->update([
            'whatsapp' => $request->whatsapp,
            'theme' => $request->theme,
        ]);

        return back()->with(
            'success',
            'Settings updated successfully.'
        );
    }
}