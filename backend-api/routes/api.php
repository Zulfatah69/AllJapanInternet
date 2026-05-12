<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProdukController;
use App\Http\Controllers\Api\PageController;

Route::get('/produk', [ProdukController::class, 'index']);
Route::get('/produk/{slug}', [ProdukController::class, 'show']);
Route::get('/page/{slug}', [PageController::class, 'show']);