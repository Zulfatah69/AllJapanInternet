<?php

use Illuminate\Database\Migrations\Migration;

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table(
            'products',
            function (Blueprint $table) {

                $table->string('code')
                    ->nullable()
                    ->after('provider');

                $table->string('type')
                    ->nullable()
                    ->after('code');

                $table->string('billing_type')
                    ->nullable()
                    ->after('type');

            }
        );
    }

    public function down(): void
    {
        Schema::table(
            'products',
            function (Blueprint $table) {

                $table->dropColumn([

                    'code',

                    'type',

                    'billing_type',

                ]);

            }
        );
    }
};