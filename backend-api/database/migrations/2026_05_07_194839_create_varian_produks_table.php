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
        Schema::create('varian_produks', function (Blueprint $table) {
            $table->id();

            $table->foreignId('produk_id')
                ->constrained('produks')
                ->cascadeOnDelete();

            $table->string('nama_varian');

            $table->string('kode_varian')->nullable();

            $table->string('jumlah_gb');

            $table->decimal('harga_bulanan', 10, 2);

            $table->integer('masa_aktif_bulan')->default(1);

            $table->boolean('status_aktif')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('varian_produks');
    }
};
