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
        Schema::create('produks', function (Blueprint $table) {
            $table->id();

            $table->foreignId('kategori_produk_id')
                ->constrained('kategori_produk')
                ->cascadeOnDelete();

            $table->foreignId('provider_id')
                ->constrained('providers')
                ->cascadeOnDelete();

            $table->string('nama_produk');

            $table->string('slug')->unique();

            $table->enum('kode_pembayaran', ['VT', 'GJ']);

            $table->string('tanggal_pembayaran');

            $table->text('deskripsi')->nullable();

            $table->text('catatan')->nullable();

            $table->string('thumbnail')->nullable();

            $table->boolean('best_seller')->default(false);

            $table->boolean('produk_populer')->default(false);

            $table->boolean('tampil_di_home')->default(false);

            $table->boolean('esim')->default(false);

            $table->boolean('unlimited')->default(false);

            $table->integer('urutan')->default(0);

            $table->boolean('status_aktif')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produks');
    }
};
