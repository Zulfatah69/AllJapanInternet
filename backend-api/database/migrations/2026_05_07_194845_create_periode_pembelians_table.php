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
        Schema::create('periode_pembelians', function (Blueprint $table) {
            $table->id();

            $table->foreignId('varian_produk_id')
                ->constrained('varian_produks')
                ->cascadeOnDelete();

            $table->string('nama_periode');

            $table->integer('tanggal_mulai');

            $table->integer('tanggal_selesai');

            $table->decimal('harga_awal', 10, 2);

            $table->text('catatan')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('periode_pembelians');
    }
};
