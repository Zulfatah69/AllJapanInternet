<?php

namespace App\Filament\Resources\PeriodePembelians\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class PeriodePembelianForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('varian_produk_id')
                    ->relationship('varianProduk', 'id')
                    ->required(),
                TextInput::make('nama_periode')
                    ->required(),
                TextInput::make('tanggal_mulai')
                    ->required()
                    ->numeric(),
                TextInput::make('tanggal_selesai')
                    ->required()
                    ->numeric(),
                TextInput::make('harga_awal')
                    ->required()
                    ->numeric(),
                Textarea::make('catatan')
                    ->columnSpanFull(),
            ]);
    }
}
