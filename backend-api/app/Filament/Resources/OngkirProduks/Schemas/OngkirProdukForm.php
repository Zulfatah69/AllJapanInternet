<?php

namespace App\Filament\Resources\OngkirProduks\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class OngkirProdukForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('produk_id')
                    ->relationship('produk', 'id')
                    ->required(),
                Select::make('metode_pembayaran_id')
                    ->relationship('metodePembayaran', 'id')
                    ->required(),
                TextInput::make('harga_ongkir')
                    ->required()
                    ->numeric(),
                Textarea::make('catatan')
                    ->columnSpanFull(),
            ]);
    }
}
