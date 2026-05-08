<?php

namespace App\Filament\Resources\WebsiteSettings;

use App\Filament\Resources\WebsiteSettings\Pages\CreateWebsiteSetting;
use App\Filament\Resources\WebsiteSettings\Pages\EditWebsiteSetting;
use App\Filament\Resources\WebsiteSettings\Pages\ListWebsiteSettings;
use App\Filament\Resources\WebsiteSettings\Schemas\WebsiteSettingForm;
use App\Filament\Resources\WebsiteSettings\Tables\WebsiteSettingsTable;
use App\Models\WebsiteSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class WebsiteSettingResource extends Resource
{
    protected static ?string $model = WebsiteSetting::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'set-web';

    public static function form(Schema $schema): Schema
    {
        return WebsiteSettingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return WebsiteSettingsTable::configure($table);
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
            'index' => ListWebsiteSettings::route('/'),
            'create' => CreateWebsiteSetting::route('/create'),
            'edit' => EditWebsiteSetting::route('/{record}/edit'),
        ];
    }
}
