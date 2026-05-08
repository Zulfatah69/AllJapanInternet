<?php

namespace App\Filament\Resources\CmsPages;

use App\Filament\Resources\CmsPages\Pages\CreateCmsPage;
use App\Filament\Resources\CmsPages\Pages\EditCmsPage;
use App\Filament\Resources\CmsPages\Pages\ListCmsPages;

use App\Filament\Resources\CmsPages\Schemas\CmsPageForm;
use App\Filament\Resources\CmsPages\Tables\CmsPagesTable;

use App\Models\Page;

use BackedEnum;

use Filament\Resources\Resource;

use Filament\Schemas\Schema;

use Filament\Support\Icons\Heroicon;

use Filament\Tables\Table;

class CmsPageResource extends Resource
{
    protected static ?string $model = Page::class;

    protected static string|BackedEnum|null $navigationIcon =
        Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute =
        'judul';

    protected static ?string $navigationLabel =
        'Pages';

    protected static ?string $modelLabel =
        'Page';

    protected static ?string $pluralModelLabel =
        'Pages';

    public static function form(
        Schema $schema
    ): Schema {

        return CmsPageForm::configure(
            $schema
        );
    }

    public static function table(
        Table $table
    ): Table {

        return CmsPagesTable::configure(
            $table
        );
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

            'index'
                => ListCmsPages::route('/'),

            'create'
                => CreateCmsPage::route('/create'),

            'edit'
                => EditCmsPage::route('/{record}/edit'),

        ];
    }
}