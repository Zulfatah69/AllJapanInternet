<?php

namespace App\Filament\Resources\Produks\RelationManagers;

use App\Filament\Resources\VarianProduks\VarianProdukResource;

use Filament\Resources\RelationManagers\RelationManager;

use Filament\Tables\Table;
use Filament\Schemas\Schema;

use Filament\Actions\CreateAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;

class VarianRelationManager extends RelationManager
{
    protected static string $relationship = 'varian';

    protected static ?string $relatedResource = VarianProdukResource::class;

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('nama_varian')
                    ->required()
                    ->maxLength(255),

                TextInput::make('kode_varian')
                    ->maxLength(255),

                TextInput::make('jumlah_gb')
                    ->required()
                    ->maxLength(255),

                TextInput::make('harga_bulanan')
                    ->numeric()
                    ->required(),

                TextInput::make('masa_aktif_bulan')
                    ->numeric()
                    ->default(1),

                Toggle::make('status_aktif')
                    ->default(true),

            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('nama_varian')
                    ->searchable(),

                TextColumn::make('jumlah_gb')
                    ->badge(),

                TextColumn::make('harga_bulanan')
                    ->money('JPY')
                    ->sortable(),

                TextColumn::make('masa_aktif_bulan'),

                IconColumn::make('status_aktif')
                    ->boolean(),

            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }
}