<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('wishlists', function (Blueprint $table) {
            if (! Schema::hasColumn('wishlists', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('wishlists', 'buyer_profile_id')) {
                $table->foreignId('buyer_profile_id')->nullable()->after('user_id')->constrained('buyer_profiles')->nullOnDelete();
            }

            if (! Schema::hasColumn('wishlists', 'wishlist_folder_id')) {
                $table->foreignId('wishlist_folder_id')->nullable()->after('buyer_profile_id')->constrained('wishlist_folders')->nullOnDelete();
            }

            if (! Schema::hasColumn('wishlists', 'supplier_id')) {
                $table->foreignId('supplier_id')->nullable()->after('product_id')->constrained('suppliers')->nullOnDelete();
            }

            if (! Schema::hasColumn('wishlists', 'notes')) {
                $table->text('notes')->nullable()->after('supplier_id');
            }

            if (! Schema::hasColumn('wishlists', 'priority')) {
                $table->string('priority', 30)->default('normal')->index()->after('notes');
            }

            if (! Schema::hasColumn('wishlists', 'status')) {
                $table->string('status', 30)->default('active')->index()->after('priority');
            }

            if (! Schema::hasColumn('wishlists', 'deleted_at')) {
                $table->softDeletes();
            }

            $table->index(['buyer_profile_id', 'status'], 'wishlists_buyer_status_index');
            $table->index(['wishlist_folder_id', 'status'], 'wishlists_folder_status_index');
            $table->index(['supplier_id', 'status'], 'wishlists_supplier_status_index');
        });

        Schema::table('product_reviews', function (Blueprint $table) {
            if (! Schema::hasColumn('product_reviews', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('product_reviews', 'buyer_profile_id')) {
                $table->foreignId('buyer_profile_id')->nullable()->after('user_id')->constrained('buyer_profiles')->nullOnDelete();
            }

            if (! Schema::hasColumn('product_reviews', 'order_id')) {
                $table->foreignId('order_id')->nullable()->after('buyer_profile_id')->constrained('orders')->nullOnDelete();
            }

            if (! Schema::hasColumn('product_reviews', 'review_text')) {
                $table->longText('review_text')->nullable()->after('review');
            }

            if (! Schema::hasColumn('product_reviews', 'quality_rating')) {
                $table->unsignedTinyInteger('quality_rating')->nullable()->after('review_text');
            }

            if (! Schema::hasColumn('product_reviews', 'delivery_rating')) {
                $table->unsignedTinyInteger('delivery_rating')->nullable()->after('quality_rating');
            }

            if (! Schema::hasColumn('product_reviews', 'communication_rating')) {
                $table->unsignedTinyInteger('communication_rating')->nullable()->after('delivery_rating');
            }

            if (! Schema::hasColumn('product_reviews', 'verified_purchase')) {
                $table->boolean('verified_purchase')->default(false)->index()->after('communication_rating');
            }

            if (! Schema::hasColumn('product_reviews', 'moderation_status')) {
                $table->string('moderation_status', 30)->default('pending')->index()->after('verified_purchase');
            }

            if (! Schema::hasColumn('product_reviews', 'helpful_count')) {
                $table->unsignedInteger('helpful_count')->default(0)->after('moderation_status');
            }

            if (! Schema::hasColumn('product_reviews', 'reported_count')) {
                $table->unsignedInteger('reported_count')->default(0)->after('helpful_count');
            }

            if (! Schema::hasColumn('product_reviews', 'metadata')) {
                $table->jsonb('metadata')->nullable()->after('reported_count');
            }

            if (! Schema::hasColumn('product_reviews', 'deleted_at')) {
                $table->softDeletes();
            }

            $table->index(['buyer_profile_id', 'moderation_status'], 'product_reviews_buyer_moderation_index');
            $table->index(['order_id', 'moderation_status'], 'product_reviews_order_moderation_index');
        });

        Schema::table('supplier_reviews', function (Blueprint $table) {
            if (! Schema::hasColumn('supplier_reviews', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('supplier_reviews', 'buyer_profile_id')) {
                $table->foreignId('buyer_profile_id')->nullable()->after('user_id')->constrained('buyer_profiles')->nullOnDelete();
            }

            if (! Schema::hasColumn('supplier_reviews', 'order_id')) {
                $table->foreignId('order_id')->nullable()->after('buyer_profile_id')->constrained('orders')->nullOnDelete();
            }

            if (! Schema::hasColumn('supplier_reviews', 'review_text')) {
                $table->longText('review_text')->nullable()->after('review');
            }

            if (! Schema::hasColumn('supplier_reviews', 'service_rating')) {
                $table->unsignedTinyInteger('service_rating')->nullable()->after('review_text');
            }

            if (! Schema::hasColumn('supplier_reviews', 'communication_rating')) {
                $table->unsignedTinyInteger('communication_rating')->nullable()->after('service_rating');
            }

            if (! Schema::hasColumn('supplier_reviews', 'delivery_rating')) {
                $table->unsignedTinyInteger('delivery_rating')->nullable()->after('communication_rating');
            }

            if (! Schema::hasColumn('supplier_reviews', 'verified_buyer')) {
                $table->boolean('verified_buyer')->default(false)->index()->after('delivery_rating');
            }

            if (! Schema::hasColumn('supplier_reviews', 'moderation_status')) {
                $table->string('moderation_status', 30)->default('pending')->index()->after('verified_buyer');
            }

            if (! Schema::hasColumn('supplier_reviews', 'helpful_count')) {
                $table->unsignedInteger('helpful_count')->default(0)->after('moderation_status');
            }

            if (! Schema::hasColumn('supplier_reviews', 'reported_count')) {
                $table->unsignedInteger('reported_count')->default(0)->after('helpful_count');
            }

            if (! Schema::hasColumn('supplier_reviews', 'metadata')) {
                $table->jsonb('metadata')->nullable()->after('reported_count');
            }

            if (! Schema::hasColumn('supplier_reviews', 'deleted_at')) {
                $table->softDeletes();
            }

            $table->index(['buyer_profile_id', 'moderation_status'], 'supplier_reviews_buyer_moderation_index');
            $table->index(['order_id', 'moderation_status'], 'supplier_reviews_order_moderation_index');
        });

        Schema::table('suppliers', function (Blueprint $table) {
            if (! Schema::hasColumn('suppliers', 'storefront_slug')) {
                $table->string('storefront_slug')->nullable()->unique()->after('slug');
            }

            if (! Schema::hasColumn('suppliers', 'storefront_status')) {
                $table->string('storefront_status', 30)->default('draft')->index('suppliers_storefront_status_single_index')->after('storefront_slug');
            }

            if (! Schema::hasColumn('suppliers', 'trust_score')) {
                $table->decimal('trust_score', 6, 2)->default(0)->index()->after('rating');
            }

            if (! Schema::hasColumn('suppliers', 'trust_level')) {
                $table->string('trust_level', 30)->default('new')->index()->after('trust_score');
            }

            if (! Schema::hasColumn('suppliers', 'profile_completion_score')) {
                $table->decimal('profile_completion_score', 5, 2)->default(0)->after('trust_level');
            }

            if (! Schema::hasColumn('suppliers', 'response_rate')) {
                $table->decimal('response_rate', 5, 2)->default(0)->after('profile_completion_score');
            }

            if (! Schema::hasColumn('suppliers', 'average_response_time_hours')) {
                $table->decimal('average_response_time_hours', 8, 2)->nullable()->after('response_rate');
            }

            if (! Schema::hasColumn('suppliers', 'review_count')) {
                $table->unsignedInteger('review_count')->default(0)->after('reviews_count');
            }

            if (! Schema::hasColumn('suppliers', 'average_rating')) {
                $table->decimal('average_rating', 3, 2)->default(0)->after('review_count');
            }

            $table->index(['storefront_status', 'status'], 'suppliers_storefront_status_combo_index');
        });
    }

    public function down(): void
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropIndex('suppliers_storefront_status_combo_index');
            $table->dropColumn([
                'storefront_slug',
                'storefront_status',
                'trust_score',
                'trust_level',
                'profile_completion_score',
                'response_rate',
                'average_response_time_hours',
                'review_count',
                'average_rating',
            ]);
        });

        Schema::table('supplier_reviews', function (Blueprint $table) {
            $table->dropIndex('supplier_reviews_buyer_moderation_index');
            $table->dropIndex('supplier_reviews_order_moderation_index');
            $table->dropConstrainedForeignId('buyer_profile_id');
            $table->dropConstrainedForeignId('order_id');
            $table->dropColumn([
                'uuid',
                'review_text',
                'service_rating',
                'communication_rating',
                'delivery_rating',
                'verified_buyer',
                'moderation_status',
                'helpful_count',
                'reported_count',
                'metadata',
            ]);
            $table->dropSoftDeletes();
        });

        Schema::table('product_reviews', function (Blueprint $table) {
            $table->dropIndex('product_reviews_buyer_moderation_index');
            $table->dropIndex('product_reviews_order_moderation_index');
            $table->dropConstrainedForeignId('buyer_profile_id');
            $table->dropConstrainedForeignId('order_id');
            $table->dropColumn([
                'uuid',
                'review_text',
                'quality_rating',
                'delivery_rating',
                'communication_rating',
                'verified_purchase',
                'moderation_status',
                'helpful_count',
                'reported_count',
                'metadata',
            ]);
            $table->dropSoftDeletes();
        });

        Schema::table('wishlists', function (Blueprint $table) {
            $table->dropIndex('wishlists_buyer_status_index');
            $table->dropIndex('wishlists_folder_status_index');
            $table->dropIndex('wishlists_supplier_status_index');
            $table->dropConstrainedForeignId('buyer_profile_id');
            $table->dropConstrainedForeignId('wishlist_folder_id');
            $table->dropConstrainedForeignId('supplier_id');
            $table->dropColumn([
                'uuid',
                'notes',
                'priority',
                'status',
            ]);
            $table->dropSoftDeletes();
        });
    }
};
