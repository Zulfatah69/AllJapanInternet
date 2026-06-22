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

class YearlyProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with([
            'category',
            'provider',
            'variants.billingPeriods',
        ])
        ->where('type', 'yearly');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('provider_id')) {
            $query->where('provider_id', $request->provider_id);
        }

        $products = $query->orderBy('best_seller', 'desc')->latest()->get();
        $categories = Category::whereIn('nama', [
            'KARTU INTERNET TAHUNAN',
            'E-SIM INTERNET TAHUNAN',
            'E-SIM TAHUNAN',
        ])->get();
        $providers = Provider::all();

        return view(
            'dashboard.yearly-products.index',
            compact('products', 'categories', 'providers')
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
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'provider_id' => 'required|exists:providers,id',
            'nama'        => 'required|max:255',
            'nama_en' => 'nullable|string|max:255',
            'thumbnail'   => 'nullable|image|max:2048',
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
            'nama_en' => $request->nama_en,

                'slug'
                    => Str::slug(
                        $request->nama
                    ),

                'type'
                    => 'yearly',

                'deskripsi'
                    => $request->deskripsi,
            'deskripsi_en' => $request->deskripsi_en,

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

                    $variant = null;

                    if (
                        isset($variantData['id'])
                    ) {

                        $variant =
                            ProductVariant::find(
                                $variantData['id']
                            );

                        if ($variant) {

                            $variant->update([

                                'nama'
                                    => $variantData['nama'] ?? 'Variant',

                                'gb'
                                    => $variantData['nama'] ?? 'Variant',

                            ]);
                        }

                    } else {

                        $variant =
                            ProductVariant::create([

                            'product_id'
                                => $product->id,

                            'nama'
                                => $variantData['nama'] ?? 'Variant',

                            'gb'
                                => $variantData['nama'] ?? 'Variant',

                            'monthly_price'
                                => 0,

                            'is_active'
                                => true,

                        ]);
                    }

                    if (
                        $variant &&
                        isset($variantData['periods'])
                    ) {

                        foreach (
                            $variantData['periods']
                            as $periodName => $price
                        ) {

                            $billing =
                                BillingPeriod::where(
                                    'product_variant_id',
                                    $variant->id
                                )
                                ->where(
                                    'nama',
                                    $periodName
                                )
                                ->first();

                            if ($billing) {

                                $billing->update([

                                    'initial_price'
                                        => $price ?? 0,

                                ]);

                            } else {

                                BillingPeriod::create([

                                    'product_variant_id'
                                        => $variant->id,

                                    'nama'
                                        => $periodName,

                                    'initial_price'
                                        => $price ?? 0,

                                    'is_active'
                                        => true,

                                ]);
                            }
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

            'variants.billingPeriods',

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
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'provider_id' => 'required|exists:providers,id',
            'nama'        => 'required|max:255',
            'nama_en' => 'nullable|string|max:255',
            'thumbnail'   => 'nullable|image|max:2048',
        ]);

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
            'nama_en' => $request->nama_en,

                'slug'
                    => Str::slug(
                        $request->nama
                    ),

                'deskripsi'
                    => $request->deskripsi,
            'deskripsi_en' => $request->deskripsi_en,

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
                        !isset($variantData['nama']) ||
                        $variantData['nama'] === ''
                    ) {
                        continue;
                    }

                    $variant = null;

                    if (
                        isset($variantData['id'])
                    ) {

                        $variant =
                            ProductVariant::find(
                                $variantData['id']
                            );

                        if ($variant) {

                            $variant->update([

                                'nama'
                                    => $variantData['nama'] ?? 'Variant',

                                'gb'
                                    => $variantData['nama'] ?? 'Variant',

                            ]);
                        }

                    } else {

                        $variant =
                            ProductVariant::create([

                            'product_id'
                                => $yearly_product->id,

                            'nama'
                                => $variantData['nama'] ?? 'Variant',

                            'gb'
                                => $variantData['nama'] ?? 'Variant',

                            'monthly_price'
                                => 0,

                            'is_active'
                                => true,

                        ]);
                    }

                    if (
                        $variant &&
                        isset($variantData['periods'])
                    ) {

                        foreach (
                            $variantData['periods']
                            as $periodName => $price
                        ) {

                            if (
                                $price === null ||
                                $price === ''
                            ) {
                                continue;
                            }

                            $billing =
                                BillingPeriod::where(
                                    'product_variant_id',
                                    $variant->id
                                )
                                ->where(
                                    'nama',
                                    $periodName
                                )
                                ->first();

                            if ($billing) {

                                $billing->update([

                                    'initial_price'
                                        => (int) $price,

                                ]);

                            } else {

                                BillingPeriod::create([

                                    'product_variant_id'
                                        => $variant->id,

                                    'nama'
                                        => $periodName,

                                    'initial_price'
                                        => (int) $price,

                                    'is_active'
                                        => true,

                                ]);
                            }
                        }
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

                    } else {

                        ProductPaymentMethod::create([

                            'product_id'
                                => $yearly_product->id,

                            'nama'
                                => $paymentData['nama'],

                            'additional_price'
                                => $paymentData[
                                    'additional_price'
                                ] ?? 0,

                            'is_active'
                                => true,

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
        $product = Product::findOrFail($id);

        if ($product->thumbnail) {

            Storage::disk('public')
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