<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (! Schema::hasColumn('orders', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('orders', 'buyer_profile_id')) {
                $table->foreignId('buyer_profile_id')
                    ->nullable()
                    ->after('buyer_id')
                    ->constrained('buyer_profiles')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('orders', 'currency_id')) {
                $table->foreignId('currency_id')
                    ->nullable()
                    ->after('currency')
                    ->constrained('currencies')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('orders', 'subtotal')) {
                $table->decimal('subtotal', 14, 2)->default(0)->after('currency_id');
            }

            if (! Schema::hasColumn('orders', 'tax_amount')) {
                $table->decimal('tax_amount', 14, 2)->default(0)->after('subtotal');
            }

            if (! Schema::hasColumn('orders', 'shipping_amount')) {
                $table->decimal('shipping_amount', 14, 2)->default(0)->after('tax_amount');
            }

            if (! Schema::hasColumn('orders', 'discount_amount')) {
                $table->decimal('discount_amount', 14, 2)->default(0)->after('shipping_amount');
            }

            if (! Schema::hasColumn('orders', 'payment_status')) {
                $table->string('payment_status', 30)->default('pending')->index()->after('status');
            }

            if (! Schema::hasColumn('orders', 'fulfillment_status')) {
                $table->string('fulfillment_status', 30)->default('pending')->index()->after('payment_status');
            }

            if (! Schema::hasColumn('orders', 'approval_status')) {
                $table->string('approval_status', 30)->default('pending')->index()->after('fulfillment_status');
            }

            if (! Schema::hasColumn('orders', 'order_source')) {
                $table->string('order_source', 50)->default('quotation')->index()->after('approval_status');
            }

            if (! Schema::hasColumn('orders', 'incoterm')) {
                $table->string('incoterm', 20)->nullable()->index()->after('order_source');
            }

            if (! Schema::hasColumn('orders', 'delivery_terms')) {
                $table->string('delivery_terms')->nullable()->after('shipping_terms');
            }

            if (! Schema::hasColumn('orders', 'expected_delivery_date')) {
                $table->date('expected_delivery_date')->nullable()->after('delivery_terms');
            }

            if (! Schema::hasColumn('orders', 'confirmed_at')) {
                $table->timestamp('confirmed_at')->nullable()->index()->after('expected_delivery_date');
            }

            if (! Schema::hasColumn('orders', 'cancelled_at')) {
                $table->timestamp('cancelled_at')->nullable()->index()->after('confirmed_at');
            }

            if (! Schema::hasColumn('orders', 'completed_at')) {
                $table->timestamp('completed_at')->nullable()->index()->after('cancelled_at');
            }

            if (! Schema::hasColumn('orders', 'deleted_at')) {
                $table->softDeletes();
            }

            $table->index('buyer_profile_id', 'orders_buyer_profile_id_enterprise_index');
            $table->index('created_at', 'orders_created_at_enterprise_index');
            $table->index(['buyer_profile_id', 'status'], 'orders_buyer_profile_status_enterprise_index');
            $table->index(['supplier_id', 'payment_status'], 'orders_supplier_payment_enterprise_index');
            $table->index(['supplier_id', 'fulfillment_status'], 'orders_supplier_fulfillment_enterprise_index');
        });

        Schema::table('order_items', function (Blueprint $table) {
            if (! Schema::hasColumn('order_items', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('order_items', 'product_id')) {
                $table->foreignId('product_id')
                    ->nullable()
                    ->after('order_id')
                    ->constrained('products')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('order_items', 'quotation_item_id')) {
                $table->foreignId('quotation_item_id')
                    ->nullable()
                    ->after('product_id')
                    ->constrained('quotation_items')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('order_items', 'sku')) {
                $table->string('sku')->nullable()->index()->after('product_name');
            }

            if (! Schema::hasColumn('order_items', 'unit')) {
                $table->string('unit', 50)->nullable()->after('quantity');
            }

            if (! Schema::hasColumn('order_items', 'tax_amount')) {
                $table->decimal('tax_amount', 14, 2)->default(0)->after('unit_price');
            }

            if (! Schema::hasColumn('order_items', 'discount_amount')) {
                $table->decimal('discount_amount', 14, 2)->default(0)->after('tax_amount');
            }

            if (! Schema::hasColumn('order_items', 'total_amount')) {
                $table->decimal('total_amount', 14, 2)->default(0)->after('amount');
            }

            if (! Schema::hasColumn('order_items', 'specifications')) {
                $table->jsonb('specifications')->nullable()->after('total_amount');
            }

            if (! Schema::hasColumn('order_items', 'metadata')) {
                $table->jsonb('metadata')->nullable()->after('specifications');
            }

            if (! Schema::hasColumn('order_items', 'deleted_at')) {
                $table->softDeletes();
            }

            $table->index(['order_id', 'created_at'], 'order_items_order_created_enterprise_index');
            $table->index(['product_id', 'created_at'], 'order_items_product_created_enterprise_index');
            $table->index(['quotation_item_id', 'created_at'], 'order_items_quotation_created_enterprise_index');
        });
    }

    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropIndex('order_items_quotation_created_enterprise_index');
            $table->dropIndex('order_items_product_created_enterprise_index');
            $table->dropIndex('order_items_order_created_enterprise_index');

            if (Schema::hasColumn('order_items', 'quotation_item_id')) {
                $table->dropConstrainedForeignId('quotation_item_id');
            }

            if (Schema::hasColumn('order_items', 'product_id')) {
                $table->dropConstrainedForeignId('product_id');
            }

            $table->dropColumn([
                'uuid',
                'sku',
                'unit',
                'tax_amount',
                'discount_amount',
                'total_amount',
                'specifications',
                'metadata',
            ]);

            if (Schema::hasColumn('order_items', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex('orders_supplier_fulfillment_enterprise_index');
            $table->dropIndex('orders_supplier_payment_enterprise_index');
            $table->dropIndex('orders_buyer_profile_status_enterprise_index');
            $table->dropIndex('orders_created_at_enterprise_index');
            $table->dropIndex('orders_buyer_profile_id_enterprise_index');

            if (Schema::hasColumn('orders', 'currency_id')) {
                $table->dropConstrainedForeignId('currency_id');
            }

            if (Schema::hasColumn('orders', 'buyer_profile_id')) {
                $table->dropConstrainedForeignId('buyer_profile_id');
            }

            $table->dropColumn([
                'uuid',
                'subtotal',
                'tax_amount',
                'shipping_amount',
                'discount_amount',
                'payment_status',
                'fulfillment_status',
                'approval_status',
                'order_source',
                'incoterm',
                'delivery_terms',
                'expected_delivery_date',
                'confirmed_at',
                'cancelled_at',
                'completed_at',
            ]);

            if (Schema::hasColumn('orders', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });
    }
};
