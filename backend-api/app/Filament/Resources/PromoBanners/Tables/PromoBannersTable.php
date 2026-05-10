<?php

namespace App\Filament\Resources\PromoBanners\Tables;

use Filament\Tables\Table;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\IconColumn;

class PromoBannersTable
{
    public static function configure(
        Table $table
    ): Table {

        return $table
            ->columns([

                ImageColumn::make('thumbnail'),

                TextColumn::make('judul')
                    ->searchable(),

                TextColumn::make('link')
                    ->limit(30),

                IconColumn::make('status_aktif')
                    ->boolean(),

            ]);
    }
}