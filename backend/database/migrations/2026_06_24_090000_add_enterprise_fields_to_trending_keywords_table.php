<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('trending_keywords', function (Blueprint $table) {
            if (! Schema::hasColumn('trending_keywords', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('trending_keywords', 'search_count')) {
                $table->unsignedBigInteger('search_count')->default(0)->index()->after('keyword');
            }

            if (! Schema::hasColumn('trending_keywords', 'click_count')) {
                $table->unsignedBigInteger('click_count')->default(0)->index()->after('search_count');
            }

            if (! Schema::hasColumn('trending_keywords', 'conversion_count')) {
                $table->unsignedBigInteger('conversion_count')->default(0)->index()->after('click_count');
            }

            if (! Schema::hasColumn('trending_keywords', 'category_id')) {
                $table->foreignId('category_id')
                    ->nullable()
                    ->after('conversion_count')
                    ->constrained('categories')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('trending_keywords', 'country_id')) {
                $table->foreignId('country_id')
                    ->nullable()
                    ->after('category_id')
                    ->constrained('countries')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('trending_keywords', 'language_id')) {
                $table->foreignId('language_id')
                    ->nullable()
                    ->after('country_id')
                    ->constrained('languages')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('trending_keywords', 'trend_date')) {
                $table->date('trend_date')->nullable()->index()->after('language_id');
            }

            if (! Schema::hasColumn('trending_keywords', 'metadata')) {
                $table->jsonb('metadata')->nullable()->after('sort_order');
            }

            if (! Schema::hasColumn('trending_keywords', 'deleted_at')) {
                $table->softDeletes();
            }

            $table->index(['category_id', 'status'], 'trending_keywords_category_status_index');
            $table->index(['country_id', 'trend_date'], 'trending_keywords_country_trend_date_index');
            $table->index(['language_id', 'trend_date'], 'trending_keywords_language_trend_date_index');
            $table->index('created_at', 'trending_keywords_created_at_enterprise_index');
        });
    }

    public function down(): void
    {
        Schema::table('trending_keywords', function (Blueprint $table) {
            $table->dropIndex('trending_keywords_created_at_enterprise_index');
            $table->dropIndex('trending_keywords_language_trend_date_index');
            $table->dropIndex('trending_keywords_country_trend_date_index');
            $table->dropIndex('trending_keywords_category_status_index');

            if (Schema::hasColumn('trending_keywords', 'language_id')) {
                $table->dropConstrainedForeignId('language_id');
            }

            if (Schema::hasColumn('trending_keywords', 'country_id')) {
                $table->dropConstrainedForeignId('country_id');
            }

            if (Schema::hasColumn('trending_keywords', 'category_id')) {
                $table->dropConstrainedForeignId('category_id');
            }

            $table->dropColumn([
                'uuid',
                'search_count',
                'click_count',
                'conversion_count',
                'trend_date',
                'metadata',
            ]);

            if (Schema::hasColumn('trending_keywords', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });
    }
};
