<?php

namespace App\Filament\Resources\PromoBanners;

use App\Filament\Resources\PromoBanners\Pages\CreatePromoBanner;
use App\Filament\Resources\PromoBanners\Pages\EditPromoBanner;
use App\Filament\Resources\PromoBanners\Pages\ListPromoBanners;
use App\Filament\Resources\PromoBanners\Schemas\PromoBannerForm;
use App\Filament\Resources\PromoBanners\Tables\PromoBannersTable;
use App\Models\PromoBanner;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PromoBannerResource extends Resource
{
    protected static ?string $model = PromoBanner::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'promo';

    public static function form(Schema $schema): Schema
    {
        return PromoBannerForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PromoBannersTable::configure($table);
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
            'index' => ListPromoBanners::route('/'),
            'create' => CreatePromoBanner::route('/create'),
            'edit' => EditPromoBanner::route('/{record}/edit'),
        ];
    }
}
