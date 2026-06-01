<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$tables = ['products', 'product_variants', 'billing_periods', 'product_payment_methods'];
foreach ($tables as $t) {
    echo "=== Table: {$t} ===\n";
    $columns = Illuminate\Support\Facades\DB::select("show columns from {$t}");
    foreach ($columns as $c) {
        echo "Field: {$c->Field} | Type: {$c->Type} | Null: {$c->Null} | Key: {$c->Key} | Default: {$c->Default}\n";
    }
    echo "\n";
}
