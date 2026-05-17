<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Product;
use App\Models\Category;
use App\Models\Provider;
use App\Models\YearlyActivePeriod;
use App\Models\ProductPaymentMethod;
use App\Models\YearlyProductVariant;
use Illuminate\Http\Request;

use Illuminate\Support\Str;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class YearlyProductController extends Controller
{
    public function index()
    {
        $products = Product::with([

            'category',

            'provider',

            'yearlyVariants.activePeriods',

        ])
        ->where(
            'type',
            'yearly'
        )
        ->latest()
        ->get();

        return view(
            'dashboard.yearly-products.index',
            compact('products')
        );
    }

    public function create()
    {
        $categories = Category::whereIn(
            'nama',
            [
                'KARTU INTERNET TAHUNAN',
                'E-SIM INTERNET TAHUNAN',
            ]
        )->get();

        $providers = Provider::all();

        return view(
            'dashboard.yearly-products.create',
            compact(
                'categories',
                'providers'
            )
        );
    }

    public function store(Request $request)
    {
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
                    => 'yearly',

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
                        YearlyProductVariant::create([

                        'product_id'
                            => $product->id,

                        'nama'
                            => $variantData['nama'],

                        'is_active'
                            => true,

                    ]);

                    $periods = [

                        '13 BULAN',
                        '12 BULAN',
                        '9 BULAN',
                        '6 BULAN',
                        '3 BULAN',

                    ];

                    foreach (
                        $periods
                        as $period
                    ) {

                        if (
                            isset(
                                $variantData[
                                    'periods'
                                ][$period]
                            )
                        ) {

                            YearlyActivePeriod::create([

                                'yearly_product_variant_id'
                                    => $variant->id,

                                'nama'
                                    => $period,

                                'harga'
                                    => $variantData[
                                        'periods'
                                    ][$period],

                            ]);
                        }
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
                    'yearly-products.index'
                );

        } catch (\Exception $e) {

            DB::rollBack();

            dd($e->getMessage());
        }
    }

    public function edit(
        Product $yearly_product
    )
    {
        $product = $yearly_product->load([

            'yearlyVariants.activePeriods',

            'paymentMethods',

        ]);

        $categories = Category::whereIn(
            'nama',
            [
                'KARTU INTERNET TAHUNAN',
                'E-SIM TAHUNAN',
            ]
        )->get();

        $providers = Provider::all();

        return view(
            'dashboard.yearly-products.edit',
            compact(
                'product',
                'categories',
                'providers'
            )
        );
    }

    public function update(
        Request $request,
        Product $yearly_product
    )
    {
        DB::beginTransaction();

        try {

            $thumbnail =
                $yearly_product->thumbnail;

            if ($request->hasFile('thumbnail')) {

                if ($yearly_product->thumbnail) {

                    Storage::disk('public')
                        ->delete(
                            $yearly_product->thumbnail
                        );
                }

                $thumbnail = $request
                    ->file('thumbnail')
                    ->store(
                        'products',
                        'public'
                    );
            }

            $yearly_product->update([

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
                            YearlyProductVariant::find(
                                $variantData['id']
                            );

                        if (!$variant) {
                            continue;
                        }

                        $variant->update([

                            'nama'
                                => $variantData['nama'],

                        ]);

                    } else {

                        $variant =
                            YearlyProductVariant::create([

                            'product_id'
                                => $yearly_product->id,

                            'nama'
                                => $variantData['nama'],

                            'is_active'
                                => true,

                        ]);

                        $periods = [

                            '13 BULAN',
                            '12 BULAN',
                            '9 BULAN',
                            '6 BULAN',
                            '3 BULAN',

                        ];

                        foreach (
                            $periods
                            as $period
                        ) {

                            if (
                                isset(
                                    $variantData[
                                        'periods'
                                    ][$period]
                                )
                            ) {

                                YearlyActivePeriod::create([

                                    'yearly_product_variant_id'
                                        => $variant->id,

                                    'nama'
                                        => $period,

                                    'harga'
                                        => $variantData[
                                            'periods'
                                        ][$period],

                                ]);
                            }
                        }
                    }

                    foreach (
                        $variant->activePeriods
                        as $period
                    ) {

                        $period->update([

                            'harga'
                                => $variantData[
                                    'periods'
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
                            $yearly_product->id
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
                    'yearly-products.index'
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
        Product $yearly_product
    ) {

        if ($yearly_product->thumbnail) {

            Storage::disk('public')
                ->delete(
                    $yearly_product->thumbnail
                );
        }

        $yearly_product->delete();

        return back();
    }
}