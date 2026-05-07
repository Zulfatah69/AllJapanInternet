<?php

namespace App\Filament\Resources\VarianProduks\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class VarianProdukForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('produk_id')
                    ->relationship('produk', 'id')
                    ->required(),
                TextInput::make('nama_varian')
                    ->required(),
                TextInput::make('kode_varian'),
                TextInput::make('jumlah_gb')
                    ->required(),
                TextInput::make('harga_bulanan')
                    ->required()
                    ->numeric(),
                TextInput::make('masa_aktif_bulan')
                    ->required()
                    ->numeric()
                    ->default(1),
                Toggle::make('status_aktif')
                    ->required(),
            ]);
    }
}
