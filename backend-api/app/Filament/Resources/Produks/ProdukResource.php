<?php

namespace App\Filament\Resources\Produks;

use App\Filament\Resources\Produks\Pages\CreateProduk;
use App\Filament\Resources\Produks\Pages\EditProduk;
use App\Filament\Resources\Produks\Pages\ListProduks;
use App\Filament\Resources\Produks\Schemas\ProdukForm;
use App\Filament\Resources\Produks\Tables\ProduksTable;
use App\Models\Produk;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Filament\Forms;
use Filament\Tables;

use Filament\Forms\Form;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\IconColumn;
class ProdukResource extends Resource
{
    protected static ?string $model = Produk::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'nama_produk';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Informasi Produk')
                    ->schema([

                        TextInput::make('nama_produk')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),

                        Select::make('kategori_produk_id')
                            ->relationship('kategori', 'nama_kategori')
                            ->searchable()
                            ->preload()
                            ->required(),

                        Select::make('provider_id')
                            ->relationship('provider', 'nama_provider')
                            ->searchable()
                            ->preload()
                            ->required(),

                        Select::make('kode_pembayaran')
                            ->options([
                                'VT' => 'VT',
                                'GJ' => 'GJ',
                            ])
                            ->required(),

                        TextInput::make('tanggal_pembayaran')
                            ->required(),

                    ])
                    ->columns(2),

                Section::make('Detail Produk')
                    ->schema([

                        Textarea::make('deskripsi')
                            ->rows(4),

                        Textarea::make('catatan')
                            ->rows(4),

                        FileUpload::make('thumbnail')
                            ->image()
                            ->disk('public')
                            ->directory('produk'),
                    ]),

                Section::make('Status')
                    ->schema([

                        Toggle::make('best_seller'),

                        Toggle::make('produk_populer'),

                        Toggle::make('tampil_di_home'),

                        Toggle::make('esim'),

                        Toggle::make('unlimited'),

                        Toggle::make('status_aktif')
                            ->default(true),

                    ])
                    ->columns(3),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                ImageColumn::make('thumbnail')
                    ->square(),

                TextColumn::make('nama_produk')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('kategori.nama_kategori')
                    ->badge(),

                TextColumn::make('provider.nama_provider')
                    ->badge(),

                TextColumn::make('kode_pembayaran')
                    ->badge(),

                IconColumn::make('best_seller')
                    ->boolean(),

                IconColumn::make('status_aktif')
                    ->boolean(),

            ])
            ->defaultSort('id', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\VarianRelationManager::class,
            RelationManagers\OngkirRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProduks::route('/'),
            'create' => CreateProduk::route('/create'),
            'edit' => EditProduk::route('/{record}/edit'),
        ];
    }
}
