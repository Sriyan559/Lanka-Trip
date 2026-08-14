<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ecosystem_modules', function (Blueprint $table): void {
            $table->string('module_type', 30)->default('optional')->after('category');
            $table->string('lifecycle', 30)->default('planned')->after('module_type');
            $table->string('environment', 30)->default('development')->after('health_status');
            $table->string('region', 80)->nullable()->after('environment');
            $table->string('target_version', 50)->nullable()->after('current_version');
            $table->string('release_status', 30)->default('not_scheduled')->after('target_version');
            $table->string('configuration_status', 30)->default('not_configured')->after('integration_status');
            $table->string('dependency_status', 30)->default('not_assessed')->after('configuration_status');
            $table->string('compatibility_status', 30)->default('not_evaluated')->after('dependency_status');
            $table->string('security_status', 30)->default('not_assessed')->after('compatibility_status');
            $table->string('compliance_status', 30)->default('not_assessed')->after('security_status');
            $table->string('risk_level', 20)->default('unknown')->after('compliance_status');
            $table->string('primary_owner', 160)->nullable()->after('risk_level');
            $table->string('technical_owner', 160)->nullable()->after('primary_owner');
            $table->unsignedInteger('countries_enabled')->default(0)->after('technical_owner');
            $table->unsignedBigInteger('active_users')->default(0)->after('countries_enabled');
            $table->unsignedBigInteger('monthly_transactions')->default(0)->after('active_users');
            $table->decimal('adoption_rate', 5, 2)->nullable()->after('monthly_transactions');
            $table->decimal('availability_percent', 5, 2)->nullable()->after('adoption_rate');
            $table->decimal('error_rate_percent', 6, 3)->nullable()->after('availability_percent');
            $table->unsignedTinyInteger('health_score')->nullable()->after('error_rate_percent');
            $table->timestamp('last_release_at')->nullable()->after('last_health_check_at');
            $table->timestamp('next_release_at')->nullable()->after('last_release_at');
            $table->index(['lifecycle', 'environment'], 'ecosystem_modules_lifecycle_environment_index');
            $table->index(['risk_level', 'compliance_status'], 'ecosystem_modules_risk_compliance_index');
        });

        Schema::create('ecosystem_module_dependencies', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete();
            $table->foreignId('dependency_module_id')->constrained('ecosystem_modules')->cascadeOnDelete();
            $table->string('dependency_type', 30)->default('runtime');
            $table->string('required_version', 80)->nullable();
            $table->boolean('is_required')->default(true);
            $table->string('status', 30)->default('not_validated');
            $table->timestamp('last_validated_at')->nullable();
            $table->timestamps();
            $table->unique(['ecosystem_module_id', 'dependency_module_id'], 'ecosystem_module_dependency_unique');
            $table->index(['status', 'is_required']);
        });

        Schema::create('ecosystem_module_integrations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete();
            $table->string('name', 160);
            $table->string('provider', 160)->nullable();
            $table->string('category', 80)->nullable();
            $table->string('status', 30)->default('not_configured');
            $table->unsignedInteger('latency_ms')->nullable();
            $table->timestamp('last_checked_at')->nullable();
            $table->timestamps();
            $table->index(['ecosystem_module_id', 'status']);
        });

        Schema::create('ecosystem_module_alerts', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('ecosystem_module_id')->nullable()->constrained()->nullOnDelete();
            $table->string('severity', 20);
            $table->string('type', 60);
            $table->text('message');
            $table->string('status', 30)->default('open');
            $table->string('source', 80)->nullable();
            $table->timestamp('acknowledged_at')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
            $table->index(['status', 'severity', 'created_at']);
        });

        Schema::create('ecosystem_module_risks', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('ecosystem_module_id')->nullable()->constrained()->nullOnDelete();
            $table->string('severity', 20);
            $table->string('type', 60);
            $table->text('description');
            $table->string('status', 30)->default('open');
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
            $table->index(['status', 'severity']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ecosystem_module_risks');
        Schema::dropIfExists('ecosystem_module_alerts');
        Schema::dropIfExists('ecosystem_module_integrations');
        Schema::dropIfExists('ecosystem_module_dependencies');

        Schema::table('ecosystem_modules', function (Blueprint $table): void {
            $table->dropIndex('ecosystem_modules_lifecycle_environment_index');
            $table->dropIndex('ecosystem_modules_risk_compliance_index');
            $table->dropColumn([
                'module_type', 'lifecycle', 'environment', 'region', 'target_version', 'release_status',
                'configuration_status', 'dependency_status', 'compatibility_status', 'security_status',
                'compliance_status', 'risk_level', 'primary_owner', 'technical_owner', 'countries_enabled',
                'active_users', 'monthly_transactions', 'adoption_rate', 'availability_percent',
                'error_rate_percent', 'health_score', 'last_release_at', 'next_release_at',
            ]);
        });
    }
};
