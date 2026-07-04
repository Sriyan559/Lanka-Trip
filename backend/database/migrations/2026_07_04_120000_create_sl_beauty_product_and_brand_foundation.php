<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('brands')) {
            Schema::create('brands', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('name');
                $table->string('slug')->unique();
                $table->text('description')->nullable();
                $table->string('logo_path')->nullable();
                $table->string('website_url')->nullable();
                $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
                $table->string('status', 30)->default('draft')->index();
                $table->boolean('is_verified')->default(false)->index();
                $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['country_id', 'status']);
                $table->index(['created_by', 'status']);
            });
        }

        if (! Schema::hasTable('product_beauty_profiles')) {
            Schema::create('product_beauty_profiles', function (Blueprint $table) {
                $table->id();
                $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
                $table->string('skin_type')->nullable()->index();
                $table->string('hair_type')->nullable()->index();
                $table->string('skin_concern')->nullable()->index();
                $table->string('hair_concern')->nullable()->index();
                $table->longText('ingredients')->nullable();
                $table->longText('how_to_use')->nullable();
                $table->longText('warnings')->nullable();
                $table->unsignedSmallInteger('spf_value')->nullable();
                $table->string('shade_family')->nullable()->index();
                $table->string('fragrance_family')->nullable()->index();
                $table->string('formulation')->nullable()->index();
                $table->string('gender_target')->nullable()->index();
                $table->string('age_group')->nullable()->index();
                $table->boolean('expiry_required')->default(false)->index();
                $table->boolean('batch_tracking_required')->default(false)->index();
                $table->string('compliance_status', 30)->default('not_required')->index();
                $table->timestamps();

                $table->unique('product_id');
            });
        }

        if (Schema::hasTable('product_variants')) {
            Schema::table('product_variants', function (Blueprint $table) {
                if (! Schema::hasColumn('product_variants', 'variant_name')) {
                    $table->string('variant_name')->nullable();
                }

                if (! Schema::hasColumn('product_variants', 'barcode')) {
                    $table->string('barcode')->nullable()->index();
                }

                if (! Schema::hasColumn('product_variants', 'shade_name')) {
                    $table->string('shade_name')->nullable();
                }

                if (! Schema::hasColumn('product_variants', 'shade_code')) {
                    $table->string('shade_code')->nullable();
                }

                if (! Schema::hasColumn('product_variants', 'size_label')) {
                    $table->string('size_label')->nullable();
                }

                if (! Schema::hasColumn('product_variants', 'volume_ml')) {
                    $table->decimal('volume_ml', 8, 2)->nullable();
                }

                if (! Schema::hasColumn('product_variants', 'weight_g')) {
                    $table->decimal('weight_g', 8, 2)->nullable();
                }

                if (! Schema::hasColumn('product_variants', 'retail_price')) {
                    $table->decimal('retail_price', 12, 2)->nullable();
                }

                if (! Schema::hasColumn('product_variants', 'sale_price')) {
                    $table->decimal('sale_price', 12, 2)->nullable();
                }

                if (! Schema::hasColumn('product_variants', 'low_stock_threshold')) {
                    $table->unsignedInteger('low_stock_threshold')->nullable();
                }

                if (! Schema::hasColumn('product_variants', 'is_active')) {
                    $table->boolean('is_active')->default(true)->index();
                }
            });
        }

        if (! Schema::hasTable('seller_brand_authorizations')) {
            Schema::create('seller_brand_authorizations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('brand_id')->constrained('brands')->cascadeOnDelete();
                $table->string('authorization_type')->nullable()->index();
                $table->string('territory')->nullable()->index();
                $table->string('document_path')->nullable();
                $table->date('starts_at')->nullable();
                $table->date('expires_at')->nullable()->index();
                $table->string('status', 30)->default('draft')->index();
                $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamp('reviewed_at')->nullable();
                $table->text('review_notes')->nullable();
                $table->timestamps();

                $table->index(['supplier_id', 'status']);
                $table->index(['brand_id', 'status']);
                $table->index(['reviewed_by', 'status']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('seller_brand_authorizations');

        if (Schema::hasTable('product_variants')) {
            Schema::table('product_variants', function (Blueprint $table) {
                $columns = [
                    'variant_name',
                    'barcode',
                    'shade_name',
                    'shade_code',
                    'size_label',
                    'volume_ml',
                    'weight_g',
                    'retail_price',
                    'sale_price',
                    'low_stock_threshold',
                    'is_active',
                ];

                $existingColumns = array_filter($columns, fn (string $column): bool => Schema::hasColumn('product_variants', $column));

                if ($existingColumns !== []) {
                    $table->dropColumn($existingColumns);
                }
            });
        }

        Schema::dropIfExists('product_beauty_profiles');
        Schema::dropIfExists('brands');
    }
};
