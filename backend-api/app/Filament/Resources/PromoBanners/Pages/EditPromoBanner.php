<?php

namespace App\Filament\Resources\PromoBanners\Pages;

use App\Filament\Resources\PromoBanners\PromoBannerResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPromoBanner extends EditRecord
{
    protected static string $resource = PromoBannerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
