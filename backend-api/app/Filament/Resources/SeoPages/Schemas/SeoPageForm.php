<?php

namespace App\Filament\Resources\SeoPages\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SeoPageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('halaman')
                    ->required(),
                TextInput::make('meta_title')
                    ->required(),
                Textarea::make('meta_description')
                    ->columnSpanFull(),
                Textarea::make('meta_keyword')
                    ->columnSpanFull(),
                FileUpload::make('og_image')
                    ->image()
                    ->disk('public')
                    ->directory('seo'),
                Toggle::make('status_aktif')
                    ->required(),
            ]);
    }
}
