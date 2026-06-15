<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\SimpleProduct;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SimpleProductController extends Controller
{
    public function index()
    {
        $products = SimpleProduct::latest()
            ->get();

        return view(
            'dashboard.simple-products.index',
            compact('products')
        );
    }

    public function create()
    {
        return view(
            'dashboard.simple-products.create'
        );
    }

    public function store(Request $request)
    {
        $gambar = null;

        if ($request->hasFile('gambar')) {

            $gambar = $request
                ->file('gambar')
                ->store(
                    'simple-products',
                    'public'
                );
        }

        SimpleProduct::create([

            'nama'
                => $request->nama,
            'nama_en' => $request->nama_en,

            'deskripsi'
                => $request->deskripsi,
            'deskripsi_en' => $request->deskripsi_en,

            'gambar'
                => $gambar,

            'is_active'
                => true,

        ]);

        return redirect()
            ->route(
                'simple-products.index'
            );
    }

    public function edit(
        SimpleProduct $simple_product
    ) {

        return view(
            'dashboard.simple-products.edit',
            [
                'product'
                    => $simple_product
            ]
        );
    }

    public function update(
        Request $request,
        SimpleProduct $simple_product
    ) {

        $gambar =
            $simple_product->gambar;

        if ($request->hasFile('gambar')) {

            if ($simple_product->gambar) {

                Storage::disk('public')
                    ->delete(
                        $simple_product->gambar
                    );
            }

            $gambar = $request
                ->file('gambar')
                ->store(
                    'simple-products',
                    'public'
                );
        }

        $simple_product->update([

            'nama'
                => $request->nama,
            'nama_en' => $request->nama_en,

            'deskripsi'
                => $request->deskripsi,
            'deskripsi_en' => $request->deskripsi_en,

            'gambar'
                => $gambar,

        ]);

        return redirect()
            ->route(
                'simple-products.index'
            );
    }

    public function destroy(
        SimpleProduct $simple_product
    ) {

        if ($simple_product->gambar) {

            Storage::disk('public')
                ->delete(
                    $simple_product->gambar
                );
        }

        $simple_product->delete();

        return back();
    }
}