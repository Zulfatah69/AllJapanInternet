<?php

namespace App\Filament\Resources\SeoPages;

use App\Filament\Resources\SeoPages\Pages\CreateSeoPage;
use App\Filament\Resources\SeoPages\Pages\EditSeoPage;
use App\Filament\Resources\SeoPages\Pages\ListSeoPages;
use App\Filament\Resources\SeoPages\Schemas\SeoPageForm;
use App\Filament\Resources\SeoPages\Tables\SeoPagesTable;
use App\Models\SeoPage;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;

use Filament\Schemas\Components\Section;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
class SeoPageResource extends Resource
{
    protected static ?string $model = SeoPage::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'halaman';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('SEO Setting')
                    ->schema([

                        TextInput::make('halaman')
                            ->required(),

                        TextInput::make('meta_title')
                            ->required(),

                        Textarea::make('meta_description')
                            ->rows(5),

                        Textarea::make('meta_keyword')
                            ->rows(3),

                        FileUpload::make('og_image')
                            ->image()
                            ->directory('seo'),

                        Toggle::make('status_aktif')
                            ->default(true),

                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('halaman')
                    ->searchable(),

                TextColumn::make('meta_title')
                    ->limit(50),

                IconColumn::make('status_aktif')
                    ->boolean(),

            ]);
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
            'index' => ListSeoPages::route('/'),
            'create' => CreateSeoPage::route('/create'),
            'edit' => EditSeoPage::route('/{record}/edit'),
        ];
    }
}
