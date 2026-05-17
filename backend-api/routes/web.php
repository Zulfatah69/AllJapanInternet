<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\ProviderController;
use App\Http\Controllers\Dashboard\MonthlyProductController;
use App\Http\Controllers\Dashboard\YearlyProductController;
use App\Http\Controllers\Dashboard\PromoController;
use App\Http\Controllers\Dashboard\TestimonialController;
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

            'monthlyProducts'
                => \App\Models\Product::where(
                    'type',
                    'monthly'
                )->count(),

            'yearlyProducts'
                => \App\Models\Product::where(
                    'type',
                    'yearly'
                )->count(),

            'totalCategories'
                => \App\Models\Category::count(),

            'totalProviders'
                => \App\Models\Provider::count(),

            'totalTestimonials'
                => \App\Models\Testimonial::count(),

        ]);

    })->name('dashboard');

    Route::resource(
        'categories',
        CategoryController::class
    );

    Route::resource(
        'providers',
        ProviderController::class
    );

    Route::resource(
        'monthly-products',
        MonthlyProductController::class
    );

    Route::delete(
        'monthly-products/{product}/delete-image',
        [MonthlyProductController::class, 'deleteImage']
    )->name('monthly-products.delete-image');

    Route::resource(
        'yearly-products',
        YearlyProductController::class
    );

    Route::delete(
        'yearly-products/{product}/delete-image',
        [YearlyProductController::class, 'deleteImage']
    )->name('yearly-products.delete-image');

    Route::resource(
        'promos',
        PromoController::class
    );

    Route::resource(
        'testimonials',
        TestimonialController::class
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