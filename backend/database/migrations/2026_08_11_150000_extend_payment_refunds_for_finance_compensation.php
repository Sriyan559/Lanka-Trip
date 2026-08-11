<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('payment_refunds')) {
            Schema::table('payment_refunds', function (Blueprint $table) {
                if (!Schema::hasColumn('payment_refunds', 'refund_type')) {
                    $table->string('refund_type', 50)->default('Full Refund')->index();
                }
                if (!Schema::hasColumn('payment_refunds', 'compensation_amount')) {
                    $table->decimal('compensation_amount', 14, 2)->default(0);
                }
                if (!Schema::hasColumn('payment_refunds', 'compensation_type')) {
                    $table->string('compensation_type', 50)->nullable();
                }
                if (!Schema::hasColumn('payment_refunds', 'eligibility')) {
                    $table->string('eligibility', 40)->default('Under Review')->index();
                }
                if (!Schema::hasColumn('payment_refunds', 'approval')) {
                    $table->string('approval', 40)->default('Pending Approval')->index();
                }
                if (!Schema::hasColumn('payment_refunds', 'processing')) {
                    $table->string('processing', 40)->default('Pending')->index();
                }
                if (!Schema::hasColumn('payment_refunds', 'settlement_method')) {
                    $table->string('settlement_method', 60)->default('Card Reversal');
                }
                if (!Schema::hasColumn('payment_refunds', 'gateway')) {
                    $table->string('gateway', 60)->nullable();
                }
                if (!Schema::hasColumn('payment_refunds', 'location_region')) {
                    $table->string('location_region', 60)->default('Sri Lanka');
                }
                if (!Schema::hasColumn('payment_refunds', 'reconciliation_status')) {
                    $table->string('reconciliation_status', 40)->default('Pending')->index();
                }
                if (!Schema::hasColumn('payment_refunds', 'reason_code')) {
                    $table->string('reason_code', 60)->default('CUSTOMER_REQUEST')->index();
                }
                if (!Schema::hasColumn('payment_refunds', 'sla_status')) {
                    $table->string('sla_status', 40)->default('Within Target');
                }
                if (!Schema::hasColumn('payment_refunds', 'csat')) {
                    $table->decimal('csat', 3, 2)->default(4.80);
                }
                if (!Schema::hasColumn('payment_refunds', 'approved_by')) {
                    $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
                }
                if (!Schema::hasColumn('payment_refunds', 'approved_at')) {
                    $table->timestamp('approved_at')->nullable();
                }
                if (!Schema::hasColumn('payment_refunds', 'rejected_by')) {
                    $table->foreignId('rejected_by')->nullable()->constrained('users')->nullOnDelete();
                }
                if (!Schema::hasColumn('payment_refunds', 'rejected_at')) {
                    $table->timestamp('rejected_at')->nullable();
                }
                if (!Schema::hasColumn('payment_refunds', 'rejection_reason')) {
                    $table->text('rejection_reason')->nullable();
                }
                if (!Schema::hasColumn('payment_refunds', 'reviewed_by')) {
                    $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
                }
                if (!Schema::hasColumn('payment_refunds', 'reviewed_at')) {
                    $table->timestamp('reviewed_at')->nullable();
                }
                if (!Schema::hasColumn('payment_refunds', 'review_notes')) {
                    $table->text('review_notes')->nullable();
                }
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('payment_refunds')) {
            Schema::table('payment_refunds', function (Blueprint $table) {
                $columns = [
                    'refund_type', 'compensation_amount', 'compensation_type',
                    'eligibility', 'approval', 'processing', 'settlement_method',
                    'gateway', 'location_region', 'reconciliation_status', 'reason_code',
                    'sla_status', 'csat', 'approved_by', 'approved_at', 'rejected_by',
                    'rejected_at', 'rejection_reason', 'reviewed_by', 'reviewed_at', 'review_notes'
                ];
                foreach ($columns as $col) {
                    if (Schema::hasColumn('payment_refunds', $col)) {
                        $table->dropColumn($col);
                    }
                }
            });
        }
    }
};
