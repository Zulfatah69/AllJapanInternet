<?php

namespace App\Filament\Resources\VarianProduks\RelationManagers;

use App\Filament\Resources\PeriodePembelians\PeriodePembelianResource;

use Filament\Resources\RelationManagers\RelationManager;

use Filament\Schemas\Schema;
use Filament\Tables\Table;

use Filament\Actions\CreateAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;

use Filament\Tables\Columns\TextColumn;

class PeriodePembelianRelationManager extends RelationManager
{
    protected static string $relationship = 'periodePembelian';

    protected static ?string $relatedResource = PeriodePembelianResource::class;

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('nama_periode')
                    ->required(),

                TextInput::make('tanggal_mulai')
                    ->numeric()
                    ->required(),

                TextInput::make('tanggal_selesai')
                    ->numeric()
                    ->required(),

                TextInput::make('harga_awal')
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

                TextColumn::make('nama_periode'),

                TextColumn::make('tanggal_mulai'),

                TextColumn::make('tanggal_selesai'),

                TextColumn::make('harga_awal')
                    ->money('JPY'),

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