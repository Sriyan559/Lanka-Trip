<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('supplier_settlements', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('settlement_number', 40)->unique();
            $table->foreignId('supplier_id')->constrained()->restrictOnDelete();
            $table->string('currency', 3);
            $table->decimal('gross_amount', 18, 2)->default(0);
            $table->decimal('commission_amount', 18, 2)->default(0);
            $table->decimal('refund_adjustment', 18, 2)->default(0);
            $table->decimal('other_adjustments', 18, 2)->default(0);
            $table->decimal('net_amount', 18, 2)->default(0);
            $table->string('status', 30)->default('draft');
            $table->date('period_start');
            $table->date('period_end');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->jsonb('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['supplier_id', 'status'], 'supplier_settlements_supplier_status_index');
            $table->index(['status', 'period_end'], 'supplier_settlements_status_period_index');
        });

        Schema::create('supplier_settlement_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_settlement_id')->constrained()->cascadeOnDelete();
            $table->foreignId('order_item_id')->constrained()->restrictOnDelete();
            $table->decimal('gross_amount', 18, 2);
            $table->decimal('commission_amount', 18, 2)->default(0);
            $table->decimal('refund_adjustment', 18, 2)->default(0);
            $table->decimal('net_amount', 18, 2);
            $table->jsonb('metadata')->nullable();
            $table->timestamps();
            $table->unique('order_item_id', 'supplier_settlement_items_order_item_unique');
        });

        Schema::create('payouts', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('payout_number', 40)->unique();
            $table->foreignId('supplier_id')->constrained()->restrictOnDelete();
            $table->foreignId('supplier_settlement_id')->nullable()->unique()->constrained()->nullOnDelete();
            $table->string('currency', 3);
            $table->decimal('gross_amount', 18, 2)->default(0);
            $table->decimal('commission_amount', 18, 2)->default(0);
            $table->decimal('refund_adjustment', 18, 2)->default(0);
            $table->decimal('other_adjustments', 18, 2)->default(0);
            $table->decimal('net_amount', 18, 2)->default(0);
            $table->string('status', 30)->default('draft');
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('failed_at')->nullable();
            $table->text('failure_reason')->nullable();
            $table->string('payment_reference')->nullable();
            $table->date('period_start');
            $table->date('period_end');
            $table->jsonb('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['supplier_id', 'status'], 'payouts_supplier_status_index');
            $table->index(['status', 'paid_at'], 'payouts_status_paid_at_index');
            $table->index(['currency', 'status'], 'payouts_currency_status_index');
        });

        Schema::create('payout_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payout_id')->constrained()->cascadeOnDelete();
            $table->foreignId('order_item_id')->nullable()->constrained()->restrictOnDelete();
            $table->foreignId('supplier_settlement_item_id')->nullable()->constrained()->nullOnDelete();
            $table->decimal('amount', 18, 2);
            $table->string('item_type', 30)->default('settlement');
            $table->jsonb('metadata')->nullable();
            $table->timestamps();
            $table->unique('order_item_id', 'payout_items_order_item_unique');
            $table->unique('supplier_settlement_item_id', 'payout_items_settlement_item_unique');
        });

        Schema::create('return_cases', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('return_number', 40)->unique();
            $table->foreignId('order_id')->constrained()->restrictOnDelete();
            $table->foreignId('customer_id')->constrained('users')->restrictOnDelete();
            $table->foreignId('supplier_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('shipment_id')->nullable()->constrained('shipments')->nullOnDelete();
            $table->foreignId('refund_id')->nullable()->constrained('payment_refunds')->nullOnDelete();
            $table->string('status', 40)->default('requested');
            $table->string('reason_code', 60);
            $table->text('reason');
            $table->string('resolution')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->jsonb('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'created_at'], 'return_cases_status_created_index');
            $table->index(['order_id', 'status'], 'return_cases_order_status_index');
            $table->index(['customer_id', 'status'], 'return_cases_customer_status_index');
            $table->index(['supplier_id', 'status'], 'return_cases_supplier_status_index');
        });

        Schema::create('return_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('return_case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('order_item_id')->constrained()->restrictOnDelete();
            $table->decimal('quantity', 14, 3);
            $table->string('condition', 40)->nullable();
            $table->string('inspection_status', 40)->default('pending');
            $table->decimal('approved_refund_amount', 18, 2)->nullable();
            $table->timestamps();
            $table->unique(['return_case_id', 'order_item_id'], 'return_items_case_order_item_unique');
            $table->index(['order_item_id', 'inspection_status'], 'return_items_order_item_status_index');
        });

        Schema::create('return_evidence', function (Blueprint $table) {
            $table->id();
            $table->foreignId('return_case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('storage_disk', 40)->default('private');
            $table->string('storage_path');
            $table->string('original_name');
            $table->string('mime_type', 100);
            $table->unsignedBigInteger('size_bytes');
            $table->string('status', 30)->default('active');
            $table->timestamps();
            $table->index(['return_case_id', 'status']);
        });

        Schema::create('return_status_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('return_case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('from_status', 40)->nullable();
            $table->string('to_status', 40);
            $table->text('notes')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->index(['return_case_id', 'created_at']);
        });

        Schema::create('return_inspections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('return_case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('inspector_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('result', 40);
            $table->text('notes')->nullable();
            $table->jsonb('findings')->nullable();
            $table->timestamp('inspected_at');
            $table->timestamps();
            $table->index(['return_case_id', 'inspected_at']);
        });

        Schema::create('support_sla_policies', function (Blueprint $table) {
            $table->id();
            $table->string('priority', 20)->unique();
            $table->unsignedInteger('first_response_minutes');
            $table->unsignedInteger('resolution_minutes');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('support_cases', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('case_number', 40)->unique();
            $table->foreignId('customer_id')->constrained('users')->restrictOnDelete();
            $table->string('subject');
            $table->text('description');
            $table->string('channel', 40);
            $table->string('category', 80);
            $table->string('priority', 20)->default('normal');
            $table->string('status', 40)->default('open');
            $table->foreignId('assigned_agent_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('assigned_team', 80)->nullable();
            $table->foreignId('related_order_id')->nullable()->constrained('orders')->nullOnDelete();
            $table->foreignId('related_payment_id')->nullable()->constrained('payments')->nullOnDelete();
            $table->foreignId('related_shipment_id')->nullable()->constrained('shipments')->nullOnDelete();
            $table->foreignId('related_return_id')->nullable()->constrained('return_cases')->nullOnDelete();
            $table->foreignId('related_refund_id')->nullable()->constrained('payment_refunds')->nullOnDelete();
            $table->timestamp('first_response_deadline')->nullable();
            $table->timestamp('resolution_deadline')->nullable();
            $table->timestamp('first_response_at')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamp('closed_at')->nullable();
            $table->timestamp('sla_paused_at')->nullable();
            $table->unsignedBigInteger('sla_paused_seconds')->default(0);
            $table->string('sla_status', 30)->default('within_target');
            $table->unsignedTinyInteger('escalation_level')->default(0);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->jsonb('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'priority'], 'support_cases_status_priority_index');
            $table->index(['assigned_agent_id', 'status'], 'support_cases_agent_status_index');
            $table->index(['customer_id', 'created_at'], 'support_cases_customer_created_index');
            $table->index(['sla_status', 'resolution_deadline'], 'support_cases_sla_deadline_index');
        });

        Schema::table('return_cases', function (Blueprint $table) {
            $table->foreignId('support_case_id')->nullable()->constrained('support_cases')->nullOnDelete();
        });

        Schema::create('support_messages', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('support_case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sender_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('body');
            $table->boolean('is_customer_visible')->default(true);
            $table->string('delivery_status', 30)->default('sent');
            $table->timestamps();
            $table->index(['support_case_id', 'created_at']);
        });

        Schema::create('support_internal_notes', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('support_case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('body');
            $table->string('visibility', 30)->default('internal');
            $table->timestamps();
            $table->index(['support_case_id', 'created_at']);
        });

        Schema::create('support_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('support_case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('agent_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('team', 80)->nullable();
            $table->foreignId('assigned_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('reason')->nullable();
            $table->timestamp('assigned_at');
            $table->timestamp('unassigned_at')->nullable();
            $table->index(['support_case_id', 'assigned_at']);
            $table->index(['agent_id', 'unassigned_at']);
        });

        Schema::create('support_escalations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('support_case_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('level');
            $table->string('target_team', 80);
            $table->text('reason');
            $table->foreignId('escalated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('escalated_at');
            $table->timestamp('resolved_at')->nullable();
            $table->index(['support_case_id', 'escalated_at']);
        });

        Schema::create('support_sla_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('support_case_id')->constrained()->cascadeOnDelete();
            $table->string('event_type', 40);
            $table->string('status', 30);
            $table->timestamp('occurred_at');
            $table->jsonb('metadata')->nullable();
            $table->index(['support_case_id', 'occurred_at']);
        });

        Schema::create('support_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('support_case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('support_message_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('storage_disk', 40)->default('private');
            $table->string('storage_path');
            $table->string('original_name');
            $table->string('mime_type', 100);
            $table->unsignedBigInteger('size_bytes');
            $table->boolean('customer_visible')->default(false);
            $table->timestamps();
            $table->index(['support_case_id', 'created_at']);
        });

        Schema::create('support_case_status_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('support_case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('event_type', 40);
            $table->string('from_status', 40)->nullable();
            $table->string('to_status', 40)->nullable();
            $table->jsonb('changes')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->index(['support_case_id', 'created_at']);
        });

        Schema::create('ecosystem_modules', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('module_key', 100)->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('category', 80);
            $table->string('current_version', 50)->nullable();
            $table->string('status', 30)->default('draft');
            $table->string('approval_status', 30)->default('pending');
            $table->boolean('is_enabled')->default(false);
            $table->string('installation_status', 30)->default('not_installed');
            $table->string('integration_status', 30)->default('not_configured');
            $table->string('health_status', 30)->default('unknown');
            $table->jsonb('configuration_schema')->nullable();
            $table->timestamp('last_health_check_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'is_enabled'], 'ecosystem_modules_status_enabled_index');
            $table->index(['category', 'status'], 'ecosystem_modules_category_status_index');
            $table->index(['health_status', 'last_health_check_at'], 'ecosystem_modules_health_check_index');
        });

        Schema::create('ecosystem_module_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete();
            $table->string('version', 50);
            $table->string('status', 30)->default('draft');
            $table->jsonb('release_notes')->nullable();
            $table->timestamp('released_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->unique(['ecosystem_module_id', 'version'], 'ecosystem_module_versions_unique');
        });

        Schema::create('ecosystem_module_configurations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete();
            $table->string('config_key', 120);
            $table->jsonb('config_value')->nullable();
            $table->text('encrypted_value')->nullable();
            $table->boolean('is_sensitive')->default(false);
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->unique(['ecosystem_module_id', 'config_key'], 'ecosystem_module_configurations_unique');
        });

        Schema::create('ecosystem_module_health_checks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete();
            $table->string('status', 30);
            $table->unsignedInteger('response_time_ms')->nullable();
            $table->text('message')->nullable();
            $table->jsonb('metrics')->nullable();
            $table->timestamp('checked_at');
            $table->index(['ecosystem_module_id', 'checked_at']);
        });

        Schema::create('ecosystem_module_status_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete();
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('event_type', 50);
            $table->string('from_status', 30)->nullable();
            $table->string('to_status', 30)->nullable();
            $table->jsonb('safe_changes')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->index(['ecosystem_module_id', 'created_at']);
        });

        Schema::create('brand_authorization_decisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_brand_authorization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('decision', 40);
            $table->string('from_status', 30)->nullable();
            $table->string('to_status', 30);
            $table->text('notes')->nullable();
            $table->jsonb('findings')->nullable();
            $table->timestamp('decided_at');
            $table->index(['seller_brand_authorization_id', 'decided_at'], 'brand_auth_decisions_auth_date_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('brand_authorization_decisions');
        Schema::dropIfExists('ecosystem_module_status_history');
        Schema::dropIfExists('ecosystem_module_health_checks');
        Schema::dropIfExists('ecosystem_module_configurations');
        Schema::dropIfExists('ecosystem_module_versions');
        Schema::dropIfExists('ecosystem_modules');
        Schema::dropIfExists('support_case_status_history');
        Schema::dropIfExists('support_attachments');
        Schema::dropIfExists('support_sla_events');
        Schema::dropIfExists('support_escalations');
        Schema::dropIfExists('support_assignments');
        Schema::dropIfExists('support_internal_notes');
        Schema::dropIfExists('support_messages');
        Schema::table('return_cases', fn (Blueprint $table) => $table->dropConstrainedForeignId('support_case_id'));
        Schema::dropIfExists('support_cases');
        Schema::dropIfExists('support_sla_policies');
        Schema::dropIfExists('return_inspections');
        Schema::dropIfExists('return_status_history');
        Schema::dropIfExists('return_evidence');
        Schema::dropIfExists('return_items');
        Schema::dropIfExists('return_cases');
        Schema::dropIfExists('payout_items');
        Schema::dropIfExists('payouts');
        Schema::dropIfExists('supplier_settlement_items');
        Schema::dropIfExists('supplier_settlements');
    }
};
