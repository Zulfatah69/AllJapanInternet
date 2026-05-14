<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(
            'variant_prices',
            function (Blueprint $table) {

                $table->id();

                $table->foreignId('product_variant_id')
                    ->constrained()
                    ->cascadeOnDelete();

                $table->foreignId('purchase_period_id')
                    ->constrained()
                    ->cascadeOnDelete();

                $table->integer('harga');

                $table->timestamps();

            }
        );
    }

    public function down(): void
    {
        Schema::dropIfExists(
            'variant_prices'
        );
    }
};