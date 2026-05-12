<?php

namespace App\Filament\Resources\PromoBanners\Pages;

use App\Filament\Resources\PromoBanners\PromoBannerResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewPromoBanner extends ViewRecord
{
    protected static string $resource = PromoBannerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
