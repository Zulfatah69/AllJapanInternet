<?php

namespace App\Filament\Resources\OngkirProduks;

use App\Filament\Resources\OngkirProduks\Pages\CreateOngkirProduk;
use App\Filament\Resources\OngkirProduks\Pages\EditOngkirProduk;
use App\Filament\Resources\OngkirProduks\Pages\ListOngkirProduks;
use App\Filament\Resources\OngkirProduks\Schemas\OngkirProdukForm;
use App\Filament\Resources\OngkirProduks\Tables\OngkirProduksTable;
use App\Models\OngkirProduk;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class OngkirProdukResource extends Resource
{
    protected static ?string $model = OngkirProduk::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'ongkir_produk';

    public static function form(Schema $schema): Schema
    {
        return OngkirProdukForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OngkirProduksTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOngkirProduks::route('/'),
            'create' => CreateOngkirProduk::route('/create'),
            'edit' => EditOngkirProduk::route('/{record}/edit'),
        ];
    }
}
