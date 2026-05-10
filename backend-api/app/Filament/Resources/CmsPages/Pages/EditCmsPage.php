<?php

namespace App\Filament\Resources\CmsPages\Pages;

use App\Filament\Resources\CmsPages\CmsPageResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCmsPage extends EditRecord
{
    protected static string $resource = CmsPageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
