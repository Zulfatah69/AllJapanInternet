<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {

            $table->id();

            $table->foreignId('category_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('provider_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('nama');

            $table->string('slug');

            $table->enum('type', [
                'monthly',
                'yearly'
            ]);
            $table->enum('cycle_type', [
                'VT',
                'GJ'
            ])->nullable();
            $table->longText('deskripsi')
                ->nullable();

            $table->string('thumbnail')
                ->nullable();

            $table->boolean('best_seller')
                ->default(false);

            $table->boolean('is_active')
                ->default(true);

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists(
            'products'
        );
    }
};