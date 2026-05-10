<?php

namespace App\Filament\Resources\Testimonis\Tables;

use Filament\Tables\Table;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\IconColumn;

class TestimonisTable
{
    public static function configure(
        Table $table
    ): Table {

        return $table
            ->columns([

                ImageColumn::make('foto'),

                TextColumn::make('nama')
                    ->searchable(),

                TextColumn::make('pekerjaan'),

                TextColumn::make('rating'),

                IconColumn::make('status_aktif')
                    ->boolean(),

            ]);
    }
}