<?php

namespace App\Filament\Resources\PeriodePembelians\Pages;

use App\Filament\Resources\PeriodePembelians\PeriodePembelianResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPeriodePembelians extends ListRecords
{
    protected static string $resource = PeriodePembelianResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
