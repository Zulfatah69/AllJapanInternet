<?php

namespace App\Filament\Resources\CmsPages\Tables;

use Filament\Tables\Table;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;

class CmsPagesTable
{
    public static function configure(
        Table $table
    ): Table {

        return $table
            ->columns([

                TextColumn::make('judul')
                    ->searchable(),

                TextColumn::make('slug')
                    ->badge(),

                IconColumn::make('status_aktif')
                    ->boolean(),

            ]);
    }
}