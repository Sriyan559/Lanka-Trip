<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (! Schema::hasColumn('orders', 'shipping_country_id')) {
                $table->foreignId('shipping_country_id')
                    ->nullable()
                    ->after('buyer_profile_id')
                    ->constrained('countries')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('orders', 'shipping_port_id')) {
                $table->foreignId('shipping_port_id')
                    ->nullable()
                    ->after('shipping_country_id')
                    ->constrained('ports')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('orders', 'delivery_address_id')) {
                $table->foreignId('delivery_address_id')
                    ->nullable()
                    ->after('shipping_port_id')
                    ->constrained('delivery_addresses')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('orders', 'logistics_partner_id')) {
                $table->foreignId('logistics_partner_id')
                    ->nullable()
                    ->after('delivery_address_id')
                    ->constrained('logistics_partners')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('orders', 'shipment_method_id')) {
                $table->foreignId('shipment_method_id')
                    ->nullable()
                    ->after('logistics_partner_id')
                    ->constrained('shipment_methods')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('orders', 'shipping_reference')) {
                $table->string('shipping_reference')->nullable()->index()->after('shipment_method_id');
            }

            if (! Schema::hasColumn('orders', 'export_status')) {
                $table->string('export_status', 30)->default('pending')->index()->after('shipping_reference');
            }

            if (! Schema::hasColumn('orders', 'customs_status')) {
                $table->string('customs_status', 30)->default('pending')->index()->after('export_status');
            }

            if (! Schema::hasColumn('orders', 'logistics_status')) {
                $table->string('logistics_status', 30)->default('pending')->index()->after('customs_status');
            }

            $table->index(['shipping_country_id', 'logistics_status'], 'orders_ship_country_logistics_index');
            $table->index(['shipping_port_id', 'logistics_status'], 'orders_ship_port_logistics_index');
            $table->index(['logistics_partner_id', 'logistics_status'], 'orders_partner_logistics_index');
            $table->index(['shipment_method_id', 'logistics_status'], 'orders_method_logistics_index');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex('orders_method_logistics_index');
            $table->dropIndex('orders_partner_logistics_index');
            $table->dropIndex('orders_ship_port_logistics_index');
            $table->dropIndex('orders_ship_country_logistics_index');

            if (Schema::hasColumn('orders', 'shipment_method_id')) {
                $table->dropConstrainedForeignId('shipment_method_id');
            }

            if (Schema::hasColumn('orders', 'logistics_partner_id')) {
                $table->dropConstrainedForeignId('logistics_partner_id');
            }

            if (Schema::hasColumn('orders', 'delivery_address_id')) {
                $table->dropConstrainedForeignId('delivery_address_id');
            }

            if (Schema::hasColumn('orders', 'shipping_port_id')) {
                $table->dropConstrainedForeignId('shipping_port_id');
            }

            if (Schema::hasColumn('orders', 'shipping_country_id')) {
                $table->dropConstrainedForeignId('shipping_country_id');
            }

            $table->dropColumn([
                'shipping_reference',
                'export_status',
                'customs_status',
                'logistics_status',
            ]);
        });
    }
};
