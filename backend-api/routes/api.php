<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PromoController;
use App\Http\Controllers\Api\ShippingMethodController;
use App\Http\Controllers\Api\PurchasePeriodController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\HomeController;

Route::get(
    '/products',
    [ProductController::class, 'index']
);

Route::get(
    '/products/{slug}',
    [ProductController::class, 'show']
);

Route::get(
    '/promos',
    [PromoController::class, 'index']
);

Route::get(
    '/shipping-methods',
    [ShippingMethodController::class, 'index']
);

Route::get(
    '/purchase-periods',
    [PurchasePeriodController::class, 'index']
);

Route::get(
    '/categories',
    [CategoryController::class, 'index']
);

Route::get(
    '/settings',
    [SettingController::class, 'index']
);

Route::post(
    '/order-preview',
    [OrderController::class, 'preview']
);

Route::get(
    '/home',
    [HomeController::class, 'index']
);