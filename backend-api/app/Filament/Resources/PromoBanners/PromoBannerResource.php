<?php

namespace App\Filament\Resources\PromoBanners;

use App\Filament\Resources\PromoBanners\Pages\CreatePromoBanner;
use App\Filament\Resources\PromoBanners\Pages\EditPromoBanner;
use App\Filament\Resources\PromoBanners\Pages\ListPromoBanners;
use App\Filament\Resources\PromoBanners\Pages\ViewPromoBanner;
use App\Filament\Resources\PromoBanners\Schemas\PromoBannerForm;
use App\Filament\Resources\PromoBanners\Schemas\PromoBannerInfolist;
use App\Filament\Resources\PromoBanners\Tables\PromoBannersTable;
use App\Models\PromoBanner;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\IconColumn;
class PromoBannerResource extends Resource
{
    protected static ?string $model = PromoBanner::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'judul';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Banner Promo')
                    ->schema([

                        TextInput::make('judul')
                            ->required(),

                        TextInput::make('sub_judul'),

                        TextInput::make('link'),

                        TextInput::make('tombol_text'),

                        TextInput::make('urutan')
                            ->numeric()
                            ->default(0),

                        FileUpload::make('gambar')
                            ->image()
                            ->directory('promo')
                            ->disk('public')
                            ->directory('produk'),

                        Toggle::make('tampil_di_home')
                            ->default(true),

                        Toggle::make('status_aktif')
                            ->default(true),

                    ])
                    ->columns(2),
            ]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PromoBannerInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                ImageColumn::make('gambar')
                    ->square(),

                TextColumn::make('judul')
                    ->searchable(),

                TextColumn::make('urutan'),

                IconColumn::make('tampil_di_home')
                    ->boolean(),

                IconColumn::make('status_aktif')
                    ->boolean(),

            ])
            ->defaultSort('urutan');
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
            'view' => ViewPromoBanner::route('/{record}'),
            'edit' => EditPromoBanner::route('/{record}/edit'),
        ];
    }
}
