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
            'variants.prices',
            'category'
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
            'variants.prices',
            'category'
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

            'promos'
                => $promos->map(function ($promo) {

                return [

                    'id'
                        => $promo->id,

                    'judul'
                        => $promo->judul,

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

        ]);
    }

    private function formatProduct($product)
    {
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
    }
}