<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('testimonis', function (Blueprint $table) {

            $table->id();

            $table->string('nama');

            $table->string('foto')->nullable();

            $table->string('pekerjaan')->nullable();

            $table->integer('rating')->default(5);

            $table->text('isi_testimoni');

            $table->integer('urutan')->default(0);

            $table->boolean('status_aktif')
                ->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonis');
    }
};
