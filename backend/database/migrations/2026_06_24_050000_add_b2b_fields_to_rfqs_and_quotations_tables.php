<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('rfqs', function (Blueprint $table) {
            if (! Schema::hasColumn('rfqs', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('rfqs', 'buyer_profile_id')) {
                $table->foreignId('buyer_profile_id')
                    ->nullable()
                    ->after('user_id')
                    ->constrained('buyer_profiles')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('rfqs', 'category_id')) {
                $table->foreignId('category_id')
                    ->nullable()
                    ->after('buyer_profile_id')
                    ->constrained('categories')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('rfqs', 'quantity')) {
                $table->decimal('quantity', 14, 2)->nullable()->after('description');
            }

            if (! Schema::hasColumn('rfqs', 'unit')) {
                $table->string('unit', 50)->nullable()->after('quantity');
            }

            if (! Schema::hasColumn('rfqs', 'target_price')) {
                $table->decimal('target_price', 14, 2)->nullable()->after('unit');
            }

            if (! Schema::hasColumn('rfqs', 'currency_id')) {
                $table->foreignId('currency_id')
                    ->nullable()
                    ->after('target_price')
                    ->constrained('currencies')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('rfqs', 'delivery_country_id')) {
                $table->foreignId('delivery_country_id')
                    ->nullable()
                    ->after('destination_country')
                    ->constrained('countries')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('rfqs', 'delivery_port')) {
                $table->string('delivery_port')->nullable()->after('delivery_country_id');
            }

            if (! Schema::hasColumn('rfqs', 'required_date')) {
                $table->date('required_date')->nullable()->after('expected_delivery_date');
            }

            if (! Schema::hasColumn('rfqs', 'expires_at')) {
                $table->timestamp('expires_at')->nullable()->index()->after('required_date');
            }

            if (! Schema::hasColumn('rfqs', 'visibility')) {
                $table->string('visibility', 30)->default('public')->index()->after('expires_at');
            }

            if (! Schema::hasColumn('rfqs', 'priority')) {
                $table->string('priority', 30)->default('normal')->index()->after('visibility');
            }

            if (! Schema::hasColumn('rfqs', 'published_at')) {
                $table->timestamp('published_at')->nullable()->index()->after('status');
            }

            if (! Schema::hasColumn('rfqs', 'closed_at')) {
                $table->timestamp('closed_at')->nullable()->index()->after('published_at');
            }

            $table->index('buyer_profile_id', 'rfqs_buyer_profile_id_workflow_index');
            $table->index('category_id', 'rfqs_category_id_workflow_index');
            $table->index('created_at', 'rfqs_created_at_workflow_index');
            $table->index(['buyer_profile_id', 'status'], 'rfqs_buyer_profile_status_workflow_index');
            $table->index(['category_id', 'status'], 'rfqs_category_status_workflow_index');
        });

        Schema::table('quotations', function (Blueprint $table) {
            if (! Schema::hasColumn('quotations', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('quotations', 'buyer_profile_id')) {
                $table->foreignId('buyer_profile_id')
                    ->nullable()
                    ->after('supplier_id')
                    ->constrained('buyer_profiles')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('quotations', 'currency_id')) {
                $table->foreignId('currency_id')
                    ->nullable()
                    ->after('quotation_number')
                    ->constrained('currencies')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('quotations', 'subtotal')) {
                $table->decimal('subtotal', 14, 2)->default(0)->after('currency_id');
            }

            if (! Schema::hasColumn('quotations', 'tax_amount')) {
                $table->decimal('tax_amount', 14, 2)->default(0)->after('subtotal');
            }

            if (! Schema::hasColumn('quotations', 'shipping_amount')) {
                $table->decimal('shipping_amount', 14, 2)->default(0)->after('tax_amount');
            }

            if (! Schema::hasColumn('quotations', 'lead_time_days')) {
                $table->unsignedInteger('lead_time_days')->nullable()->after('lead_time');
            }

            if (! Schema::hasColumn('quotations', 'delivery_terms')) {
                $table->string('delivery_terms')->nullable()->after('shipping_terms');
            }

            if (! Schema::hasColumn('quotations', 'validity_date')) {
                $table->date('validity_date')->nullable()->after('delivery_terms');
            }

            if (! Schema::hasColumn('quotations', 'submitted_at')) {
                $table->timestamp('submitted_at')->nullable()->index()->after('status');
            }

            if (! Schema::hasColumn('quotations', 'accepted_at')) {
                $table->timestamp('accepted_at')->nullable()->index()->after('submitted_at');
            }

            if (! Schema::hasColumn('quotations', 'rejected_at')) {
                $table->timestamp('rejected_at')->nullable()->index()->after('accepted_at');
            }

            if (! Schema::hasColumn('quotations', 'deleted_at')) {
                $table->softDeletes();
            }

            $table->index('buyer_profile_id', 'quotations_buyer_profile_id_workflow_index');
            $table->index('created_at', 'quotations_created_at_workflow_index');
            $table->index(['buyer_profile_id', 'status'], 'quotations_buyer_profile_status_workflow_index');
            $table->index(['supplier_id', 'status'], 'quotations_supplier_status_workflow_index');
            $table->index(['rfq_id', 'status'], 'quotations_rfq_status_workflow_index');
        });
    }

    public function down(): void
    {
        Schema::table('quotations', function (Blueprint $table) {
            $table->dropIndex('quotations_rfq_status_workflow_index');
            $table->dropIndex('quotations_supplier_status_workflow_index');
            $table->dropIndex('quotations_buyer_profile_status_workflow_index');
            $table->dropIndex('quotations_created_at_workflow_index');
            $table->dropIndex('quotations_buyer_profile_id_workflow_index');

            if (Schema::hasColumn('quotations', 'currency_id')) {
                $table->dropConstrainedForeignId('currency_id');
            }

            if (Schema::hasColumn('quotations', 'buyer_profile_id')) {
                $table->dropConstrainedForeignId('buyer_profile_id');
            }

            $table->dropColumn([
                'uuid',
                'subtotal',
                'tax_amount',
                'shipping_amount',
                'lead_time_days',
                'delivery_terms',
                'validity_date',
                'submitted_at',
                'accepted_at',
                'rejected_at',
            ]);

            if (Schema::hasColumn('quotations', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });

        Schema::table('rfqs', function (Blueprint $table) {
            $table->dropIndex('rfqs_category_status_workflow_index');
            $table->dropIndex('rfqs_buyer_profile_status_workflow_index');
            $table->dropIndex('rfqs_created_at_workflow_index');
            $table->dropIndex('rfqs_category_id_workflow_index');
            $table->dropIndex('rfqs_buyer_profile_id_workflow_index');

            if (Schema::hasColumn('rfqs', 'delivery_country_id')) {
                $table->dropConstrainedForeignId('delivery_country_id');
            }

            if (Schema::hasColumn('rfqs', 'currency_id')) {
                $table->dropConstrainedForeignId('currency_id');
            }

            if (Schema::hasColumn('rfqs', 'category_id')) {
                $table->dropConstrainedForeignId('category_id');
            }

            if (Schema::hasColumn('rfqs', 'buyer_profile_id')) {
                $table->dropConstrainedForeignId('buyer_profile_id');
            }

            $table->dropColumn([
                'uuid',
                'quantity',
                'unit',
                'target_price',
                'delivery_port',
                'required_date',
                'expires_at',
                'visibility',
                'priority',
                'published_at',
                'closed_at',
            ]);
        });
    }
};
