<?php

namespace App\Filament\Resources\VarianProduks;

use App\Filament\Resources\VarianProduks\Pages\CreateVarianProduk;
use App\Filament\Resources\VarianProduks\Pages\EditVarianProduk;
use App\Filament\Resources\VarianProduks\Pages\ListVarianProduks;
use App\Filament\Resources\VarianProduks\Schemas\VarianProdukForm;
use App\Filament\Resources\VarianProduks\Tables\VarianProduksTable;
use App\Models\VarianProduk;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class VarianProdukResource extends Resource
{
    protected static ?string $model = VarianProduk::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'varian_produk';

    public static function form(Schema $schema): Schema
    {
        return VarianProdukForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VarianProduksTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\PeriodePembelianRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListVarianProduks::route('/'),
            'create' => CreateVarianProduk::route('/create'),
            'edit' => EditVarianProduk::route('/{record}/edit'),
        ];
    }
}
