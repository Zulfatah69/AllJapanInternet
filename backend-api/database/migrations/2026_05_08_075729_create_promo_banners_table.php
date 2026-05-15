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
        Schema::create('promo_banners', function (Blueprint $table) {

            $table->id();

            $table->string('judul');

            $table->string('sub_judul')->nullable();

            $table->string('gambar')->nullable();

            $table->string('link')->nullable();

            $table->string('tombol_text')->nullable();

            $table->integer('urutan')->default(0);

            $table->boolean('tampil_di_home')
                ->default(true);

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
        Schema::dropIfExists('promo_banners');
    }
};
