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

        $logo = $setting->logo;

        if ($request->hasFile('logo')) {

            $logo = $request
                ->file('logo')
                ->store(
                    'settings',
                    'public'
                );
        }

        $favicon = $setting->favicon;

        if ($request->hasFile('favicon')) {

            $favicon = $request
                ->file('favicon')
                ->store(
                    'settings',
                    'public'
                );
        }

        $setting->update([

            'website_name'
                => $request->website_name,

            'whatsapp'
                => $request->whatsapp,

            'telegram'
                => $request->telegram,

            'line'
                => $request->line,

            'email'
                => $request->email,

            'instagram'
                => $request->instagram,

            'tiktok'
                => $request->tiktok,

            'youtube'
                => $request->youtube,

            'footer_text'
                => $request->footer_text,

            'logo'
                => $logo,

            'favicon'
                => $favicon,

            'theme'
                => $request->theme,
        ]);

        return back()->with(
            'success',
            'Settings updated successfully.'
        );
    }
}