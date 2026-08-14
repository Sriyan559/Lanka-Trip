<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ecosystem_business_units', function (Blueprint $table) {
            $table->id(); $table->uuid('uuid')->unique();
            $table->foreignId('company_profile_id')->constrained()->cascadeOnDelete();
            $table->string('code', 60); $table->string('name'); $table->string('status', 30)->default('active'); $table->timestamps();
            $table->unique(['company_profile_id', 'code']); $table->index(['company_profile_id', 'status']);
        });
        Schema::create('ecosystem_channels', function (Blueprint $table) {
            $table->id(); $table->uuid('uuid')->unique();
            $table->foreignId('business_unit_id')->constrained('ecosystem_business_units')->cascadeOnDelete();
            $table->string('code', 60); $table->string('name'); $table->string('status', 30)->default('active'); $table->timestamps();
            $table->unique(['business_unit_id', 'code']); $table->index(['business_unit_id', 'status']);
        });
        Schema::create('ecosystem_capabilities', function (Blueprint $table) {
            $table->id(); $table->uuid('uuid')->unique();
            $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete();
            $table->string('capability_key', 100); $table->string('name'); $table->string('category', 80)->nullable();
            $table->string('status', 30)->default('active'); $table->timestamps();
            $table->unique(['ecosystem_module_id', 'capability_key']); $table->index(['category', 'status']);
        });
        Schema::create('ecosystem_module_assignments', function (Blueprint $table) {
            $table->id(); $table->uuid('uuid')->unique();
            $table->foreignId('company_profile_id')->constrained()->cascadeOnDelete();
            $table->foreignId('business_unit_id')->nullable()->constrained('ecosystem_business_units')->cascadeOnDelete();
            $table->foreignId('channel_id')->nullable()->constrained('ecosystem_channels')->cascadeOnDelete();
            $table->foreignId('ecosystem_module_id')->constrained()->cascadeOnDelete();
            $table->string('environment', 30); $table->string('assignment_type', 30)->default('direct');
            $table->string('status', 30)->default('pending'); $table->string('governance_status', 30)->default('not_evaluated');
            $table->string('risk_level', 20)->default('unknown'); $table->boolean('production_eligible')->nullable();
            $table->json('eligibility_reasons')->nullable(); $table->timestamp('effective_at')->nullable(); $table->timestamp('expires_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps(); $table->softDeletes();
            $table->unique(['company_profile_id','business_unit_id','channel_id','ecosystem_module_id','environment'], 'module_assignment_scope_unique');
            $table->index(['company_profile_id','status','environment']); $table->index(['business_unit_id','channel_id']);
        });
        Schema::create('ecosystem_capability_assignments', function (Blueprint $table) {
            $table->id(); $table->uuid('uuid')->unique();
            $table->foreignId('module_assignment_id')->constrained('ecosystem_module_assignments')->cascadeOnDelete();
            $table->foreignId('capability_id')->constrained('ecosystem_capabilities')->cascadeOnDelete();
            $table->string('assignment_type', 30)->default('direct'); $table->string('status', 30)->default('pending');
            $table->string('governance_status', 30)->default('not_evaluated'); $table->string('risk_level', 20)->default('unknown');
            $table->boolean('production_eligible')->nullable(); $table->json('eligibility_reasons')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps(); $table->softDeletes();
            $table->unique(['module_assignment_id','capability_id']); $table->index(['status','governance_status','risk_level']);
        });
        Schema::create('ecosystem_assignment_audits', function (Blueprint $table) {
            $table->id(); $table->string('entity_type', 40); $table->unsignedBigInteger('entity_id'); $table->string('action', 50);
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete(); $table->json('before')->nullable(); $table->json('after')->nullable();
            $table->string('ip_address', 45)->nullable(); $table->timestamp('created_at')->useCurrent();
            $table->index(['entity_type','entity_id','created_at']);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('ecosystem_assignment_audits'); Schema::dropIfExists('ecosystem_capability_assignments');
        Schema::dropIfExists('ecosystem_module_assignments'); Schema::dropIfExists('ecosystem_capabilities');
        Schema::dropIfExists('ecosystem_channels'); Schema::dropIfExists('ecosystem_business_units');
    }
};
