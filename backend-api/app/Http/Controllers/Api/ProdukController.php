<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Http\Request;
use App\Http\Resources\ProdukResource;
class ProdukController extends Controller
{
    public function index(Request $request)
    {
        $query = Produk::with([
            'kategori',
            'provider',
            'varian',
        ])
        ->where('status_aktif', true);

        if ($request->best_seller) {

            $query->where(
                'best_seller',
                true
            );
        }

        if ($request->provider) {

            $query->whereHas(
                'provider',
                function ($q) use ($request) {

                    $q->where(
                        'slug',
                        $request->provider
                    );
                }
            );
        }

        if ($request->kategori) {

            $query->whereHas(
                'kategori',
                function ($q) use ($request) {

                    $q->where(
                        'slug',
                        $request->kategori
                    );
                }
            );
        }

        if ($request->search) {

            $query->where(
                'nama_produk',
                'like',
                '%' . $request->search . '%'
            );
        }

        $produk = $query
            ->latest()
            ->get();

        return response()->json([

            'success' => true,

            'data' =>
                \App\Http\Resources\ProdukResource::collection($produk),
        ]);
    }

    public function show($slug)
    {
        $produk = Produk::with([
            'kategori',
            'provider',
            'varian.periodePembelian',
            'ongkir.metodePembayaran'
        ])
        ->where('slug', $slug)
        ->where('status_aktif', true)
        ->first();

        if (!$produk) {

            return response()->json([
                'success' => false,
                'message' => 'Produk tidak ditemukan'
            ], 404);
        }

        $related = Produk::where(
                'kategori_produk_id',
                $produk->kategori_produk_id
            )
            ->where('id', '!=', $produk->id)
            ->where('status_aktif', true)
            ->take(4)
            ->get();

        return response()->json([

            'success' => true,

            'data' => new \App\Http\Resources\ProdukResource($produk),

            'related_product' =>
                \App\Http\Resources\ProdukResource::collection($related),
        ]);
    }
}