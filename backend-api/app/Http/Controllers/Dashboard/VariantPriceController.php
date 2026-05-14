<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\VariantPrice;
use App\Models\ProductVariant;
use App\Models\PurchasePeriod;

use Illuminate\Http\Request;

class VariantPriceController extends Controller
{
    public function index()
    {
        $prices = VariantPrice::with([
            'variant.product',
            'period'
        ])->latest()->get();

        return view(
            'dashboard.variant-prices.index',
            compact('prices')
        );
    }

    public function create()
    {
        $variants = ProductVariant::with(
            'product'
        )->get();

        $periods = PurchasePeriod::all();

        return view(
            'dashboard.variant-prices.create',
            compact(
                'variants',
                'periods'
            )
        );
    }

    public function store(Request $request)
    {
        $request->validate([

            'product_variant_id'
                => 'required',

            'purchase_period_id'
                => 'required',

            'harga'
                => 'required|numeric',

        ]);

        VariantPrice::create([

            'product_variant_id'
                => $request->product_variant_id,

            'purchase_period_id'
                => $request->purchase_period_id,

            'harga'
                => $request->harga,

        ]);

        return redirect()
            ->route('variant-prices.index');
    }

    public function edit(
        VariantPrice $variantPrice
    ) {

        $variants = ProductVariant::with(
            'product'
        )->get();

        $periods = PurchasePeriod::all();

        return view(
            'dashboard.variant-prices.edit',
            compact(
                'variantPrice',
                'variants',
                'periods'
            )
        );
    }

    public function update(
        Request $request,
        VariantPrice $variantPrice
    ) {

        $request->validate([

            'product_variant_id'
                => 'required',

            'purchase_period_id'
                => 'required',

            'harga'
                => 'required|numeric',

        ]);

        $variantPrice->update([

            'product_variant_id'
                => $request->product_variant_id,

            'purchase_period_id'
                => $request->purchase_period_id,

            'harga'
                => $request->harga,

        ]);

        return redirect()
            ->route('variant-prices.index');
    }

    public function destroy(
        VariantPrice $variantPrice
    ) {

        $variantPrice->delete();

        return back();
    }
}