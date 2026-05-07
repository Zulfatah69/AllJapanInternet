<?php

namespace App\Filament\Resources\OngkirProduks\Pages;

use App\Filament\Resources\OngkirProduks\OngkirProdukResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditOngkirProduk extends EditRecord
{
    protected static string $resource = OngkirProdukResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
