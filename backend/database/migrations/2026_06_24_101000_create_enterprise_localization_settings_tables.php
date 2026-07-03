<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('setting_groups')) {
            Schema::create('setting_groups', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('group_key')->unique();
                $table->string('name');
                $table->text('description')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('system_settings')) {
            Schema::create('system_settings', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('setting_group_id')->nullable()->constrained('setting_groups')->nullOnDelete();
                $table->string('setting_key')->unique();
                $table->string('setting_type', 50)->default('string')->index();
                $table->jsonb('config_value')->nullable();
                $table->jsonb('constraints')->nullable();
                $table->boolean('is_public')->default(false)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['setting_group_id', 'status']);
            });
        }

        if (! Schema::hasTable('feature_flags')) {
            Schema::create('feature_flags', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('feature_key')->unique();
                $table->string('name');
                $table->text('description')->nullable();
                $table->boolean('is_enabled')->default(false)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('feature_flag_rules')) {
            Schema::create('feature_flag_rules', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('feature_flag_id')->constrained('feature_flags')->cascadeOnDelete();
                $table->string('rule_type', 50)->index();
                $table->jsonb('rules')->nullable();
                $table->unsignedInteger('priority')->default(0)->index();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();

                $table->index(['feature_flag_id', 'status']);
            });
        }

        if (! Schema::hasTable('platform_configurations')) {
            Schema::create('platform_configurations', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('config_key')->unique();
                $table->string('config_type', 50)->default('json')->index();
                $table->jsonb('config_value')->nullable();
                $table->string('environment')->default('global')->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('translation_keys')) {
            Schema::create('translation_keys', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('key')->unique();
                $table->string('group')->nullable()->index();
                $table->text('description')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('translation_values')) {
            Schema::create('translation_values', function (Blueprint $table) {
                $table->id();
                $table->foreignId('translation_key_id')->constrained('translation_keys')->cascadeOnDelete();
                $table->foreignId('language_id')->constrained('languages')->cascadeOnDelete();
                $table->text('value');
                $table->jsonb('translations')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();

                $table->unique(['translation_key_id', 'language_id']);
                $table->index(['language_id', 'status']);
            });
        }

        if (! Schema::hasTable('localized_strings')) {
            Schema::create('localized_strings', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('language_id')->constrained('languages')->cascadeOnDelete();
                $table->string('string_key')->index();
                $table->text('value');
                $table->string('namespace')->nullable()->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->unique(['language_id', 'namespace', 'string_key'], 'localized_strings_unique');
            });
        }

        if (! Schema::hasTable('content_pages')) {
            Schema::create('content_pages', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('page_slug')->unique();
                $table->string('page_type', 80)->index();
                $table->string('title');
                $table->jsonb('content_blocks')->nullable();
                $table->string('status', 30)->default('draft')->index();
                $table->timestamp('published_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('content_page_translations')) {
            Schema::create('content_page_translations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('content_page_id')->constrained('content_pages')->cascadeOnDelete();
                $table->foreignId('language_id')->constrained('languages')->cascadeOnDelete();
                $table->string('title');
                $table->text('summary')->nullable();
                $table->jsonb('content_blocks')->nullable();
                $table->string('status', 30)->default('draft')->index();
                $table->timestamps();

                $table->unique(['content_page_id', 'language_id']);
                $table->index(['language_id', 'status']);
            });
        }

        if (! Schema::hasTable('menu_groups')) {
            Schema::create('menu_groups', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('group_key')->unique();
                $table->string('name');
                $table->string('location')->nullable()->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('menu_items')) {
            Schema::create('menu_items', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('menu_group_id')->constrained('menu_groups')->cascadeOnDelete();
                $table->foreignId('parent_id')->nullable()->constrained('menu_items')->cascadeOnDelete();
                $table->string('label');
                $table->string('url')->nullable();
                $table->string('route_name')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['menu_group_id', 'status']);
            });
        }

        if (! Schema::hasTable('menu_item_translations')) {
            Schema::create('menu_item_translations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('menu_item_id')->constrained('menu_items')->cascadeOnDelete();
                $table->foreignId('language_id')->constrained('languages')->cascadeOnDelete();
                $table->string('label');
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->unique(['menu_item_id', 'language_id']);
                $table->index(['language_id', 'label']);
            });
        }

        if (! Schema::hasTable('email_templates')) {
            Schema::create('email_templates', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('template_key')->unique();
                $table->string('name');
                $table->string('subject')->nullable();
                $table->text('body_template');
                $table->jsonb('variables')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('email_template_translations')) {
            Schema::create('email_template_translations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('email_template_id')->constrained('email_templates')->cascadeOnDelete();
                $table->foreignId('language_id')->constrained('languages')->cascadeOnDelete();
                $table->string('subject')->nullable();
                $table->text('body_template');
                $table->timestamps();

                $table->unique(['email_template_id', 'language_id']);
                $table->index(['language_id', 'subject']);
            });
        }

        if (! Schema::hasTable('sms_templates')) {
            Schema::create('sms_templates', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('template_key')->unique();
                $table->string('name');
                $table->text('body_template');
                $table->jsonb('variables')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('sms_template_translations')) {
            Schema::create('sms_template_translations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('sms_template_id')->constrained('sms_templates')->cascadeOnDelete();
                $table->foreignId('language_id')->constrained('languages')->cascadeOnDelete();
                $table->text('body_template');
                $table->timestamps();

                $table->unique(['sms_template_id', 'language_id']);
            });
        }

        if (! Schema::hasTable('terms_versions')) {
            Schema::create('terms_versions', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('version')->unique();
                $table->foreignId('language_id')->nullable()->constrained('languages')->nullOnDelete();
                $table->string('title');
                $table->longText('content');
                $table->timestamp('effective_at')->nullable();
                $table->string('status', 30)->default('draft')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('privacy_policy_versions')) {
            Schema::create('privacy_policy_versions', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('version')->unique();
                $table->foreignId('language_id')->nullable()->constrained('languages')->nullOnDelete();
                $table->string('title');
                $table->longText('content');
                $table->timestamp('effective_at')->nullable();
                $table->string('status', 30)->default('draft')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('consent_records')) {
            Schema::create('consent_records', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('terms_version_id')->nullable()->constrained('terms_versions')->nullOnDelete();
                $table->foreignId('privacy_policy_version_id')->nullable()->constrained('privacy_policy_versions')->nullOnDelete();
                $table->string('consent_type', 80)->index();
                $table->boolean('is_granted')->default(true)->index();
                $table->timestamp('consented_at')->nullable();
                $table->string('ip_address', 45)->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['user_id', 'consent_type']);
            });
        }

        if (! Schema::hasTable('country_regions')) {
            Schema::create('country_regions', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('country_id')->constrained('countries')->cascadeOnDelete();
                $table->string('name');
                $table->string('code')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->unique(['country_id', 'name']);
                $table->index(['country_id', 'status']);
            });
        }

        if (! Schema::hasTable('cities')) {
            Schema::create('cities', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('country_id')->constrained('countries')->cascadeOnDelete();
                $table->foreignId('country_region_id')->nullable()->constrained('country_regions')->nullOnDelete();
                $table->string('name');
                $table->string('postal_code')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['country_id', 'status']);
                $table->index(['country_region_id', 'status']);
            });
        }

        if (! Schema::hasTable('currency_exchange_rates')) {
            Schema::create('currency_exchange_rates', function (Blueprint $table) {
                $table->id();
                $table->foreignId('base_currency_id')->constrained('currencies')->cascadeOnDelete();
                $table->foreignId('quote_currency_id')->constrained('currencies')->cascadeOnDelete();
                $table->decimal('rate', 18, 8);
                $table->date('rate_date')->index();
                $table->string('source')->nullable()->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->unique(['base_currency_id', 'quote_currency_id', 'rate_date'], 'currency_exchange_rates_unique');
            });
        }

        if (! Schema::hasTable('tax_rules')) {
            Schema::create('tax_rules', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
                $table->foreignId('country_region_id')->nullable()->constrained('country_regions')->nullOnDelete();
                $table->string('tax_type', 80)->index();
                $table->string('name');
                $table->decimal('rate', 8, 4)->default(0);
                $table->date('effective_from')->nullable();
                $table->date('effective_until')->nullable();
                $table->jsonb('rules')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['country_id', 'status']);
            });
        }

        if (! Schema::hasTable('platform_maintenance_windows')) {
            Schema::create('platform_maintenance_windows', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('title');
                $table->text('description')->nullable();
                $table->timestamp('starts_at')->index();
                $table->timestamp('ends_at')->index();
                $table->string('status', 30)->default('scheduled')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('platform_maintenance_windows');
        Schema::dropIfExists('tax_rules');
        Schema::dropIfExists('currency_exchange_rates');
        Schema::dropIfExists('cities');
        Schema::dropIfExists('country_regions');
        Schema::dropIfExists('consent_records');
        Schema::dropIfExists('privacy_policy_versions');
        Schema::dropIfExists('terms_versions');
        Schema::dropIfExists('sms_template_translations');
        Schema::dropIfExists('sms_templates');
        Schema::dropIfExists('email_template_translations');
        Schema::dropIfExists('email_templates');
        Schema::dropIfExists('menu_item_translations');
        Schema::dropIfExists('menu_items');
        Schema::dropIfExists('menu_groups');
        Schema::dropIfExists('content_page_translations');
        Schema::dropIfExists('content_pages');
        Schema::dropIfExists('localized_strings');
        Schema::dropIfExists('translation_values');
        Schema::dropIfExists('translation_keys');
        Schema::dropIfExists('platform_configurations');
        Schema::dropIfExists('feature_flag_rules');
        Schema::dropIfExists('feature_flags');
        Schema::dropIfExists('system_settings');
        Schema::dropIfExists('setting_groups');
    }
};
