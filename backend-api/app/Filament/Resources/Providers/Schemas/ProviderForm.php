<?php

namespace App\Filament\Resources\Providers\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProviderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama_provider')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('logo'),
                Textarea::make('deskripsi')
                    ->columnSpanFull(),
                Toggle::make('status_aktif')
                    ->required(),
            ]);
    }
}
