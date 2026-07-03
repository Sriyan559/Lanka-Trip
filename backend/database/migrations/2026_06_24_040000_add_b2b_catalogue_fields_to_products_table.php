<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            if (! Schema::hasColumn('products', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('products', 'sku')) {
                $table->string('sku')->nullable()->unique()->after('slug');
            }

            if (! Schema::hasColumn('products', 'moq_unit')) {
                $table->string('moq_unit', 50)->nullable()->after('moq');
            }

            if (! Schema::hasColumn('products', 'fob_price_min')) {
                $table->decimal('fob_price_min', 12, 2)->nullable()->after('price');
            }

            if (! Schema::hasColumn('products', 'fob_price_max')) {
                $table->decimal('fob_price_max', 12, 2)->nullable()->after('fob_price_min');
            }

            if (! Schema::hasColumn('products', 'currency_id')) {
                $table->foreignId('currency_id')
                    ->nullable()
                    ->after('fob_price_max')
                    ->constrained('currencies')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('products', 'lead_time_days')) {
                $table->unsignedInteger('lead_time_days')->nullable()->after('lead_time');
            }

            if (! Schema::hasColumn('products', 'approval_status')) {
                $table->string('approval_status', 30)->default('pending')->index()->after('status');
            }

            if (! Schema::hasColumn('products', 'published_at')) {
                $table->timestamp('published_at')->nullable()->index()->after('approval_status');
            }

            $table->index('supplier_id', 'products_supplier_id_catalogue_index');
            $table->index('created_at', 'products_created_at_catalogue_index');
            $table->index(['supplier_id', 'status'], 'products_supplier_status_catalogue_index');
            $table->index(['category_id', 'approval_status'], 'products_category_approval_catalogue_index');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_category_approval_catalogue_index');
            $table->dropIndex('products_supplier_status_catalogue_index');
            $table->dropIndex('products_created_at_catalogue_index');
            $table->dropIndex('products_supplier_id_catalogue_index');

            if (Schema::hasColumn('products', 'currency_id')) {
                $table->dropConstrainedForeignId('currency_id');
            }

            $table->dropColumn([
                'uuid',
                'sku',
                'moq_unit',
                'fob_price_min',
                'fob_price_max',
                'lead_time_days',
                'approval_status',
                'published_at',
            ]);
        });
    }
};
