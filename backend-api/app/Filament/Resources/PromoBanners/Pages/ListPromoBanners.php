<?php

namespace App\Filament\Resources\PromoBanners\Pages;

use App\Filament\Resources\PromoBanners\PromoBannerResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPromoBanners extends ListRecords
{
    protected static string $resource = PromoBannerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
