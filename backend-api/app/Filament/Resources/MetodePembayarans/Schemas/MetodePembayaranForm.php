<?php

namespace App\Filament\Resources\MetodePembayarans\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class MetodePembayaranForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama_metode')
                    ->required(),
                TextInput::make('kode_metode'),
                Textarea::make('deskripsi')
                    ->columnSpanFull(),
                Toggle::make('status_aktif')
                    ->required(),
            ]);
    }
}
