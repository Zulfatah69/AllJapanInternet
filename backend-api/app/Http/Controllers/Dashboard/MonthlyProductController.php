<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Product;
use App\Models\Category;
use App\Models\Provider;
use App\Models\ProductVariant;
use App\Models\BillingPeriod;
use App\Models\ProductPaymentMethod;

use Illuminate\Http\Request;

use Illuminate\Support\Str;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MonthlyProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with([
            'category',
            'provider',
        ])
        ->where('type', 'monthly');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('provider_id')) {
            $query->where('provider_id', $request->provider_id);
        }

        if ($request->filled('cycle_type')) {
            $query->where('cycle_type', $request->cycle_type);
        }

        $products = $query->latest()->get();
        $categories = Category::whereIn('nama', [
            'KARTU INTERNET BULANAN',
            'E-SIM INTERNET BULANAN',
            'POCKET WIFI',
            'KARTU TELPON + DATA INTERNET',
            'KARTU INTERNET BULANAN & E-SIM',
            'KARTU INTERNET BULANAN UNTUK POCKET',
        ])->get();
        $providers = Provider::all();

        return view(
            'dashboard.monthly-products.index',
            compact('products', 'categories', 'providers')
        );
    }

    public function create()
    {
        $categories = Category::whereIn(
            'nama',
            [
                'KARTU INTERNET BULANAN',
                'E-SIM INTERNET BULANAN',
                'POCKET WIFI',
                'KARTU TELPON + DATA INTERNET',
                'KARTU INTERNET BULANAN & E-SIM',
                'KARTU INTERNET BULANAN UNTUK POCKET',
            ]
        )->get();

        $providers = Provider::all();

        return view(
            'dashboard.monthly-products.create',
            compact(
                'categories',
                'providers'
            )
        );
    }

    public function store(Request $request)
    {
        $request->validate([

            'category_id'
                => 'required',

            'provider_id'
                => 'required',

            'nama'
                => 'required|max:255',

            'thumbnail'
                => 'nullable|image',

        ]);

        DB::beginTransaction();

        try {

            $thumbnail = null;

            if ($request->hasFile('thumbnail')) {

                $thumbnail = $request
                    ->file('thumbnail')
                    ->store(
                        'products',
                        'public'
                    );
            }

            $product = Product::create([

                'category_id'
                    => $request->category_id,

                'provider_id'
                    => $request->provider_id,

                'nama'
                    => $request->nama,

                'slug'
                    => Str::slug(
                        $request->nama
                    ),

                'type'
                    => 'monthly',

                'cycle_type'
                    => $request->cycle_type,

                'deskripsi'
                    => $request->deskripsi,

                'thumbnail'
                    => $thumbnail,

                'best_seller'
                    => $request->best_seller
                        ? true
                        : false,

                'is_active'
                    => true,

            ]);

            if ($request->variants) {

                foreach (
                    $request->variants
                    as $variantData
                ) {

                    $variant =
                        ProductVariant::create([

                        'product_id'
                            => $product->id,

                        'gb'
                            => $variantData['gb'],

                        'monthly_price'
                            => $variantData['monthly_price'],

                        'is_active'
                            => true,

                    ]);

                    $periods = [

                        '1-10',
                        '11-19',
                        '20-31',

                    ];

                    foreach (
                        $periods
                        as $period
                    ) {

                        BillingPeriod::create([

                            'product_variant_id'
                                => $variant->id,

                            'nama'
                                => $period,

                            'initial_price'
                                => $variantData[
                                    'billing_periods'
                                ][$period] ?? 0,

                        ]);
                    }
                }
            }

            if ($request->payment_methods) {

                foreach (
                    $request->payment_methods
                    as $payment
                ) {

                    ProductPaymentMethod::create([

                        'product_id'
                            => $product->id,

                        'nama'
                            => $payment['nama'],

                        'additional_price'
                            => $payment[
                                'additional_price'
                            ] ?? 0,

                        'is_active'
                            => true,

                    ]);
                }
            }

            DB::commit();

            return redirect()
                ->route(
                    'monthly-products.index'
                )
                ->with(
                    'success',
                    'Product created successfully.'
                );

        } catch (\Exception $e) {

            DB::rollBack();

            dd($e->getMessage());
        }
    }

    public function edit(
        Product $monthly_product
    ) {

        $product = $monthly_product->load([

            'variants.billingPeriods',

            'paymentMethods',

        ]);

        $categories = Category::whereIn(
            'nama',
            [
                'KARTU INTERNET BULANAN',
                'E-SIM INTERNET BULANAN',
                'POCKET WIFI',
                'KARTU TELPON + DATA INTERNET',
            ]
        )->get();

        $providers = Provider::all();

        return view(
            'dashboard.monthly-products.edit',
            compact(
                'product',
                'categories',
                'providers'
            )
        );
    }

    public function update(
        Request $request,
        Product $monthly_product
    ) {

        $request->validate([

            'category_id'
                => 'required',

            'provider_id'
                => 'required',

            'nama'
                => 'required|max:255',

            'cycle_type'
                => 'required|in:VT,GJ',

        ]);

        DB::beginTransaction();

        try {

            $thumbnail =
                $monthly_product->thumbnail;

            if ($request->hasFile('thumbnail')) {

                if ($monthly_product->thumbnail) {

                    Storage::disk('public')
                        ->delete(
                            $monthly_product->thumbnail
                        );
                }

                $thumbnail = $request
                    ->file('thumbnail')
                    ->store(
                        'products',
                        'public'
                    );
            }

            $monthly_product->update([

                'category_id'
                    => $request->category_id,

                'provider_id'
                    => $request->provider_id,

                'nama'
                    => $request->nama,

                'slug'
                    => Str::slug(
                        $request->nama
                    ),

                'cycle_type'
                    => $request->cycle_type,

                'deskripsi'
                    => $request->deskripsi,

                'thumbnail'
                    => $thumbnail,

                'best_seller'
                    => $request->best_seller
                        ? true
                        : false,

            ]);
            if ($request->variants) {

                foreach (
                    $request->variants
                    as $variantData
                ) {

                    if (
                        isset($variantData['id'])
                    ) {

                        $variant =
                            ProductVariant::find(
                                $variantData['id']
                            );

                        if (!$variant) {
                            continue;
                        }

                        $variant->update([

                            'gb'
                                => $variantData['gb'],

                            'monthly_price'
                                => $variantData['monthly_price'],

                        ]);

                    } else {

                        $variant =
                            ProductVariant::create([

                            'product_id'
                                => $monthly_product->id,

                            'gb'
                                => $variantData['gb'],

                            'monthly_price'
                                => $variantData['monthly_price'],

                            'is_active'
                                => true,

                        ]);

                        $periods = [

                            '1-10',
                            '11-19',
                            '20-31',

                        ];

                        foreach (
                            $periods
                            as $period
                        ) {

                            BillingPeriod::create([

                                'product_variant_id'
                                    => $variant->id,

                                'nama'
                                    => $period,

                                'initial_price'
                                    => $variantData[
                                        'billing_periods'
                                    ][$period] ?? 0,

                            ]);
                        }
                    }

                    foreach (
                        $variant->billingPeriods
                        as $period
                    ) {

                        $period->update([

                            'initial_price'
                                => $variantData[
                                    'billing_periods'
                                ][$period->nama] ?? 0,

                        ]);
                    }
                }
            }

            if ($request->payment_methods) {

                foreach (
                    $request->payment_methods
                    as $paymentData
                ) {

                    $payment =
                        ProductPaymentMethod::where(
                            'product_id',
                            $monthly_product->id
                        )
                        ->where(
                            'nama',
                            $paymentData['nama']
                        )
                        ->first();

                    if ($payment) {

                        $payment->update([

                            'additional_price'
                                => $paymentData[
                                    'additional_price'
                                ] ?? 0,

                        ]);
                    }
                }
            }

            DB::commit();

            return redirect()
                ->route(
                    'monthly-products.index'
                );

        } catch (\Exception $e) {

            DB::rollBack();

            dd($e->getMessage());
        }
    }
    public function deleteImage($id)
    {
        $product = \App\Models\Product::findOrFail($id);

        if ($product->thumbnail) {

            \Illuminate\Support\Facades\Storage::disk('public')
                ->delete(
                    $product->thumbnail
                );

            $product->thumbnail = null;

            $product->save();
        }

        return back()->with(
            'success',
            'Image deleted successfully.'
        );
    }
    public function destroy(
        Product $monthly_product
    ) {

        if ($monthly_product->thumbnail) {

            Storage::disk('public')
                ->delete(
                    $monthly_product->thumbnail
                );
        }

        $monthly_product->delete();

        return back();
    }

    public function toggleActive(Product $product)
    {
        $product->update([
            'is_active' => !$product->is_active
        ]);

        return response()->json([
            'success' => true,
            'is_active' => $product->is_active,
            'message' => 'Status produk berhasil diubah.'
        ]);
    }

    public function toggleVariantActive(ProductVariant $variant)
    {
        $variant->update([
            'is_active' => !$variant->is_active
        ]);

        return response()->json([
            'success' => true,
            'is_active' => $variant->is_active,
            'message' => 'Status varian berhasil diubah.'
        ]);
    }
}