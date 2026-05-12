<?php

namespace App\Filament\Resources\Testimonis;

use App\Filament\Resources\Testimonis\Pages\CreateTestimoni;
use App\Filament\Resources\Testimonis\Pages\EditTestimoni;
use App\Filament\Resources\Testimonis\Pages\ListTestimonis;
use App\Filament\Resources\Testimonis\Pages\ViewTestimoni;
use App\Filament\Resources\Testimonis\Schemas\TestimoniForm;
use App\Filament\Resources\Testimonis\Schemas\TestimoniInfolist;
use App\Filament\Resources\Testimonis\Tables\TestimonisTable;
use App\Models\Testimoni;
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
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\IconColumn;

class TestimoniResource extends Resource
{
    protected static ?string $model = Testimoni::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'nama';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Testimoni')
                    ->schema([

                        TextInput::make('nama')
                            ->required(),

                        TextInput::make('pekerjaan'),

                        TextInput::make('rating')
                            ->numeric()
                            ->minValue(1)
                            ->maxValue(5)
                            ->default(5),

                        TextInput::make('urutan')
                            ->numeric()
                            ->default(0),

                        FileUpload::make('foto')
                            ->image()
                            ->directory('testimoni'),

                        Textarea::make('isi_testimoni')
                            ->rows(5)
                            ->required(),

                        Toggle::make('status_aktif')
                            ->default(true),

                    ])
                    ->columns(2),
            ]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return TestimoniInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                ImageColumn::make('foto')
                    ->square(),

                TextColumn::make('nama')
                    ->searchable(),

                TextColumn::make('pekerjaan'),

                TextColumn::make('rating'),

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
            'index' => ListTestimonis::route('/'),
            'create' => CreateTestimoni::route('/create'),
            'view' => ViewTestimoni::route('/{record}'),
            'edit' => EditTestimoni::route('/{record}/edit'),
        ];
    }
}
