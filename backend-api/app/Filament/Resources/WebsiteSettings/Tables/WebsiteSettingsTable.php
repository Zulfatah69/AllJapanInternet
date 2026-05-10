<?php

namespace App\Filament\Resources\WebsiteSettings\Tables;

use Filament\Tables\Table;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class WebsiteSettingsTable
{
    public static function configure(
        Table $table
    ): Table {

        return $table
            ->columns([

                ImageColumn::make('logo'),

                TextColumn::make('nama_website')
                    ->searchable(),

                TextColumn::make('email'),

                TextColumn::make('no_wa'),

            ]);
    }
}