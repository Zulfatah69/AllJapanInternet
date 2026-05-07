<?php

namespace App\Filament\Resources\OngkirProduks\Pages;

use App\Filament\Resources\OngkirProduks\OngkirProdukResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListOngkirProduks extends ListRecords
{
    protected static string $resource = OngkirProdukResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
