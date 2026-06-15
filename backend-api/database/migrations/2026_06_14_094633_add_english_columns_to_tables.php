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
        if (!Schema::hasColumn('categories', 'nama_en')) {
            Schema::table('categories', function (Blueprint $table) {
                $table->string('nama_en')->nullable()->after('nama');
            });
        }

        if (!Schema::hasColumn('products', 'nama_en')) {
            Schema::table('products', function (Blueprint $table) {
                $table->string('nama_en')->nullable()->after('nama');
                $table->longText('deskripsi_en')->nullable()->after('deskripsi');
            });
        }

        if (!Schema::hasColumn('simple_products', 'nama_en')) {
            Schema::table('simple_products', function (Blueprint $table) {
                $table->string('nama_en')->nullable()->after('nama');
                $table->longText('deskripsi_en')->nullable()->after('deskripsi');
            });
        }

        if (!Schema::hasColumn('product_variants', 'nama_en')) {
            Schema::table('product_variants', function (Blueprint $table) {
                $table->string('nama_en')->nullable()->after('nama');
            });
        }

        if (!Schema::hasColumn('billing_periods', 'nama_en')) {
            Schema::table('billing_periods', function (Blueprint $table) {
                $table->string('nama_en')->nullable()->after('nama');
            });
        }

        if (!Schema::hasColumn('promos', 'judul_en')) {
            Schema::table('promos', function (Blueprint $table) {
                $table->string('judul_en')->nullable()->after('judul');
                $table->text('deskripsi_en')->nullable()->after('deskripsi');
            });
        }

        if (!Schema::hasColumn('settings', 'footer_text_en')) {
            Schema::table('settings', function (Blueprint $table) {
                $table->text('footer_text_en')->nullable()->after('footer_text');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('nama_en');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['nama_en', 'deskripsi_en']);
        });

        Schema::table('simple_products', function (Blueprint $table) {
            $table->dropColumn(['nama_en', 'deskripsi_en']);
        });

        Schema::table('product_variants', function (Blueprint $table) {
            $table->dropColumn('nama_en');
        });

        Schema::table('billing_periods', function (Blueprint $table) {
            $table->dropColumn('nama_en');
        });

        Schema::table('promos', function (Blueprint $table) {
            $table->dropColumn(['judul_en', 'deskripsi_en']);
        });

        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn('footer_text_en');
        });
    }
};
