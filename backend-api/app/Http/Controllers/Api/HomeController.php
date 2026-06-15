<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Product;
use App\Models\Promo;
use App\Models\Category;

class HomeController extends Controller
{
    public function index()
    {
        $promos = Promo::where(
            'is_active',
            true
        )
        ->latest()
        ->take(5)
        ->get();

        $bestSellers = Product::with([

            'category',

            'provider',

            'variants.billingPeriods',

            'paymentMethods',

            'yearlyActivePeriods',

        ])
        ->where(
            'is_active',
            true
        )
        ->where(
            'best_seller',
            true
        )
        ->latest()
        ->take(8)
        ->get();

        $newProducts = Product::with([

            'category',

            'provider',

            'variants.billingPeriods',

            'paymentMethods',

            'yearlyActivePeriods',

        ])
        ->where(
            'is_active',
            true
        )
        ->latest()
        ->take(8)
        ->get();

        $categories = Category::latest()
            ->take(8)
            ->get();

        return response()->json([

            'success'
                => true,

            'data' => [

                'promos'
                    => $promos->map(function ($promo) {

                    return [

                        'id'
                            => $promo->id,

                        'judul'
                            => $promo->judul,

                        'deskripsi'
                            => $promo->deskripsi,

                        'gambar'
                            => $promo->gambar
                                ? asset(
                                    'storage/' .
                                    $promo->gambar
                                )
                                : null,

                        'link'
                            => $promo->link,

                    ];

                }),

                'best_sellers'
                    => $bestSellers->map(function ($product) {

                    return $this->formatProduct(
                        $product
                    );

                }),

                'new_products'
                    => $newProducts->map(function ($product) {

                    return $this->formatProduct(
                        $product
                    );

                }),

                'categories'
                    => $categories->map(function ($category) {

                    return [

                        'id'
                            => $category->id,

                        'nama'
                            => $category->nama,

                        'slug'
                            => $category->slug,

                    ];

                }),

            ]

        ]);
    }

    private function formatProduct($product)
    {
        $prices = [];

        if ($product->type === 'monthly') {

            foreach ($product->variants as $variant) {

                $prices[] =
                    $variant->monthly_price;

                foreach (
                    $variant->billingPeriods
                    as $period
                ) {

                    $prices[] =
                        $variant->monthly_price
                        +
                        $period->initial_price;
                }
            }

        } else {

            foreach (
                $product->yearlyActivePeriods
                as $period
            ) {

                $prices[] = $period->harga;
            }
        }

        return [

            'id'
                => $product->id,

            'nama'
                => $product->nama,
            'nama_en'
                => $product->nama_en,

            'slug'
                => $product->slug,

            'type'
                => $product->type,

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
                => $product->category
                    ? $product->category->nama
                    : null,

            'provider'
                => $product->provider
                    ? $product->provider->nama
                    : null,

            'lowest_price'
                => count($prices)
                    ? min($prices)
                    : null,

        ];
    }
}