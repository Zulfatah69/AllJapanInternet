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
        Schema::create('seo_pages', function (Blueprint $table) {

            $table->id();

            $table->string('halaman')->unique();

            $table->string('meta_title');

            $table->text('meta_description')
                ->nullable();

            $table->text('meta_keyword')
                ->nullable();

            $table->string('og_image')
                ->nullable();

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
        Schema::dropIfExists('seo_pages');
    }
};
