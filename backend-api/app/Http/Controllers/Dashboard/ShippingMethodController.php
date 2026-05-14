<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\ShippingMethod;

use Illuminate\Http\Request;

class ShippingMethodController extends Controller
{
    public function index()
    {
        $shippingMethods = ShippingMethod::latest()->get();

        return view(
            'dashboard.shipping-methods.index',
            compact('shippingMethods')
        );
    }

    public function create()
    {
        return view(
            'dashboard.shipping-methods.create'
        );
    }

    public function store(Request $request)
    {
        $request->validate([

            'nama' => 'required',

            'harga' => 'required',

        ]);

        ShippingMethod::create([

            'nama'
                => $request->nama,

            'harga'
                => $request->harga,

            'deskripsi'
                => $request->deskripsi,

            'is_active'
                => true,

        ]);

        return redirect()
            ->route('shipping-methods.index');
    }

    public function edit(
        ShippingMethod $shippingMethod
    ) {

        return view(
            'dashboard.shipping-methods.edit',
            compact('shippingMethod')
        );
    }

    public function update(
        Request $request,
        ShippingMethod $shippingMethod
    ) {

        $request->validate([

            'nama' => 'required',

            'harga' => 'required',

        ]);

        $shippingMethod->update([

            'nama'
                => $request->nama,

            'harga'
                => $request->harga,

            'deskripsi'
                => $request->deskripsi,

        ]);

        return redirect()
            ->route('shipping-methods.index');
    }

    public function destroy(
        ShippingMethod $shippingMethod
    ) {

        $shippingMethod->delete();

        return back();
    }
}