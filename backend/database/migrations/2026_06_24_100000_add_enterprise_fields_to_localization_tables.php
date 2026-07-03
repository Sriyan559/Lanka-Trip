<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('countries', function (Blueprint $table) {
            if (! Schema::hasColumn('countries', 'iso3_code')) {
                $table->string('iso3_code', 3)->nullable()->unique()->after('iso3');
            }

            if (! Schema::hasColumn('countries', 'default_currency_id')) {
                $table->foreignId('default_currency_id')->nullable()->after('phone_code')->constrained('currencies')->nullOnDelete();
            }

            if (! Schema::hasColumn('countries', 'default_language_id')) {
                $table->foreignId('default_language_id')->nullable()->after('default_currency_id')->constrained('languages')->nullOnDelete();
            }

            if (! Schema::hasColumn('countries', 'region')) {
                $table->string('region')->nullable()->index()->after('default_language_id');
            }

            if (! Schema::hasColumn('countries', 'is_supported_market')) {
                $table->boolean('is_supported_market')->default(false)->index()->after('region');
            }

            if (! Schema::hasColumn('countries', 'is_export_destination')) {
                $table->boolean('is_export_destination')->default(true)->index()->after('is_supported_market');
            }

            if (! Schema::hasColumn('countries', 'metadata')) {
                $table->jsonb('metadata')->nullable()->after('is_export_destination');
            }

            if (! Schema::hasColumn('countries', 'deleted_at')) {
                $table->softDeletes();
            }

            $table->index(['default_currency_id', 'status'], 'countries_default_currency_status_index');
            $table->index(['default_language_id', 'status'], 'countries_default_language_status_index');
        });

        Schema::table('currencies', function (Blueprint $table) {
            if (! Schema::hasColumn('currencies', 'exchange_rate')) {
                $table->decimal('exchange_rate', 18, 8)->default(1)->after('decimal_places');
            }

            if (! Schema::hasColumn('currencies', 'is_default')) {
                $table->boolean('is_default')->default(false)->index()->after('exchange_rate');
            }

            if (! Schema::hasColumn('currencies', 'metadata')) {
                $table->jsonb('metadata')->nullable()->after('is_default');
            }

            if (! Schema::hasColumn('currencies', 'deleted_at')) {
                $table->softDeletes();
            }
        });

        Schema::table('languages', function (Blueprint $table) {
            if (! Schema::hasColumn('languages', 'direction')) {
                $table->string('direction', 10)->default('ltr')->index()->after('native_name');
            }

            if (! Schema::hasColumn('languages', 'is_default')) {
                $table->boolean('is_default')->default(false)->index()->after('direction');
            }

            if (! Schema::hasColumn('languages', 'is_enabled')) {
                $table->boolean('is_enabled')->default(true)->index()->after('is_default');
            }

            if (! Schema::hasColumn('languages', 'metadata')) {
                $table->jsonb('metadata')->nullable()->after('is_enabled');
            }

            if (! Schema::hasColumn('languages', 'deleted_at')) {
                $table->softDeletes();
            }
        });
    }

    public function down(): void
    {
        Schema::table('languages', function (Blueprint $table) {
            $table->dropColumn(['direction', 'is_default', 'is_enabled', 'metadata']);

            if (Schema::hasColumn('languages', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });

        Schema::table('currencies', function (Blueprint $table) {
            $table->dropColumn(['exchange_rate', 'is_default', 'metadata']);

            if (Schema::hasColumn('currencies', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });

        Schema::table('countries', function (Blueprint $table) {
            $table->dropIndex('countries_default_language_status_index');
            $table->dropIndex('countries_default_currency_status_index');

            if (Schema::hasColumn('countries', 'default_language_id')) {
                $table->dropConstrainedForeignId('default_language_id');
            }

            if (Schema::hasColumn('countries', 'default_currency_id')) {
                $table->dropConstrainedForeignId('default_currency_id');
            }

            $table->dropColumn([
                'iso3_code',
                'region',
                'is_supported_market',
                'is_export_destination',
                'metadata',
            ]);

            if (Schema::hasColumn('countries', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });
    }
};
