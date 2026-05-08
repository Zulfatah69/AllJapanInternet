<?php

namespace App\Filament\Resources\Pages;

use App\Filament\Resources\Pages\Pages\CreatePage;
use App\Filament\Resources\Pages\Pages\EditPage;
use App\Filament\Resources\Pages\Pages\ListPages;
use App\Filament\Resources\Pages\Schemas\PageForm;
use App\Filament\Resources\Pages\Tables\PagesTable;
use App\Models\Page;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Toggle;

use Filament\Schemas\Components\Section;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
class PageResource extends Resource
{
    protected static ?string $model = Page::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'judul';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Halaman')
                    ->schema([

                        TextInput::make('judul')
                            ->required(),

                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),

                        FileUpload::make('thumbnail')
                            ->image()
                            ->directory('page')
                            ->disk('public')
                            ->directory('produk'),

                        RichEditor::make('konten')
                            ->required()
                            ->columnSpanFull(),

                        Toggle::make('status_aktif')
                            ->default(true),

                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('judul')
                    ->searchable(),

                TextColumn::make('slug'),

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
            'index' => ListPages::route('/'),
            'create' => CreatePage::route('/create'),
            'edit' => EditPage::route('/{record}/edit'),
        ];
    }
}
