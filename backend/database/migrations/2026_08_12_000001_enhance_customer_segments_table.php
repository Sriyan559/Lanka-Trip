<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('customer_segments')) {
            Schema::table('customer_segments', function (Blueprint $table) {
                if (!Schema::hasColumn('customer_segments', 'code')) {
                    $table->string('code')->nullable()->after('id');
                }
                if (!Schema::hasColumn('customer_segments', 'type')) {
                    $table->string('type')->default('Dynamic')->after('name');
                }
                if (!Schema::hasColumn('customer_segments', 'membership_type')) {
                    $table->string('membership_type')->default('Inclusive')->after('type');
                }
                if (!Schema::hasColumn('customer_segments', 'customer_scope')) {
                    $table->string('customer_scope')->default('Active Customers')->after('membership_type');
                }
                if (!Schema::hasColumn('customer_segments', 'entry_rule_summary')) {
                    $table->text('entry_rule_summary')->nullable()->after('criteria');
                }
                if (!Schema::hasColumn('customer_segments', 'exit_rule_summary')) {
                    $table->text('exit_rule_summary')->nullable()->after('entry_rule_summary');
                }
                if (!Schema::hasColumn('customer_segments', 'avg_ltv_number')) {
                    $table->decimal('avg_ltv_number', 14, 2)->default(0.00)->after('exit_rule_summary');
                }
                if (!Schema::hasColumn('customer_segments', 'order_frequency')) {
                    $table->decimal('order_frequency', 6, 2)->default(0.00)->after('avg_ltv_number');
                }
                if (!Schema::hasColumn('customer_segments', 'retention_rate_pct')) {
                    $table->decimal('retention_rate_pct', 6, 2)->default(0.00)->after('order_frequency');
                }
                if (!Schema::hasColumn('customer_segments', 'consent_eligibility')) {
                    $table->string('consent_eligibility')->default('Eligible')->after('retention_rate_pct');
                }
                if (!Schema::hasColumn('customer_segments', 'risk_level')) {
                    $table->string('risk_level')->default('Low')->after('consent_eligibility');
                }
                if (!Schema::hasColumn('customer_segments', 'overlap_count')) {
                    $table->integer('overlap_count')->default(0)->after('risk_level');
                }
                if (!Schema::hasColumn('customer_segments', 'conflict_status')) {
                    $table->string('conflict_status')->default('None')->after('overlap_count');
                }
                if (!Schema::hasColumn('customer_segments', 'recalculation_schedule')) {
                    $table->string('recalculation_schedule')->default('Daily @ Midnight')->after('conflict_status');
                }
                if (!Schema::hasColumn('customer_segments', 'last_recalculated')) {
                    $table->timestamp('last_recalculated')->nullable()->after('recalculation_schedule');
                }
                if (!Schema::hasColumn('customer_segments', 'owner')) {
                    $table->string('owner')->default('System Admin')->after('last_recalculated');
                }
                if (!Schema::hasColumn('customer_segments', 'version')) {
                    $table->string('version')->default('v1.0')->after('owner');
                }
                if (!Schema::hasColumn('customer_segments', 'status')) {
                    $table->string('status')->default('Active')->after('version');
                }
                if (!Schema::hasColumn('customer_segments', 'score')) {
                    $table->integer('score')->default(85)->after('status');
                }
                if (!Schema::hasColumn('customer_segments', 'score_status')) {
                    $table->string('score_status')->default('Optimal')->after('score');
                }
                if (!Schema::hasColumn('customer_segments', 'rule_details')) {
                    $table->text('rule_details')->nullable()->after('score_status');
                }
                if (!Schema::hasColumn('customer_segments', 'linked_groups')) {
                    $table->json('linked_groups')->nullable()->after('rule_details');
                }
                if (!Schema::hasColumn('customer_segments', 'consent_requirement')) {
                    $table->string('consent_requirement')->default('Explicit Consent Required')->after('linked_groups');
                }
                if (!Schema::hasColumn('customer_segments', 'risk_note')) {
                    $table->text('risk_note')->nullable()->after('consent_requirement');
                }
                if (!Schema::hasColumn('customer_segments', 'next_recalculation')) {
                    $table->timestamp('next_recalculation')->nullable()->after('risk_note');
                }
                if (!Schema::hasColumn('customer_segments', 'new_members_count')) {
                    $table->integer('new_members_count')->default(0)->after('next_recalculation');
                }
                if (!Schema::hasColumn('customer_segments', 'removed_members_count')) {
                    $table->integer('removed_members_count')->default(0)->after('new_members_count');
                }
            });
        }
    }

    public function down(): void
    {
        // Keep schema intact in down
    }
};
