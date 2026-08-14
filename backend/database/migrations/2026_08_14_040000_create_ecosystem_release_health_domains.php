<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('ecosystem_module_versions', function (Blueprint $table): void {
            $table->string('release_channel', 30)->default('stable')->after('status');
            $table->timestamp('deprecated_at')->nullable()->after('released_at');
            $table->timestamp('end_of_support_at')->nullable()->after('deprecated_at');
            // Keep this legacy-table alteration SQLite-safe; application validation protects the actor id.
            $table->unsignedBigInteger('released_by')->nullable()->after('created_by')->index();
            $table->index(['status', 'released_at']);
        });

        Schema::create('ecosystem_release_candidates', function (Blueprint $table): void {
            $table->id(); $table->uuid('uuid')->unique(); $table->string('code', 50)->unique();
            $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete();
            $table->foreignId('module_version_id')->constrained('ecosystem_module_versions')->cascadeOnDelete();
            $table->string('source_version', 50)->nullable(); $table->string('target_version', 50);
            $table->string('target_environment', 40); $table->string('status', 30)->default('draft');
            $table->string('approval_status', 30)->default('pending'); $table->string('readiness_status', 30)->default('not_evaluated');
            $table->string('risk_level', 20)->default('unknown'); $table->text('release_notes')->nullable();
            $table->timestamp('scheduled_at')->nullable(); $table->timestamp('started_at')->nullable(); $table->timestamp('completed_at')->nullable();
            $table->unsignedInteger('lock_version')->default(1); $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps();
            $table->index(['status', 'target_environment']); $table->index(['ecosystem_module_id', 'scheduled_at']);
        });
        Schema::create('ecosystem_release_checks', function (Blueprint $table): void {
            $table->id(); $table->foreignId('release_candidate_id')->constrained('ecosystem_release_candidates')->cascadeOnDelete();
            $table->string('check_type', 40); $table->string('status', 30); $table->text('reason')->nullable();
            $table->json('evidence')->nullable(); $table->timestamp('evaluated_at');
            $table->unique(['release_candidate_id', 'check_type']); $table->index(['status', 'check_type']);
        });
        Schema::create('ecosystem_release_deployments', function (Blueprint $table): void {
            $table->id(); $table->uuid('uuid')->unique(); $table->foreignId('release_candidate_id')->constrained('ecosystem_release_candidates')->cascadeOnDelete();
            $table->string('environment', 40); $table->string('version', 50); $table->string('status', 30)->default('pending');
            $table->string('previous_version', 50)->nullable(); $table->string('deployment_reference', 120)->nullable();
            $table->text('reason')->nullable(); $table->timestamp('started_at')->nullable(); $table->timestamp('completed_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps();
            $table->index(['environment', 'status']); $table->index(['release_candidate_id', 'created_at']);
        });
        Schema::create('ecosystem_environment_versions', function (Blueprint $table): void {
            $table->id(); $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete(); $table->string('environment', 40);
            $table->string('version', 50); $table->foreignId('deployment_id')->nullable()->constrained('ecosystem_release_deployments')->nullOnDelete();
            $table->timestamp('deployed_at')->nullable(); $table->timestamps();
            $table->unique(['ecosystem_module_id', 'environment']); $table->index(['environment', 'version']);
        });
        Schema::create('ecosystem_release_audits', function (Blueprint $table): void {
            $table->id(); $table->foreignId('release_candidate_id')->nullable()->constrained('ecosystem_release_candidates')->nullOnDelete();
            $table->string('action', 60); $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->json('before')->nullable(); $table->json('after')->nullable(); $table->text('reason')->nullable(); $table->timestamp('created_at')->useCurrent();
            $table->index(['release_candidate_id', 'created_at']);
        });
        Schema::create('ecosystem_module_sla_targets', function (Blueprint $table): void {
            $table->id(); $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete(); $table->string('environment', 40);
            $table->decimal('availability_target', 6, 3)->nullable(); $table->unsignedInteger('latency_target_ms')->nullable();
            $table->decimal('error_rate_target', 6, 3)->nullable(); $table->timestamps(); $table->unique(['ecosystem_module_id', 'environment']);
        });
        Schema::create('ecosystem_module_usage_daily', function (Blueprint $table): void {
            $table->id(); $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete();
            $table->foreignId('company_profile_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('business_unit_id')->nullable()->constrained('ecosystem_business_units')->nullOnDelete();
            $table->foreignId('channel_id')->nullable()->constrained('ecosystem_channels')->nullOnDelete();
            $table->string('environment', 40); $table->date('metric_date'); $table->unsignedBigInteger('active_users')->default(0);
            $table->unsignedBigInteger('transactions')->default(0); $table->unsignedBigInteger('feature_events')->default(0); $table->timestamps();
            $table->unique(['ecosystem_module_id','company_profile_id','business_unit_id','channel_id','environment','metric_date'], 'ecosystem_usage_scope_day_unique');
            $table->index(['metric_date', 'environment']);
        });
        Schema::create('ecosystem_module_incidents', function (Blueprint $table): void {
            $table->id(); $table->uuid('uuid')->unique(); $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete();
            $table->string('environment', 40); $table->string('severity', 20); $table->string('status', 30)->default('open');
            $table->string('title'); $table->text('description')->nullable(); $table->timestamp('opened_at'); $table->timestamp('resolved_at')->nullable();
            $table->foreignId('owner_id')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps(); $table->index(['status','severity','opened_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ecosystem_module_incidents'); Schema::dropIfExists('ecosystem_module_usage_daily');
        Schema::dropIfExists('ecosystem_module_sla_targets'); Schema::dropIfExists('ecosystem_release_audits');
        Schema::dropIfExists('ecosystem_environment_versions'); Schema::dropIfExists('ecosystem_release_deployments');
        Schema::dropIfExists('ecosystem_release_checks'); Schema::dropIfExists('ecosystem_release_candidates');
        Schema::table('ecosystem_module_versions', function (Blueprint $table): void {
            $table->dropIndex(['status','released_at']); $table->dropIndex(['released_by']);
            $table->dropColumn(['release_channel','deprecated_at','end_of_support_at']);
        });
    }
};
