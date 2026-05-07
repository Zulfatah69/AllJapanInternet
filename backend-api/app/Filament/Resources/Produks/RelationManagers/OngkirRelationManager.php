<?php

namespace App\Filament\Resources\Produks\RelationManagers;

use App\Filament\Resources\OngkirProduks\OngkirProdukResource;

use Filament\Resources\RelationManagers\RelationManager;

use Filament\Schemas\Schema;
use Filament\Tables\Table;

use Filament\Actions\CreateAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;

use Filament\Tables\Columns\TextColumn;

class OngkirRelationManager extends RelationManager
{
    protected static string $relationship = 'ongkir';

    protected static ?string $relatedResource = OngkirProdukResource::class;

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([

                Select::make('metode_pembayaran_id')
                    ->relationship('metodePembayaran', 'nama_metode')
                    ->searchable()
                    ->preload()
                    ->required(),

                TextInput::make('harga_ongkir')
                    ->numeric()
                    ->required(),

                Textarea::make('catatan')
                    ->rows(3),

            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('metodePembayaran.nama_metode')
                    ->badge(),

                TextColumn::make('harga_ongkir')
                    ->money('JPY'),

                TextColumn::make('catatan')
                    ->limit(30),

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