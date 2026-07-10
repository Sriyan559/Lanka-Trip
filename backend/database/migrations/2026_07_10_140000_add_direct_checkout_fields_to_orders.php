<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE orders ALTER COLUMN quotation_id DROP NOT NULL');
            DB::statement('ALTER TABLE orders ALTER COLUMN rfq_id DROP NOT NULL');
        }

        Schema::table('orders', function (Blueprint $table) {
            if (! Schema::hasColumn('orders', 'checkout_customer')) {
                $table->jsonb('checkout_customer')->nullable()->after('shipping_terms');
            }

            if (! Schema::hasColumn('orders', 'checkout_delivery_address')) {
                $table->jsonb('checkout_delivery_address')->nullable()->after('checkout_customer');
            }

            if (! Schema::hasColumn('orders', 'payment_method_slug')) {
                $table->string('payment_method_slug', 80)->nullable()->index()->after('payment_terms');
            }

            if (! Schema::hasColumn('orders', 'platform_fee_amount')) {
                $table->decimal('platform_fee_amount', 14, 2)->default(0)->after('discount_amount');
            }
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (Schema::hasColumn('orders', 'platform_fee_amount')) {
                $table->dropColumn('platform_fee_amount');
            }

            if (Schema::hasColumn('orders', 'payment_method_slug')) {
                $table->dropColumn('payment_method_slug');
            }

            if (Schema::hasColumn('orders', 'checkout_delivery_address')) {
                $table->dropColumn('checkout_delivery_address');
            }

            if (Schema::hasColumn('orders', 'checkout_customer')) {
                $table->dropColumn('checkout_customer');
            }
        });
    }
};
