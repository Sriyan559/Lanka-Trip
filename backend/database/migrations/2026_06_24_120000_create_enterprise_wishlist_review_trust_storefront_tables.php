<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('wishlist_folders')) {
            Schema::create('wishlist_folders', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->string('name');
                $table->string('slug')->nullable();
                $table->text('description')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->unique(['user_id', 'name']);
                $table->index(['buyer_profile_id', 'status']);
            });
        }

        if (! Schema::hasTable('wishlist_items')) {
            Schema::create('wishlist_items', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('wishlist_folder_id')->nullable()->constrained('wishlist_folders')->nullOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('product_id')->nullable()->constrained('products')->cascadeOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->text('notes')->nullable();
                $table->string('priority', 30)->default('normal')->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->unique(['user_id', 'product_id'], 'wishlist_items_user_product_unique');
                $table->index(['wishlist_folder_id', 'status'], 'wishlist_items_folder_status_index');
                $table->index(['buyer_profile_id', 'status']);
                $table->index(['supplier_id', 'status']);
                $table->index(['created_at']);
            });
        }

        if (! Schema::hasTable('product_review_images')) {
            Schema::create('product_review_images', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('product_review_id')->constrained('product_reviews')->cascadeOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('image_url')->nullable();
                $table->string('caption')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['product_review_id', 'status'], 'product_review_images_review_status_index');
            });
        }

        if (! Schema::hasTable('product_review_replies')) {
            Schema::create('product_review_replies', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('product_review_id')->constrained('product_reviews')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('parent_reply_id')->nullable()->constrained('product_review_replies')->nullOnDelete();
                $table->text('reply_text');
                $table->string('moderation_status', 30)->default('approved')->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['product_review_id', 'status'], 'product_review_replies_review_status_index');
                $table->index(['supplier_id', 'status']);
            });
        }

        if (! Schema::hasTable('product_review_votes')) {
            Schema::create('product_review_votes', function (Blueprint $table) {
                $table->id();
                $table->foreignId('product_review_id')->constrained('product_reviews')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('vote_type', 30)->default('helpful')->index();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();

                $table->unique(['product_review_id', 'user_id'], 'product_review_votes_review_user_unique');
                $table->index(['user_id', 'status']);
            });
        }

        if (! Schema::hasTable('supplier_review_replies')) {
            Schema::create('supplier_review_replies', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_review_id')->constrained('supplier_reviews')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('parent_reply_id')->nullable()->constrained('supplier_review_replies')->nullOnDelete();
                $table->text('reply_text');
                $table->string('moderation_status', 30)->default('approved')->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_review_id', 'status'], 'supplier_review_replies_review_status_index');
                $table->index(['supplier_id', 'status']);
            });
        }

        if (! Schema::hasTable('supplier_review_votes')) {
            Schema::create('supplier_review_votes', function (Blueprint $table) {
                $table->id();
                $table->foreignId('supplier_review_id')->constrained('supplier_reviews')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('vote_type', 30)->default('helpful')->index();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();

                $table->unique(['supplier_review_id', 'user_id'], 'supplier_review_votes_review_user_unique');
                $table->index(['user_id', 'status']);
            });
        }

        if (! Schema::hasTable('review_moderation_logs')) {
            Schema::create('review_moderation_logs', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('review_type', 80)->index();
                $table->unsignedBigInteger('review_id')->index();
                $table->foreignId('moderated_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('action', 80)->index();
                $table->string('moderation_status', 30)->index();
                $table->text('reason')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['review_type', 'review_id'], 'review_moderation_logs_review_index');
                $table->index(['moderated_by', 'created_at']);
            });
        }

        if (! Schema::hasTable('trust_score_rules')) {
            Schema::create('trust_score_rules', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('rule_key')->unique();
                $table->string('name');
                $table->string('subject_type', 80)->index();
                $table->string('metric_key', 100)->index();
                $table->decimal('weight', 8, 4)->default(1);
                $table->decimal('score_min', 6, 2)->default(0);
                $table->decimal('score_max', 6, 2)->default(100);
                $table->jsonb('rules')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('trust_score_snapshots')) {
            Schema::create('trust_score_snapshots', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->nullableMorphs('subject');
                $table->decimal('trust_score', 6, 2)->default(0)->index();
                $table->string('trust_level', 30)->nullable()->index();
                $table->jsonb('scoring_details')->nullable();
                $table->date('snapshot_date')->index();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();

                $table->index(['subject_type', 'subject_id'], 'trust_score_snapshots_subject_index');
            });
        }

        if (! Schema::hasTable('supplier_trust_scores')) {
            Schema::create('supplier_trust_scores', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_id')->unique()->constrained('suppliers')->cascadeOnDelete();
                $table->decimal('trust_score', 6, 2)->default(0)->index();
                $table->string('trust_level', 30)->default('new')->index();
                $table->jsonb('scoring_details')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('company_trust_scores')) {
            Schema::create('company_trust_scores', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('company_profile_id')->unique()->constrained('company_profiles')->cascadeOnDelete();
                $table->decimal('trust_score', 6, 2)->default(0)->index();
                $table->string('trust_level', 30)->default('new')->index();
                $table->jsonb('scoring_details')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('buyer_trust_scores')) {
            Schema::create('buyer_trust_scores', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('buyer_profile_id')->unique()->constrained('buyer_profiles')->cascadeOnDelete();
                $table->decimal('trust_score', 6, 2)->default(0)->index();
                $table->string('trust_level', 30)->default('new')->index();
                $table->jsonb('scoring_details')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('supplier_storefronts')) {
            Schema::create('supplier_storefronts', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_id')->unique()->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('company_profile_id')->nullable()->constrained('company_profiles')->nullOnDelete();
                $table->foreignId('logo_upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->foreignId('banner_upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('storefront_slug')->unique();
                $table->string('title');
                $table->string('subtitle')->nullable();
                $table->longText('description')->nullable();
                $table->jsonb('layout_config')->nullable();
                $table->jsonb('media_settings')->nullable();
                $table->timestamp('published_at')->nullable();
                $table->string('status', 30)->default('draft')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_id', 'status']);
                $table->index(['company_profile_id', 'status']);
                $table->index(['storefront_slug', 'status']);
            });
        }

        if (! Schema::hasTable('supplier_storefront_sections')) {
            Schema::create('supplier_storefront_sections', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_storefront_id')->constrained('supplier_storefronts')->cascadeOnDelete();
                $table->string('section_key', 100);
                $table->string('section_type', 80)->index();
                $table->string('title')->nullable();
                $table->longText('content')->nullable();
                $table->jsonb('layout_config')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->boolean('is_visible')->default(true)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->unique(['supplier_storefront_id', 'section_key'], 'storefront_sections_storefront_key_unique');
                $table->index(['supplier_storefront_id', 'status'], 'storefront_sections_storefront_status_index');
            });
        }

        if (! Schema::hasTable('supplier_storefront_section_items')) {
            Schema::create('supplier_storefront_section_items', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_storefront_section_id')->constrained('supplier_storefront_sections')->cascadeOnDelete();
                $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('item_type', 80)->index();
                $table->string('title')->nullable();
                $table->longText('body')->nullable();
                $table->jsonb('settings')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_storefront_section_id', 'status'], 'storefront_items_section_status_index');
                $table->index(['product_id', 'status']);
            });
        }

        if (! Schema::hasTable('supplier_showcase_products')) {
            Schema::create('supplier_showcase_products', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->foreignId('supplier_storefront_id')->nullable()->constrained('supplier_storefronts')->nullOnDelete();
                $table->string('title')->nullable();
                $table->text('description')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->boolean('is_featured')->default(false)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->unique(['supplier_id', 'product_id'], 'supplier_showcase_products_supplier_product_unique');
                $table->index(['supplier_id', 'status']);
                $table->index(['product_id', 'status']);
            });
        }

        if (! Schema::hasTable('supplier_showcase_videos')) {
            Schema::create('supplier_showcase_videos', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('supplier_storefront_id')->nullable()->constrained('supplier_storefronts')->nullOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('video_url')->nullable();
                $table->string('thumbnail_url')->nullable();
                $table->unsignedInteger('duration_seconds')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_id', 'status']);
            });
        }

        if (! Schema::hasTable('supplier_company_highlights')) {
            Schema::create('supplier_company_highlights', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('company_profile_id')->nullable()->constrained('company_profiles')->nullOnDelete();
                $table->string('highlight_type', 80)->index();
                $table->string('title');
                $table->string('value')->nullable();
                $table->text('description')->nullable();
                $table->string('icon')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_id', 'status']);
                $table->index(['company_profile_id', 'status']);
            });
        }

        if (! Schema::hasTable('supplier_factory_tours')) {
            Schema::create('supplier_factory_tours', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('tour_type', 80)->default('image')->index();
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('media_url')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_id', 'status']);
            });
        }

        if (! Schema::hasTable('supplier_export_markets')) {
            Schema::create('supplier_export_markets', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
                $table->string('market_name')->nullable();
                $table->string('export_volume')->nullable();
                $table->date('started_at')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->unique(['supplier_id', 'country_id'], 'supplier_export_markets_supplier_country_unique');
                $table->index(['country_id', 'status']);
            });
        }

        if (! Schema::hasTable('supplier_quality_controls')) {
            Schema::create('supplier_quality_controls', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->string('process_type', 100)->index();
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('standard')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_id', 'status']);
            });
        }

        if (! Schema::hasTable('supplier_business_licenses')) {
            Schema::create('supplier_business_licenses', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('license_type', 100)->index();
                $table->string('license_number')->nullable()->index();
                $table->string('issuing_authority')->nullable();
                $table->date('issued_at')->nullable();
                $table->date('expires_at')->nullable();
                $table->string('verification_status', 30)->default('pending')->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_id', 'verification_status'], 'supplier_business_licenses_supplier_verification_index');
            });
        }

        if (! Schema::hasTable('supplier_awards')) {
            Schema::create('supplier_awards', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('title');
                $table->string('awarding_body')->nullable();
                $table->date('awarded_at')->nullable();
                $table->text('description')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_id', 'status']);
            });
        }

        if (! Schema::hasTable('buyer_engagement_events')) {
            Schema::create('buyer_engagement_events', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('company_profile_id')->nullable()->constrained('company_profiles')->nullOnDelete();
                $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
                $table->string('event_type', 100)->index();
                $table->string('source')->nullable()->index();
                $table->jsonb('engagement_context')->nullable();
                $table->timestamp('occurred_at')->nullable()->index();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();

                $table->index(['user_id', 'created_at']);
                $table->index(['buyer_profile_id', 'created_at'], 'buyer_engagement_buyer_created_index');
                $table->index(['supplier_id', 'created_at']);
                $table->index(['product_id', 'created_at']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('buyer_engagement_events');
        Schema::dropIfExists('supplier_awards');
        Schema::dropIfExists('supplier_business_licenses');
        Schema::dropIfExists('supplier_quality_controls');
        Schema::dropIfExists('supplier_export_markets');
        Schema::dropIfExists('supplier_factory_tours');
        Schema::dropIfExists('supplier_company_highlights');
        Schema::dropIfExists('supplier_showcase_videos');
        Schema::dropIfExists('supplier_showcase_products');
        Schema::dropIfExists('supplier_storefront_section_items');
        Schema::dropIfExists('supplier_storefront_sections');
        Schema::dropIfExists('supplier_storefronts');
        Schema::dropIfExists('buyer_trust_scores');
        Schema::dropIfExists('company_trust_scores');
        Schema::dropIfExists('supplier_trust_scores');
        Schema::dropIfExists('trust_score_snapshots');
        Schema::dropIfExists('trust_score_rules');
        Schema::dropIfExists('review_moderation_logs');
        Schema::dropIfExists('supplier_review_votes');
        Schema::dropIfExists('supplier_review_replies');
        Schema::dropIfExists('product_review_votes');
        Schema::dropIfExists('product_review_replies');
        Schema::dropIfExists('product_review_images');
        Schema::dropIfExists('wishlist_items');
        Schema::dropIfExists('wishlist_folders');
    }
};
