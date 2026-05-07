<?php

namespace App\Filament\Resources\MetodePembayarans;

use App\Filament\Resources\MetodePembayarans\Pages\CreateMetodePembayaran;
use App\Filament\Resources\MetodePembayarans\Pages\EditMetodePembayaran;
use App\Filament\Resources\MetodePembayarans\Pages\ListMetodePembayarans;
use App\Filament\Resources\MetodePembayarans\Schemas\MetodePembayaranForm;
use App\Filament\Resources\MetodePembayarans\Tables\MetodePembayaransTable;
use App\Models\MetodePembayaran;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class MetodePembayaranResource extends Resource
{
    protected static ?string $model = MetodePembayaran::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'nama_metode';

    public static function form(Schema $schema): Schema
    {
        return MetodePembayaranForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MetodePembayaransTable::configure($table);
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
            'index' => ListMetodePembayarans::route('/'),
            'create' => CreateMetodePembayaran::route('/create'),
            'edit' => EditMetodePembayaran::route('/{record}/edit'),
        ];
    }
}
