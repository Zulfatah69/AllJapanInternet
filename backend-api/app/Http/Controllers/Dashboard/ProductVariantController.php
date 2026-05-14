<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Product;
use App\Models\ProductVariant;

use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    public function index()
    {
        $variants = ProductVariant::with(
            'product'
        )
        ->latest()
        ->get();

        return view(
            'dashboard.product-variants.index',
            compact('variants')
        );
    }

    public function create()
    {
        $products = Product::all();

        return view(
            'dashboard.product-variants.create',
            compact('products')
        );
    }

    public function store(Request $request)
    {
        $request->validate([

            'product_id' => 'required',

            'nama' => 'required',

            'harga' => 'required',

        ]);

        ProductVariant::create([

            'product_id'
                => $request->product_id,

            'nama'
                => $request->nama,

            'harga'
                => $request->harga,

            'gb'
                => $request->gb,

            'is_active'
                => true,

        ]);

        return redirect()
            ->route('product-variants.index');
    }

    public function edit(
        ProductVariant $productVariant
    ) {

        $products = Product::all();

        return view(
            'dashboard.product-variants.edit',
            compact(
                'productVariant',
                'products'
            )
        );
    }

    public function update(
        Request $request,
        ProductVariant $productVariant
    ) {

        $request->validate([

            'product_id' => 'required',

            'nama' => 'required',

            'harga' => 'required',

        ]);

        $productVariant->update([

            'product_id'
                => $request->product_id,

            'nama'
                => $request->nama,

            'harga'
                => $request->harga,

            'gb'
                => $request->gb,

        ]);

        return redirect()
            ->route('product-variants.index');
    }

    public function destroy(
        ProductVariant $productVariant
    ) {

        $productVariant->delete();

        return back();
    }
}