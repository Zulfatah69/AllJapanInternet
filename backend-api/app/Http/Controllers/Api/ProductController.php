<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Product;

use Illuminate\Http\Request;

use App\Traits\ApiResponse;

class ProductController extends Controller
{
    use ApiResponse;

    public function show($slug)
    {
        $product = Product::with([

            'variants.prices.period',

            'category',

        ])
        ->where(
            'slug',
            $slug
        )
        ->firstOrFail();

        return $this->successResponse([

            'id'
                => $product->id,

            'nama'
                => $product->nama,

            'slug'
                => $product->slug,

            'provider'
                => $product->provider,

            'code'
                => $product->code,

            'type'
                => $product->type,

            'billing_type'
                => $product->billing_type,

            'deskripsi'
                => $product->deskripsi,

            'thumbnail'
                => $product->thumbnail
                    ? asset(
                        'storage/' .
                        $product->thumbnail
                    )
                    : null,

            'best_seller'
                => $product->best_seller,

            'category' => [

                'id'
                    => $product->category->id,

                'nama'
                    => $product->category->nama,

            ],

            'variants'
                => $product->variants
                    ->map(function ($variant) {

                return [

                    'id'
                        => $variant->id,

                    'nama'
                        => $variant->nama,

                    'gb'
                        => $variant->gb,

                    'prices'
                        => $variant->prices
                            ->map(function ($price) {

                        return [

                            'id'
                                => $price->id,

                            'period'
                                => $price->period->nama,

                            'harga'
                                => $price->harga,

                        ];

                    }),

                ];

            }),

        ], 'Product detail fetched');
    }

    public function index(Request $request)
    {
        $query = Product::with([

            'variants.prices',

            'category',

        ])
        ->where(
            'is_active',
            true
        );

        if ($request->search) {

            $query->where(
                'nama',
                'like',
                '%' . $request->search . '%'
            );
        }

        if ($request->category) {

            $query->whereHas(
                'category',
                function ($q) use ($request) {

                    $q->where(
                        'slug',
                        $request->category
                    );

                }
            );
        }

        if ($request->provider) {

            $query->where(
                'provider',
                $request->provider
            );
        }


        if ($request->type) {

            $query->where(
                'type',
                $request->type
            );
        }

        if ($request->billing) {

            $query->where(
                'billing_type',
                $request->billing
            );
        }

        $products = $query
            ->latest()
            ->get();

        return $this->successResponse(

            $products->map(function ($product) {

                $allPrices = [];

                foreach ($product->variants as $variant) {

                    foreach ($variant->prices as $price) {

                        $allPrices[] = $price->harga;

                    }
                }

                return [

                    'id'
                        => $product->id,

                    'nama'
                        => $product->nama,

                    'slug'
                        => $product->slug,

                    'provider'
                        => $product->provider,

                    'code'
                        => $product->code,

                    'type'
                        => $product->type,

                    'billing_type'
                        => $product->billing_type,

                    'thumbnail'
                        => $product->thumbnail
                            ? asset(
                                'storage/' .
                                $product->thumbnail
                            )
                            : null,

                    'best_seller'
                        => $product->best_seller,

                    'category'
                        => $product->category->nama,

                    'lowest_price'
                        => count($allPrices)
                            ? min($allPrices)
                            : null,

                ];

            }),

            'Products fetched'

        );
    }
}