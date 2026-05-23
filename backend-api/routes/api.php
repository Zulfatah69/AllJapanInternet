<?php

use Illuminate\Support\Facades\Route;

use App\Models\Product;
use App\Models\Promo;
use App\Models\Testimonial;
use App\Models\Provider;
use App\Models\Category;
use App\Models\Setting;
use App\Models\SimpleProduct;

Route::get('/products', function () {

    return Product::with([

        'provider',

        'category',

        'variants.billingPeriods',

        'paymentMethods',

    ])
    ->where('is_active', true)
    ->get()
    ->map(function ($product) {

        return [

            'id'
                => $product->id,

            'nama'
                => $product->nama,

            'slug'
                => $product->slug,

            'type'
                => $product->type,

            'deskripsi'
                => $product->deskripsi,

            'thumbnail'
                => $product->thumbnail,

            'thumbnail_url'
                => $product->thumbnail_url,

            'provider'
                => $product->provider,

            'category'
                => $product->category,

            'variants'
                => $product->variants,

            'payment_methods'
                => $product->paymentMethods,

            'is_best_seller'
                => $product->is_best_seller,

            'lowest_price'
                => $product->variants
                    ->min('monthly_price'),

        ];
    });

});

Route::get('/products/{slug}', function ($slug) {

    return Product::with([

        'provider',

        'category',

        'variants.billingPeriods',

        'paymentMethods',

    ])
    ->where('slug', $slug)
    ->firstOrFail();

});

Route::get('/providers', function () {

    return Provider::all();

});

Route::get('/categories', function () {

    return Category::all();

});

Route::get('/promos', function () {

    return Promo::where(
        'is_active',
        true
    )->get();

});

Route::get('/testimonials', function () {

    return Testimonial::all();

});

Route::get('/settings', function () {

    return Setting::first();

});

Route::get('/simple-products', function () {

    return SimpleProduct::where(
        'is_active',
        true
    )->get();

});