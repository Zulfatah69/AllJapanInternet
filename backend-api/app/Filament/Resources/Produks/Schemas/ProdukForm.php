<?php

namespace App\Filament\Resources\Produks\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProdukForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('kategori_produk_id')
                    ->required()
                    ->numeric(),
                Select::make('provider_id')
                    ->relationship('provider', 'id')
                    ->required(),
                TextInput::make('nama_produk')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                Select::make('kode_pembayaran')
                    ->options(['VT' => 'V t', 'GJ' => 'G j'])
                    ->required(),
                TextInput::make('tanggal_pembayaran')
                    ->required(),
                Textarea::make('deskripsi')
                    ->columnSpanFull(),
                Textarea::make('catatan')
                    ->columnSpanFull(),
                TextInput::make('thumbnail'),
                Toggle::make('best_seller')
                    ->required(),
                Toggle::make('produk_populer')
                    ->required(),
                Toggle::make('tampil_di_home')
                    ->required(),
                Toggle::make('esim')
                    ->required(),
                Toggle::make('unlimited')
                    ->required(),
                TextInput::make('urutan')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('status_aktif')
                    ->required(),
            ]);
    }
}
