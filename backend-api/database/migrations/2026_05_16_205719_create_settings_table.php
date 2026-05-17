<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {

            $table->id();

            $table->string('website_name')
                ->nullable();

            $table->string('logo')
                ->nullable();

            $table->string('favicon')
                ->nullable();

            $table->string('whatsapp')
                ->nullable();

            $table->string('telegram')
                ->nullable();

            $table->string('line')
                ->nullable();

            $table->string('email')
                ->nullable();

            $table->string('instagram')
                ->nullable();

            $table->string('tiktok')
                ->nullable();

            $table->string('youtube')
                ->nullable();

            $table->text('footer_text')
                ->nullable();

            $table->string('theme')
                ->default('spring');

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};