<?php

namespace App\Filament\Resources\VarianProduks\Pages;

use App\Filament\Resources\VarianProduks\VarianProdukResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditVarianProduk extends EditRecord
{
    protected static string $resource = VarianProdukResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
