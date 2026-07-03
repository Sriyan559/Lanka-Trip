<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('incoterms')) {
            Schema::create('incoterms', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('code', 10)->unique();
                $table->string('name');
                $table->text('description')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('ports')) {
            Schema::create('ports', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
                $table->string('code')->nullable()->unique();
                $table->string('name');
                $table->string('city')->nullable();
                $table->string('port_type', 50)->default('sea')->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['country_id', 'status']);
            });
        }

        if (! Schema::hasTable('shipment_methods')) {
            Schema::create('shipment_methods', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->string('method_type', 50)->index();
                $table->text('description')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('logistics_partners')) {
            Schema::create('logistics_partners', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
                $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->string('partner_type', 80)->nullable()->index();
                $table->string('contact_name')->nullable();
                $table->string('email')->nullable();
                $table->string('phone', 50)->nullable();
                $table->string('website')->nullable();
                $table->text('address')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['country_id', 'status']);
            });
        }

        if (! Schema::hasTable('logistics_partner_services')) {
            Schema::create('logistics_partner_services', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('logistics_partner_id')->constrained('logistics_partners')->cascadeOnDelete();
                $table->foreignId('shipment_method_id')->nullable()->constrained('shipment_methods')->nullOnDelete();
                $table->string('service_name');
                $table->string('service_code')->nullable();
                $table->text('description')->nullable();
                $table->jsonb('coverage')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['logistics_partner_id', 'status'], 'lps_partner_status_index');
            });
        }

        if (! Schema::hasTable('delivery_addresses')) {
            Schema::create('delivery_addresses', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
                $table->string('label')->nullable();
                $table->string('contact_name')->nullable();
                $table->string('phone', 50)->nullable();
                $table->string('company_name')->nullable();
                $table->text('address_line_1');
                $table->text('address_line_2')->nullable();
                $table->string('city', 100)->nullable();
                $table->string('state', 100)->nullable();
                $table->string('postal_code', 30)->nullable();
                $table->boolean('is_default')->default(false)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['buyer_profile_id', 'status'], 'delivery_addresses_buyer_status_index');
                $table->index(['supplier_id', 'status']);
                $table->index(['country_id', 'status']);
            });
        }

        if (! Schema::hasTable('trade_document_types')) {
            Schema::create('trade_document_types', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->string('code')->nullable()->unique();
                $table->text('description')->nullable();
                $table->boolean('is_required_for_export')->default(false)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('shipments')) {
            Schema::create('shipments', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('logistics_partner_id')->nullable()->constrained('logistics_partners')->nullOnDelete();
                $table->foreignId('shipment_method_id')->nullable()->constrained('shipment_methods')->nullOnDelete();
                $table->foreignId('origin_country_id')->nullable()->constrained('countries')->nullOnDelete();
                $table->foreignId('destination_country_id')->nullable()->constrained('countries')->nullOnDelete();
                $table->foreignId('origin_port_id')->nullable()->constrained('ports')->nullOnDelete();
                $table->foreignId('destination_port_id')->nullable()->constrained('ports')->nullOnDelete();
                $table->foreignId('delivery_address_id')->nullable()->constrained('delivery_addresses')->nullOnDelete();
                $table->string('shipment_number')->unique();
                $table->string('tracking_number')->nullable()->index();
                $table->string('carrier_reference')->nullable()->index();
                $table->string('incoterm', 20)->nullable()->index();
                $table->date('estimated_ship_date')->nullable();
                $table->date('estimated_delivery_date')->nullable();
                $table->timestamp('shipped_at')->nullable();
                $table->timestamp('delivered_at')->nullable();
                $table->string('status', 30)->default('pending')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'status']);
                $table->index(['supplier_id', 'status']);
                $table->index(['buyer_profile_id', 'status'], 'shipments_buyer_status_index');
                $table->index(['logistics_partner_id', 'status'], 'shipments_partner_status_index');
                $table->index(['destination_country_id', 'status'], 'shipments_dest_country_status_index');
                $table->index(['destination_port_id', 'status'], 'shipments_dest_port_status_index');
                $table->index('created_at', 'shipments_created_at_index');
            });
        }

        if (! Schema::hasTable('shipment_items')) {
            Schema::create('shipment_items', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('shipment_id')->constrained('shipments')->cascadeOnDelete();
                $table->foreignId('order_item_id')->nullable()->constrained('order_items')->nullOnDelete();
                $table->string('product_name')->nullable();
                $table->decimal('quantity', 14, 2);
                $table->string('unit', 50)->nullable();
                $table->decimal('gross_weight', 14, 3)->nullable();
                $table->decimal('net_weight', 14, 3)->nullable();
                $table->string('weight_unit', 20)->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['shipment_id', 'created_at']);
                $table->index(['order_item_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('shipment_tracking_events')) {
            Schema::create('shipment_tracking_events', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('shipment_id')->constrained('shipments')->cascadeOnDelete();
                $table->string('event_code')->nullable()->index();
                $table->string('event_name');
                $table->text('description')->nullable();
                $table->string('location')->nullable();
                $table->timestamp('occurred_at')->nullable()->index();
                $table->jsonb('tracking_payload')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['shipment_id', 'created_at']);
                $table->index(['shipment_id', 'status']);
            });
        }

        if (! Schema::hasTable('shipment_documents')) {
            Schema::create('shipment_documents', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('shipment_id')->constrained('shipments')->cascadeOnDelete();
                $table->foreignId('trade_document_type_id')->nullable()->constrained('trade_document_types')->nullOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('document_number')->nullable()->index();
                $table->string('title')->nullable();
                $table->string('file_url')->nullable();
                $table->date('issued_at')->nullable();
                $table->date('expires_at')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('document_metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['shipment_id', 'status']);
                $table->index(['trade_document_type_id', 'status'], 'shipment_docs_type_status_index');
            });
        }

        if (! Schema::hasTable('trade_documents')) {
            Schema::create('trade_documents', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->nullable()->constrained('orders')->cascadeOnDelete();
                $table->foreignId('shipment_id')->nullable()->constrained('shipments')->cascadeOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('trade_document_type_id')->constrained('trade_document_types')->restrictOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('document_number')->nullable()->index();
                $table->string('title')->nullable();
                $table->string('issuer')->nullable();
                $table->date('issued_at')->nullable();
                $table->date('expires_at')->nullable();
                $table->string('status', 30)->default('draft')->index();
                $table->jsonb('document_metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'status']);
                $table->index(['shipment_id', 'status']);
                $table->index(['supplier_id', 'status']);
                $table->index(['buyer_profile_id', 'status'], 'trade_docs_buyer_status_index');
                $table->index('created_at', 'trade_documents_created_at_index');
            });
        }

        if (! Schema::hasTable('order_trade_documents')) {
            Schema::create('order_trade_documents', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('trade_document_id')->constrained('trade_documents')->cascadeOnDelete();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->unique(['order_id', 'trade_document_id']);
                $table->index(['order_id', 'status']);
            });
        }

        if (! Schema::hasTable('customs_declarations')) {
            Schema::create('customs_declarations', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->nullable()->constrained('orders')->cascadeOnDelete();
                $table->foreignId('shipment_id')->nullable()->constrained('shipments')->cascadeOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
                $table->string('declaration_number')->nullable()->unique();
                $table->string('export_country_code', 3)->nullable();
                $table->string('import_country_code', 3)->nullable();
                $table->decimal('declared_value', 14, 2)->nullable();
                $table->string('status', 30)->default('draft')->index();
                $table->jsonb('customs_data')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'status']);
                $table->index(['shipment_id', 'status']);
                $table->index(['supplier_id', 'status']);
                $table->index(['buyer_profile_id', 'status'], 'customs_buyer_status_index');
                $table->index('created_at', 'customs_declarations_created_at_index');
            });
        }

        if (! Schema::hasTable('customs_declaration_items')) {
            Schema::create('customs_declaration_items', function (Blueprint $table) {
                $table->id();
                $table->foreignId('customs_declaration_id')->constrained('customs_declarations')->cascadeOnDelete();
                $table->foreignId('order_item_id')->nullable()->constrained('order_items')->nullOnDelete();
                $table->string('description');
                $table->string('hs_code')->nullable()->index();
                $table->string('country_of_origin', 3)->nullable();
                $table->decimal('quantity', 14, 2);
                $table->string('unit', 50)->nullable();
                $table->decimal('declared_value', 14, 2)->nullable();
                $table->jsonb('customs_data')->nullable();
                $table->timestamps();

                $table->index(['customs_declaration_id', 'created_at'], 'customs_items_declaration_created_index');
            });
        }

        if (! Schema::hasTable('export_compliance_checks')) {
            Schema::create('export_compliance_checks', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->nullable()->constrained('orders')->cascadeOnDelete();
                $table->foreignId('shipment_id')->nullable()->constrained('shipments')->cascadeOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('checked_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('check_number')->unique();
                $table->string('status', 30)->default('pending')->index();
                $table->timestamp('checked_at')->nullable();
                $table->jsonb('compliance_rules')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'status']);
                $table->index(['shipment_id', 'status']);
                $table->index(['supplier_id', 'status']);
                $table->index(['buyer_profile_id', 'status'], 'compliance_buyer_status_index');
            });
        }

        if (! Schema::hasTable('export_compliance_check_items')) {
            Schema::create('export_compliance_check_items', function (Blueprint $table) {
                $table->id();
                $table->foreignId('export_compliance_check_id')->constrained('export_compliance_checks')->cascadeOnDelete();
                $table->string('rule_code')->nullable()->index();
                $table->string('rule_name');
                $table->string('result', 30)->default('pending')->index();
                $table->text('notes')->nullable();
                $table->jsonb('rule_payload')->nullable();
                $table->timestamps();

                $table->index(['export_compliance_check_id', 'created_at'], 'compliance_items_check_created_index');
            });
        }

        if (! Schema::hasTable('shipment_status_histories')) {
            Schema::create('shipment_status_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('shipment_id')->constrained('shipments')->cascadeOnDelete();
                $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('previous_status', 30)->nullable();
                $table->string('new_status', 30)->index();
                $table->text('notes')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['shipment_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('logistics_quotes')) {
            Schema::create('logistics_quotes', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->nullable()->constrained('orders')->cascadeOnDelete();
                $table->foreignId('shipment_id')->nullable()->constrained('shipments')->nullOnDelete();
                $table->foreignId('logistics_partner_id')->constrained('logistics_partners')->cascadeOnDelete();
                $table->foreignId('shipment_method_id')->nullable()->constrained('shipment_methods')->nullOnDelete();
                $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
                $table->string('quote_number')->unique();
                $table->decimal('subtotal', 14, 2)->default(0);
                $table->decimal('tax_amount', 14, 2)->default(0);
                $table->decimal('total_amount', 14, 2)->default(0);
                $table->date('valid_until')->nullable();
                $table->string('status', 30)->default('draft')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'status']);
                $table->index(['shipment_id', 'status']);
                $table->index(['logistics_partner_id', 'status'], 'logistics_quotes_partner_status_index');
                $table->index('created_at', 'logistics_quotes_created_at_index');
            });
        }

        if (! Schema::hasTable('logistics_quote_items')) {
            Schema::create('logistics_quote_items', function (Blueprint $table) {
                $table->id();
                $table->foreignId('logistics_quote_id')->constrained('logistics_quotes')->cascadeOnDelete();
                $table->string('description');
                $table->decimal('quantity', 14, 2)->default(1);
                $table->decimal('unit_price', 14, 2)->default(0);
                $table->decimal('tax_amount', 14, 2)->default(0);
                $table->decimal('total_amount', 14, 2)->default(0);
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['logistics_quote_id', 'created_at'], 'logistics_quote_items_quote_created_index');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('logistics_quote_items');
        Schema::dropIfExists('logistics_quotes');
        Schema::dropIfExists('shipment_status_histories');
        Schema::dropIfExists('export_compliance_check_items');
        Schema::dropIfExists('export_compliance_checks');
        Schema::dropIfExists('customs_declaration_items');
        Schema::dropIfExists('customs_declarations');
        Schema::dropIfExists('order_trade_documents');
        Schema::dropIfExists('trade_documents');
        Schema::dropIfExists('shipment_documents');
        Schema::dropIfExists('shipment_tracking_events');
        Schema::dropIfExists('shipment_items');
        Schema::dropIfExists('shipments');
        Schema::dropIfExists('trade_document_types');
        Schema::dropIfExists('delivery_addresses');
        Schema::dropIfExists('logistics_partner_services');
        Schema::dropIfExists('logistics_partners');
        Schema::dropIfExists('shipment_methods');
        Schema::dropIfExists('ports');
        Schema::dropIfExists('incoterms');
    }
};
