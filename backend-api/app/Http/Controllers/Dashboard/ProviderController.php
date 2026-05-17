<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Provider;

use Illuminate\Http\Request;

use Illuminate\Support\Str;

use Illuminate\Support\Facades\Storage;

class ProviderController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | INDEX
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        $providers = Provider::latest()
            ->get();

        return view(
            'dashboard.providers.index',
            compact('providers')
        );
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function create()
    {
        return view(
            'dashboard.providers.create'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        $request->validate([

            'nama'
                => 'required|max:255',

            'logo'
                => 'nullable|image',

        ]);

        $logo = null;

        if ($request->hasFile('logo')) {

            $logo = $request
                ->file('logo')
                ->store(
                    'providers',
                    'public'
                );
        }

        Provider::create([

            'nama'
                => $request->nama,

            'slug'
                => Str::slug(
                    $request->nama
                ),

            'logo'
                => $logo,

        ]);

        return redirect()
            ->route('providers.index')
            ->with(
                'success',
                'Provider created successfully.'
            );
    }

    /*
    |--------------------------------------------------------------------------
    | EDIT
    |--------------------------------------------------------------------------
    */

    public function edit(
        Provider $provider
    ) {

        return view(
            'dashboard.providers.edit',
            compact('provider')
        );
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        Provider $provider
    ) {

        $request->validate([

            'nama'
                => 'required|max:255',

            'logo'
                => 'nullable|image',

        ]);

        $logo = $provider->logo;

        if ($request->hasFile('logo')) {

            if ($provider->logo) {

                Storage::disk('public')
                    ->delete(
                        $provider->logo
                    );
            }

            $logo = $request
                ->file('logo')
                ->store(
                    'providers',
                    'public'
                );
        }

        $provider->update([

            'nama'
                => $request->nama,

            'slug'
                => Str::slug(
                    $request->nama
                ),

            'logo'
                => $logo,

        ]);

        return redirect()
            ->route('providers.index')
            ->with(
                'success',
                'Provider updated successfully.'
            );
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Provider $provider
    ) {

        if ($provider->logo) {

            Storage::disk('public')
                ->delete(
                    $provider->logo
                );
        }

        $provider->delete();

        return back()
            ->with(
                'success',
                'Provider deleted successfully.'
            );
    }
}