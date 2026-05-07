<?php

namespace App\Filament\Resources\PeriodePembelians;

use App\Filament\Resources\PeriodePembelians\Pages\CreatePeriodePembelian;
use App\Filament\Resources\PeriodePembelians\Pages\EditPeriodePembelian;
use App\Filament\Resources\PeriodePembelians\Pages\ListPeriodePembelians;
use App\Filament\Resources\PeriodePembelians\Schemas\PeriodePembelianForm;
use App\Filament\Resources\PeriodePembelians\Tables\PeriodePembeliansTable;
use App\Models\PeriodePembelian;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PeriodePembelianResource extends Resource
{
    protected static ?string $model = PeriodePembelian::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'nama_pembelian';

    public static function form(Schema $schema): Schema
    {
        return PeriodePembelianForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PeriodePembeliansTable::configure($table);
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
            'index' => ListPeriodePembelians::route('/'),
            'create' => CreatePeriodePembelian::route('/create'),
            'edit' => EditPeriodePembelian::route('/{record}/edit'),
        ];
    }
}
