<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProdukController;
use App\Http\Controllers\Api\PromoBannerController;
use App\Http\Controllers\Api\TestimoniController;
use App\Http\Controllers\Api\PageController;

Route::get('/page/{slug}', [PageController::class, 'show']);
Route::get('/produk', [ProdukController::class, 'index']);
Route::get('/produk/{slug}', [ProdukController::class, 'show']);
Route::get('/promo-banner', [PromoBannerController::class, 'index']);
Route::get('/testimoni', [TestimoniController::class, 'index']);