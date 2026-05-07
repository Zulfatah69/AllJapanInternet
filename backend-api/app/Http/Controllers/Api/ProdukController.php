<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    public function index(Request $request)
    {
        $query = Produk::query();

        $query->with([
            'kategori',
            'provider',
            'varian.periodePembelian',
            'ongkir.metodePembayaran'
        ]);

        if ($request->kategori) {
            $query->whereHas('kategori', function ($q) use ($request) {
                $q->where('slug', $request->kategori);
            });
        }

        if ($request->provider) {
            $query->whereHas('provider', function ($q) use ($request) {
                $q->where('slug', $request->provider);
            });
        }

        if ($request->search) {
            $query->where('nama_produk', 'like', '%' . $request->search . '%');
        }

        if ($request->best_seller) {
            $query->where('best_seller', true);
        }

        $produk = $query
            ->where('status_aktif', true)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $produk
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
        ->first();

        if (!$produk) {
            return response()->json([
                'success' => false,
                'message' => 'Produk tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $produk
        ]);
    }
}