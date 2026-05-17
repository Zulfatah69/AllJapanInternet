<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('promos', function (Blueprint $table) {

            $table->id();

            $table->string('judul');

            $table->text('deskripsi')
                ->nullable();

            $table->string('gambar')
                ->nullable();

            $table->string('link')
                ->nullable();

            $table->boolean('is_active')
                ->default(true);

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('promos');
    }
};