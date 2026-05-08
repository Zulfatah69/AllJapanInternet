<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProdukResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'nama_produk' => $this->nama_produk,

            'slug' => $this->slug,

            'thumbnail' => $this->thumbnail
                ? asset('storage/' . $this->thumbnail)
                : null,

            'deskripsi' => $this->deskripsi,

            'catatan' => $this->catatan,

            'best_seller' => $this->best_seller,

            'produk_populer' => $this->produk_populer,

            'provider' => [
                'id' => $this->provider?->id,
                'nama_provider' => $this->provider?->nama_provider,
                'slug' => $this->provider?->slug,
            ],

            'kategori' => [
                'id' => $this->kategori?->id,
                'nama_kategori' => $this->kategori?->nama_kategori,
                'slug' => $this->kategori?->slug,
            ],

            'varian' => $this->varian->map(function ($varian) {
                return [

                    'id' => $varian->id,

                    'nama_varian' => $varian->nama_varian,

                    'jumlah_gb' => $varian->jumlah_gb,

                    'harga_bulanan' => $varian->harga_bulanan,

                    'masa_aktif_bulan' => $varian->masa_aktif_bulan,

                    'periode_pembelian' =>
                        $varian->periodePembelian->map(function ($periode) {

                            return [
                                'id' => $periode->id,

                                'nama_periode' => $periode->nama_periode,

                                'tanggal_mulai' => $periode->tanggal_mulai,

                                'tanggal_selesai' => $periode->tanggal_selesai,

                                'harga_awal' => $periode->harga_awal,
                            ];
                        }),
                ];
            }),

            'ongkir' => $this->ongkir->map(function ($ongkir) {

                return [

                    'id' => $ongkir->id,

                    'harga_ongkir' => $ongkir->harga_ongkir,

                    'metode_pembayaran' => [
                        'id' => $ongkir->metodePembayaran?->id,

                        'nama_metode' =>
                            $ongkir->metodePembayaran?->nama_metode,
                    ],
                ];
            }),
        ];
    }
}