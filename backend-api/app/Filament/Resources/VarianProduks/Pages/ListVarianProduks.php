<?php

namespace App\Filament\Resources\VarianProduks\Pages;

use App\Filament\Resources\VarianProduks\VarianProdukResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListVarianProduks extends ListRecords
{
    protected static string $resource = VarianProdukResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
