<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('product_videos')) {
            Schema::create('product_videos', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->string('title')->nullable();
                $table->string('video_url');
                $table->string('provider', 50)->nullable();
                $table->string('thumbnail_url')->nullable();
                $table->unsignedInteger('duration_seconds')->nullable();
                $table->boolean('is_primary')->default(false)->index();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['product_id', 'status']);
                $table->index(['product_id', 'sort_order']);
            });
        }

        if (! Schema::hasTable('product_documents')) {
            Schema::create('product_documents', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->foreignId('language_id')->nullable()->constrained('languages')->nullOnDelete();
                $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
                $table->string('title');
                $table->string('document_type', 80)->index();
                $table->string('file_url')->nullable();
                $table->string('file_path')->nullable();
                $table->string('mime_type', 120)->nullable();
                $table->unsignedBigInteger('file_size')->nullable();
                $table->date('expires_at')->nullable();
                $table->boolean('is_public')->default(true)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['product_id', 'document_type']);
                $table->index(['product_id', 'status']);
            });
        }

        if (! Schema::hasTable('product_variants')) {
            Schema::create('product_variants', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
                $table->string('sku')->nullable()->unique();
                $table->string('name');
                $table->string('slug')->nullable()->unique();
                $table->text('description')->nullable();
                $table->decimal('price', 12, 2)->nullable();
                $table->decimal('fob_price_min', 12, 2)->nullable();
                $table->decimal('fob_price_max', 12, 2)->nullable();
                $table->decimal('moq', 12, 2)->nullable();
                $table->string('moq_unit', 50)->nullable();
                $table->unsignedInteger('stock_quantity')->nullable();
                $table->unsignedInteger('lead_time_days')->nullable();
                $table->boolean('is_default')->default(false)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['product_id', 'status']);
                $table->index(['product_id', 'is_default']);
            });
        }

        if (! Schema::hasTable('product_variant_options')) {
            Schema::create('product_variant_options', function (Blueprint $table) {
                $table->id();
                $table->foreignId('product_variant_id')->constrained('product_variants')->cascadeOnDelete();
                $table->string('name');
                $table->string('value');
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->unique(['product_variant_id', 'name', 'value'], 'product_variant_options_unique');
                $table->index(['product_variant_id', 'status'], 'product_variant_options_variant_status_index');
            });
        }

        if (! Schema::hasTable('attribute_groups')) {
            Schema::create('attribute_groups', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->text('description')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('product_attributes')) {
            Schema::create('product_attributes', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('attribute_group_id')->nullable()->constrained('attribute_groups')->nullOnDelete();
                $table->string('name');
                $table->string('slug')->unique();
                $table->string('data_type', 40)->default('text')->index();
                $table->string('unit', 50)->nullable();
                $table->boolean('is_required')->default(false);
                $table->boolean('is_filterable')->default(false)->index();
                $table->boolean('is_variant_defining')->default(false)->index();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['attribute_group_id', 'status']);
            });
        }

        if (! Schema::hasTable('category_attributes')) {
            Schema::create('category_attributes', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
                $table->foreignId('product_attribute_id')->constrained('product_attributes')->cascadeOnDelete();
                $table->boolean('is_required')->default(false);
                $table->boolean('is_filterable')->default(true)->index();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->unique(['category_id', 'product_attribute_id']);
                $table->index(['category_id', 'status']);
            });
        }

        if (! Schema::hasTable('product_attribute_values')) {
            Schema::create('product_attribute_values', function (Blueprint $table) {
                $table->id();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->foreignId('product_attribute_id')->constrained('product_attributes')->cascadeOnDelete();
                $table->foreignId('product_variant_id')->nullable()->constrained('product_variants')->cascadeOnDelete();
                $table->text('value_text')->nullable();
                $table->decimal('value_number', 18, 4)->nullable();
                $table->boolean('value_boolean')->nullable();
                $table->date('value_date')->nullable();
                $table->jsonb('value_json')->nullable();
                $table->string('unit', 50)->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();

                $table->index(['product_id', 'status']);
                $table->index(['product_attribute_id', 'status'], 'product_attribute_values_attribute_status_index');
                $table->index(['product_variant_id', 'status'], 'product_attribute_values_variant_status_index');
            });
        }

        if (! Schema::hasTable('product_certifications')) {
            Schema::create('product_certifications', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
                $table->string('certification_name');
                $table->string('issuing_body')->nullable();
                $table->string('certificate_number')->nullable();
                $table->date('issued_at')->nullable();
                $table->date('expires_at')->nullable();
                $table->string('document_url')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['product_id', 'status']);
                $table->index(['certification_name', 'status']);
            });
        }

        if (! Schema::hasTable('product_price_tiers')) {
            Schema::create('product_price_tiers', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->foreignId('product_variant_id')->nullable()->constrained('product_variants')->cascadeOnDelete();
                $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
                $table->decimal('min_quantity', 12, 2);
                $table->decimal('max_quantity', 12, 2)->nullable();
                $table->string('unit', 50)->nullable();
                $table->decimal('unit_price', 12, 2);
                $table->string('price_basis', 50)->default('FOB');
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['product_id', 'status']);
                $table->index(['product_variant_id', 'status'], 'product_price_tiers_variant_status_index');
            });
        }

        if (! Schema::hasTable('product_packaging_options')) {
            Schema::create('product_packaging_options', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->string('name');
                $table->string('package_type')->nullable()->index();
                $table->decimal('quantity_per_package', 12, 2)->nullable();
                $table->string('unit', 50)->nullable();
                $table->string('dimensions')->nullable();
                $table->decimal('gross_weight', 12, 3)->nullable();
                $table->decimal('net_weight', 12, 3)->nullable();
                $table->string('weight_unit', 20)->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['product_id', 'status']);
            });
        }

        if (! Schema::hasTable('product_shipping_options')) {
            Schema::create('product_shipping_options', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
                $table->string('incoterm', 20)->nullable()->index();
                $table->string('origin_port')->nullable();
                $table->string('destination_region')->nullable();
                $table->string('shipping_method')->nullable();
                $table->unsignedInteger('lead_time_days')->nullable();
                $table->decimal('estimated_cost', 12, 2)->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['product_id', 'status']);
            });
        }

        if (! Schema::hasTable('product_tags')) {
            Schema::create('product_tags', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->text('description')->nullable();
                $table->string('color', 20)->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('product_tag_mappings')) {
            Schema::create('product_tag_mappings', function (Blueprint $table) {
                $table->id();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->foreignId('product_tag_id')->constrained('product_tags')->cascadeOnDelete();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();

                $table->unique(['product_id', 'product_tag_id']);
                $table->index(['product_tag_id', 'status']);
            });
        }

        if (! Schema::hasTable('product_related_products')) {
            Schema::create('product_related_products', function (Blueprint $table) {
                $table->id();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->foreignId('related_product_id')->constrained('products')->cascadeOnDelete();
                $table->string('relationship_type', 50)->default('related')->index();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();

                $table->unique(['product_id', 'related_product_id', 'relationship_type'], 'product_related_products_unique');
                $table->index(['product_id', 'status']);
            });
        }

        if (! Schema::hasTable('product_approval_histories')) {
            Schema::create('product_approval_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('previous_status', 30)->nullable();
                $table->string('new_status', 30)->index();
                $table->text('notes')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['product_id', 'created_at']);
                $table->index(['reviewed_by', 'created_at']);
            });
        }

        if (! Schema::hasTable('product_view_stats')) {
            Schema::create('product_view_stats', function (Blueprint $table) {
                $table->id();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->date('viewed_on');
                $table->unsignedBigInteger('views_count')->default(0);
                $table->timestamp('last_viewed_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->unique(['product_id', 'viewed_on']);
                $table->index(['product_id', 'created_at']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('product_view_stats');
        Schema::dropIfExists('product_approval_histories');
        Schema::dropIfExists('product_related_products');
        Schema::dropIfExists('product_tag_mappings');
        Schema::dropIfExists('product_tags');
        Schema::dropIfExists('product_shipping_options');
        Schema::dropIfExists('product_packaging_options');
        Schema::dropIfExists('product_price_tiers');
        Schema::dropIfExists('product_certifications');
        Schema::dropIfExists('product_attribute_values');
        Schema::dropIfExists('category_attributes');
        Schema::dropIfExists('product_attributes');
        Schema::dropIfExists('attribute_groups');
        Schema::dropIfExists('product_variant_options');
        Schema::dropIfExists('product_variants');
        Schema::dropIfExists('product_documents');
        Schema::dropIfExists('product_videos');
    }
};
