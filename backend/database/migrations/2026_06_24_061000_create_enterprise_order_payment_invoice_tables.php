<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('invoices')) {
            Schema::create('invoices', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
                $table->string('invoice_number')->unique();
                $table->date('invoice_date')->nullable();
                $table->date('due_date')->nullable();
                $table->decimal('subtotal', 14, 2)->default(0);
                $table->decimal('tax_amount', 14, 2)->default(0);
                $table->decimal('shipping_amount', 14, 2)->default(0);
                $table->decimal('discount_amount', 14, 2)->default(0);
                $table->decimal('total_amount', 14, 2)->default(0);
                $table->decimal('amount_paid', 14, 2)->default(0);
                $table->decimal('balance_due', 14, 2)->default(0);
                $table->string('payment_status', 30)->default('unpaid')->index();
                $table->string('status', 30)->default('draft')->index();
                $table->timestamp('sent_at')->nullable();
                $table->timestamp('paid_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'status']);
                $table->index(['supplier_id', 'status']);
                $table->index(['buyer_profile_id', 'status'], 'invoices_buyer_profile_status_index');
                $table->index('created_at', 'invoices_created_at_index');
            });
        }

        if (! Schema::hasTable('invoice_items')) {
            Schema::create('invoice_items', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('invoice_id')->constrained('invoices')->cascadeOnDelete();
                $table->foreignId('order_item_id')->nullable()->constrained('order_items')->nullOnDelete();
                $table->string('description');
                $table->decimal('quantity', 14, 2)->default(1);
                $table->string('unit', 50)->nullable();
                $table->decimal('unit_price', 14, 2)->default(0);
                $table->decimal('tax_amount', 14, 2)->default(0);
                $table->decimal('discount_amount', 14, 2)->default(0);
                $table->decimal('total_amount', 14, 2)->default(0);
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['invoice_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('payment_methods')) {
            Schema::create('payment_methods', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->string('provider')->nullable();
                $table->string('method_type', 50)->index();
                $table->text('description')->nullable();
                $table->boolean('requires_manual_review')->default(false);
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('payments')) {
            Schema::create('payments', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('invoice_id')->nullable()->constrained('invoices')->nullOnDelete();
                $table->foreignId('payment_method_id')->nullable()->constrained('payment_methods')->nullOnDelete();
                $table->foreignId('payer_user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
                $table->string('payment_number')->unique();
                $table->decimal('amount', 14, 2);
                $table->decimal('fee_amount', 14, 2)->default(0);
                $table->string('status', 30)->default('pending')->index();
                $table->string('payment_status', 30)->default('pending')->index();
                $table->string('gateway_reference')->nullable()->index();
                $table->timestamp('authorized_at')->nullable();
                $table->timestamp('paid_at')->nullable();
                $table->timestamp('failed_at')->nullable();
                $table->jsonb('gateway_response')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'status']);
                $table->index(['invoice_id', 'status']);
                $table->index(['payment_method_id', 'status']);
                $table->index('created_at', 'payments_created_at_index');
            });
        }

        if (! Schema::hasTable('payment_transactions')) {
            Schema::create('payment_transactions', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('payment_id')->constrained('payments')->cascadeOnDelete();
                $table->string('transaction_reference')->nullable()->unique();
                $table->string('transaction_type', 50)->index();
                $table->decimal('amount', 14, 2)->default(0);
                $table->string('status', 30)->default('pending')->index();
                $table->string('gateway_status')->nullable();
                $table->jsonb('gateway_response')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['payment_id', 'status']);
                $table->index('created_at', 'payment_transactions_created_at_index');
            });
        }

        if (! Schema::hasTable('payment_refunds')) {
            Schema::create('payment_refunds', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('payment_id')->constrained('payments')->cascadeOnDelete();
                $table->foreignId('requested_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('refund_number')->unique();
                $table->decimal('amount', 14, 2);
                $table->text('reason')->nullable();
                $table->string('status', 30)->default('pending')->index();
                $table->timestamp('processed_at')->nullable();
                $table->jsonb('gateway_response')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['payment_id', 'status']);
            });
        }

        if (! Schema::hasTable('order_status_histories')) {
            Schema::create('order_status_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('previous_status', 30)->nullable();
                $table->string('new_status', 30)->index();
                $table->text('notes')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['order_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('order_documents')) {
            Schema::create('order_documents', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('title')->nullable();
                $table->string('document_type', 80)->index();
                $table->string('file_url')->nullable();
                $table->string('file_path')->nullable();
                $table->string('mime_type', 120)->nullable();
                $table->unsignedBigInteger('file_size')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'status']);
            });
        }

        if (! Schema::hasTable('order_notes')) {
            Schema::create('order_notes', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->text('note');
                $table->boolean('is_internal')->default(false)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('order_approvals')) {
            Schema::create('order_approvals', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('requested_by')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('approval_type', 80)->default('order')->index();
                $table->string('status', 30)->default('pending')->index();
                $table->text('notes')->nullable();
                $table->timestamp('requested_at')->nullable();
                $table->timestamp('approved_at')->nullable();
                $table->timestamp('rejected_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'status']);
            });
        }

        if (! Schema::hasTable('order_shipments')) {
            Schema::create('order_shipments', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
                $table->string('shipment_number')->unique();
                $table->string('carrier')->nullable();
                $table->string('tracking_number')->nullable()->index();
                $table->string('shipping_method')->nullable();
                $table->string('origin_port')->nullable();
                $table->string('destination_port')->nullable();
                $table->date('estimated_ship_date')->nullable();
                $table->date('estimated_delivery_date')->nullable();
                $table->timestamp('shipped_at')->nullable();
                $table->timestamp('delivered_at')->nullable();
                $table->string('status', 30)->default('pending')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'status']);
                $table->index('created_at', 'order_shipments_created_at_index');
            });
        }

        if (! Schema::hasTable('order_shipment_items')) {
            Schema::create('order_shipment_items', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_shipment_id')->constrained('order_shipments')->cascadeOnDelete();
                $table->foreignId('order_item_id')->constrained('order_items')->cascadeOnDelete();
                $table->decimal('quantity', 14, 2);
                $table->string('unit', 50)->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->unique(['order_shipment_id', 'order_item_id'], 'order_shipment_items_unique');
                $table->index(['order_item_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('order_disputes')) {
            Schema::create('order_disputes', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('opened_by')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
                $table->string('dispute_number')->unique();
                $table->string('reason', 120)->index();
                $table->text('description')->nullable();
                $table->string('status', 30)->default('open')->index();
                $table->string('resolution_status', 30)->nullable()->index();
                $table->timestamp('opened_at')->nullable();
                $table->timestamp('resolved_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_id', 'status']);
                $table->index('created_at', 'order_disputes_created_at_index');
            });
        }

        if (! Schema::hasTable('order_dispute_messages')) {
            Schema::create('order_dispute_messages', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_dispute_id')->constrained('order_disputes')->cascadeOnDelete();
                $table->foreignId('sender_id')->nullable()->constrained('users')->nullOnDelete();
                $table->text('message');
                $table->boolean('is_internal')->default(false)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_dispute_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('order_dispute_attachments')) {
            Schema::create('order_dispute_attachments', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('order_dispute_id')->constrained('order_disputes')->cascadeOnDelete();
                $table->foreignId('order_dispute_message_id')->nullable()->constrained('order_dispute_messages')->cascadeOnDelete();
                $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('title')->nullable();
                $table->string('file_url')->nullable();
                $table->string('file_path')->nullable();
                $table->string('mime_type', 120)->nullable();
                $table->unsignedBigInteger('file_size')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['order_dispute_id', 'status']);
            });
        }

        if (! Schema::hasTable('order_audit_logs')) {
            Schema::create('order_audit_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('event')->index();
                $table->string('auditable_type')->nullable();
                $table->unsignedBigInteger('auditable_id')->nullable();
                $table->jsonb('old_values')->nullable();
                $table->jsonb('new_values')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['order_id', 'created_at']);
                $table->index(['auditable_type', 'auditable_id'], 'order_audit_logs_auditable_index');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('order_audit_logs');
        Schema::dropIfExists('order_dispute_attachments');
        Schema::dropIfExists('order_dispute_messages');
        Schema::dropIfExists('order_disputes');
        Schema::dropIfExists('order_shipment_items');
        Schema::dropIfExists('order_shipments');
        Schema::dropIfExists('order_approvals');
        Schema::dropIfExists('order_notes');
        Schema::dropIfExists('order_documents');
        Schema::dropIfExists('order_status_histories');
        Schema::dropIfExists('payment_refunds');
        Schema::dropIfExists('payment_transactions');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('payment_methods');
        Schema::dropIfExists('invoice_items');
        Schema::dropIfExists('invoices');
    }
};
