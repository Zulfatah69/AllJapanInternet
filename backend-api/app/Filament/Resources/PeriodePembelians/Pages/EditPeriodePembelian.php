<?php

namespace App\Filament\Resources\PeriodePembelians\Pages;

use App\Filament\Resources\PeriodePembelians\PeriodePembelianResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPeriodePembelian extends EditRecord
{
    protected static string $resource = PeriodePembelianResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
