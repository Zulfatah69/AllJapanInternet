<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\ProductVariantController;
use App\Http\Controllers\Dashboard\ShippingMethodController;
use App\Http\Controllers\Dashboard\PurchasePeriodController;
use App\Http\Controllers\Dashboard\PromoController;
use App\Http\Controllers\Dashboard\VariantPriceController;
use App\Http\Controllers\Dashboard\SettingController;

Route::get('/', function () {

    return view('welcome');

});

Route::middleware([
    'auth',
    'verified',
])
->prefix('dashboard')
->group(function () {

    Route::get('/', function () {

        return view('dashboard', [

            'totalProducts'
                => \App\Models\Product::count(),

            'activeProducts'
                => \App\Models\Product::where(
                    'is_active',
                    true
                )->count(),

            'totalCategories'
                => \App\Models\Category::count(),

            'totalPromos'
                => \App\Models\Promo::count(),

        ]);

    })->name('dashboard');

    Route::resource(
        'categories',
        CategoryController::class
    );

    Route::resource(
        'products',
        ProductController::class
    );

    Route::patch(
        'products/{product}/toggle',
        [ProductController::class, 'toggle']
    )->name('products.toggle');

    Route::resource(
        'product-variants',
        ProductVariantController::class
    );

    Route::resource(
        'variant-prices',
        VariantPriceController::class
    );

    Route::resource(
        'shipping-methods',
        ShippingMethodController::class
    );

    Route::resource(
        'purchase-periods',
        PurchasePeriodController::class
    );

    Route::resource(
        'promos',
        PromoController::class
    );

    Route::get(
        'settings',
        [SettingController::class, 'edit']
    )->name('settings.edit');

    Route::post(
        'settings',
        [SettingController::class, 'update']
    )->name('settings.update');

});

Route::middleware('auth')
    ->group(function () {

    Route::get(
        '/profile',
        [ProfileController::class, 'edit']
    )->name('profile.edit');

    Route::patch(
        '/profile',
        [ProfileController::class, 'update']
    )->name('profile.update');

    Route::delete(
        '/profile',
        [ProfileController::class, 'destroy']
    )->name('profile.destroy');

});

require __DIR__ . '/auth.php';