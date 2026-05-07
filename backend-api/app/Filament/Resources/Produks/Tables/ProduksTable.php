<?php

namespace App\Filament\Resources\Produks\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProduksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('kategori_produk_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('provider.id')
                    ->searchable(),
                TextColumn::make('nama_produk')
                    ->searchable(),
                TextColumn::make('slug')
                    ->searchable(),
                TextColumn::make('kode_pembayaran')
                    ->badge(),
                TextColumn::make('tanggal_pembayaran')
                    ->searchable(),
                TextColumn::make('thumbnail')
                    ->searchable(),
                IconColumn::make('best_seller')
                    ->boolean(),
                IconColumn::make('produk_populer')
                    ->boolean(),
                IconColumn::make('tampil_di_home')
                    ->boolean(),
                IconColumn::make('esim')
                    ->boolean(),
                IconColumn::make('unlimited')
                    ->boolean(),
                TextColumn::make('urutan')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('status_aktif')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
