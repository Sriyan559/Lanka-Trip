<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('user_security_profiles')) {
            Schema::create('user_security_profiles', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
                $table->string('security_level', 30)->default('standard')->index();
                $table->boolean('password_reset_required')->default(false)->index();
                $table->timestamp('last_security_review_at')->nullable();
                $table->jsonb('risk_factors')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('user_login_attempts')) {
            Schema::create('user_login_attempts', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('email')->nullable()->index();
                $table->string('ip_address', 45)->nullable()->index();
                $table->text('user_agent')->nullable();
                $table->boolean('was_successful')->default(false)->index();
                $table->string('failure_reason')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['user_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('user_password_histories')) {
            Schema::create('user_password_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('password_hash');
                $table->timestamp('changed_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['user_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('user_mfa_methods')) {
            Schema::create('user_mfa_methods', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('method_type', 50)->index();
                $table->string('identifier')->nullable();
                $table->text('secret')->nullable();
                $table->timestamp('verified_at')->nullable();
                $table->timestamp('last_used_at')->nullable();
                $table->string('status', 30)->default('pending')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['user_id', 'status']);
            });
        }

        if (! Schema::hasTable('user_mfa_recovery_codes')) {
            Schema::create('user_mfa_recovery_codes', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_mfa_method_id')->constrained('user_mfa_methods')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('code_hash');
                $table->timestamp('used_at')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();

                $table->index(['user_id', 'status']);
            });
        }

        if (! Schema::hasTable('user_trusted_devices')) {
            Schema::create('user_trusted_devices', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('device_fingerprint')->index();
                $table->string('device_name')->nullable();
                $table->jsonb('device_info')->nullable();
                $table->timestamp('trusted_at')->nullable();
                $table->timestamp('expires_at')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();
                $table->softDeletes();

                $table->unique(['user_id', 'device_fingerprint']);
            });
        }

        if (! Schema::hasTable('user_api_keys')) {
            Schema::create('user_api_keys', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('name');
                $table->string('key_hash')->unique();
                $table->jsonb('abilities')->nullable();
                $table->timestamp('last_used_at')->nullable();
                $table->timestamp('expires_at')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['user_id', 'status']);
            });
        }

        if (! Schema::hasTable('user_access_grants')) {
            Schema::create('user_access_grants', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->foreignId('granted_by')->nullable()->constrained('users')->nullOnDelete();
                $table->nullableMorphs('grantable');
                $table->string('access_type', 80)->index();
                $table->timestamp('granted_at')->nullable();
                $table->timestamp('expires_at')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['user_id', 'status']);
            });
        }

        if (! Schema::hasTable('role_assignment_histories')) {
            Schema::create('role_assignment_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('role_id')->constrained('roles')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('action', 50)->index();
                $table->text('reason')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['role_id', 'created_at']);
                $table->index(['user_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('permission_assignment_histories')) {
            Schema::create('permission_assignment_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('permission_id')->constrained('permissions')->cascadeOnDelete();
                $table->foreignId('role_id')->nullable()->constrained('roles')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
                $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('action', 50)->index();
                $table->text('reason')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['permission_id', 'created_at'], 'permission_assignment_permission_created_index');
                $table->index(['role_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('verification_requests')) {
            Schema::create('verification_requests', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('company_profile_id')->nullable()->constrained('company_profiles')->nullOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('request_type', 80)->index();
                $table->string('verification_status', 30)->default('pending')->index();
                $table->jsonb('verification_payload')->nullable();
                $table->text('review_notes')->nullable();
                $table->timestamp('submitted_at')->nullable();
                $table->timestamp('reviewed_at')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_id', 'verification_status'], 'verification_requests_supplier_status_index');
                $table->index(['company_profile_id', 'verification_status'], 'verification_requests_company_status_index');
                $table->index(['buyer_profile_id', 'verification_status'], 'verification_requests_buyer_status_index');
            });
        }

        if (! Schema::hasTable('verification_request_documents')) {
            Schema::create('verification_request_documents', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('verification_request_id')->constrained('verification_requests')->cascadeOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('document_type', 100)->index();
                $table->string('document_number')->nullable()->index();
                $table->date('issued_at')->nullable();
                $table->date('expires_at')->nullable();
                $table->string('verification_status', 30)->default('pending')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['verification_request_id', 'verification_status'], 'verification_docs_request_status_index');
            });
        }

        if (! Schema::hasTable('supplier_verification_checks')) {
            Schema::create('supplier_verification_checks', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('verification_request_id')->nullable()->constrained('verification_requests')->nullOnDelete();
                $table->foreignId('checked_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('check_type', 100)->index();
                $table->string('verification_status', 30)->default('pending')->index();
                $table->jsonb('verification_payload')->nullable();
                $table->timestamp('checked_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['supplier_id', 'verification_status'], 'supplier_verification_checks_supplier_status_index');
            });
        }

        if (! Schema::hasTable('company_verification_checks')) {
            Schema::create('company_verification_checks', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('company_profile_id')->constrained('company_profiles')->cascadeOnDelete();
                $table->foreignId('verification_request_id')->nullable()->constrained('verification_requests')->nullOnDelete();
                $table->foreignId('checked_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('check_type', 100)->index();
                $table->string('verification_status', 30)->default('pending')->index();
                $table->jsonb('verification_payload')->nullable();
                $table->timestamp('checked_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['company_profile_id', 'verification_status'], 'company_verification_checks_company_status_index');
            });
        }

        if (! Schema::hasTable('kyc_profiles')) {
            Schema::create('kyc_profiles', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('company_profile_id')->nullable()->constrained('company_profiles')->nullOnDelete();
                $table->string('kyc_type', 80)->index();
                $table->string('verification_status', 30)->default('pending')->index();
                $table->decimal('risk_score', 5, 2)->default(0)->index();
                $table->timestamp('verified_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['user_id', 'verification_status']);
                $table->index(['supplier_id', 'verification_status'], 'kyc_profiles_supplier_status_index');
            });
        }

        if (! Schema::hasTable('kyc_documents')) {
            Schema::create('kyc_documents', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('kyc_profile_id')->constrained('kyc_profiles')->cascadeOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('document_type', 100)->index();
                $table->string('document_number')->nullable();
                $table->date('expires_at')->nullable();
                $table->string('verification_status', 30)->default('pending')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['kyc_profile_id', 'verification_status'], 'kyc_documents_profile_status_index');
            });
        }

        if (! Schema::hasTable('compliance_rules')) {
            Schema::create('compliance_rules', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('rule_key')->unique();
                $table->string('name');
                $table->string('rule_type', 100)->index();
                $table->jsonb('rules')->nullable();
                $table->string('severity', 30)->default('medium')->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('compliance_rule_checks')) {
            Schema::create('compliance_rule_checks', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('compliance_rule_id')->constrained('compliance_rules')->cascadeOnDelete();
                $table->nullableMorphs('subject');
                $table->foreignId('checked_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('compliance_status', 30)->default('pending')->index();
                $table->jsonb('compliance_result')->nullable();
                $table->timestamp('checked_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['compliance_rule_id', 'compliance_status'], 'compliance_checks_rule_status_index');
                $table->index(['subject_type', 'subject_id'], 'compliance_checks_subject_index');
            });
        }

        if (! Schema::hasTable('compliance_case_files')) {
            Schema::create('compliance_case_files', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->nullableMorphs('subject');
                $table->foreignId('compliance_rule_id')->nullable()->constrained('compliance_rules')->nullOnDelete();
                $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
                $table->string('case_number')->unique();
                $table->string('case_type', 100)->index();
                $table->string('status', 30)->default('open')->index();
                $table->string('compliance_status', 30)->default('pending')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['subject_type', 'subject_id'], 'compliance_case_files_subject_index');
            });
        }

        if (! Schema::hasTable('compliance_case_notes')) {
            Schema::create('compliance_case_notes', function (Blueprint $table) {
                $table->id();
                $table->foreignId('compliance_case_file_id')->constrained('compliance_case_files')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->text('note');
                $table->boolean('is_internal')->default(true)->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['compliance_case_file_id', 'created_at'], 'compliance_notes_case_created_index');
            });
        }

        if (! Schema::hasTable('risk_profiles')) {
            Schema::create('risk_profiles', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('profile_key')->nullable()->unique();
                $table->nullableMorphs('subject');
                $table->string('risk_level', 30)->default('low')->index();
                $table->decimal('risk_score', 5, 2)->default(0)->index();
                $table->jsonb('risk_factors')->nullable();
                $table->timestamp('assessed_at')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['subject_type', 'subject_id'], 'risk_profiles_subject_index');
            });
        }

        if (! Schema::hasTable('risk_events')) {
            Schema::create('risk_events', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('risk_profile_id')->nullable()->constrained('risk_profiles')->nullOnDelete();
                $table->nullableMorphs('subject');
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('event_type', 100)->index();
                $table->decimal('risk_score_delta', 5, 2)->default(0);
                $table->jsonb('risk_factors')->nullable();
                $table->string('status', 30)->default('open')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['subject_type', 'subject_id'], 'risk_events_subject_index');
                $table->index(['user_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('policy_acceptances')) {
            Schema::create('policy_acceptances', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('policy_type', 80)->index();
                $table->string('policy_version')->index();
                $table->jsonb('policy_snapshot')->nullable();
                $table->timestamp('accepted_at')->nullable();
                $table->string('ip_address', 45)->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['user_id', 'policy_type']);
            });
        }

        if (! Schema::hasTable('data_retention_policies')) {
            Schema::create('data_retention_policies', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('policy_key')->unique();
                $table->string('name');
                $table->string('data_category', 100)->index();
                $table->unsignedInteger('retention_days');
                $table->jsonb('rules')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (! Schema::hasTable('data_deletion_requests')) {
            Schema::create('data_deletion_requests', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('request_number')->unique();
                $table->string('request_type', 100)->index();
                $table->string('status', 30)->default('pending')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamp('requested_at')->nullable();
                $table->timestamp('completed_at')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['user_id', 'status']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('data_deletion_requests');
        Schema::dropIfExists('data_retention_policies');
        Schema::dropIfExists('policy_acceptances');
        Schema::dropIfExists('risk_events');
        Schema::dropIfExists('risk_profiles');
        Schema::dropIfExists('compliance_case_notes');
        Schema::dropIfExists('compliance_case_files');
        Schema::dropIfExists('compliance_rule_checks');
        Schema::dropIfExists('compliance_rules');
        Schema::dropIfExists('kyc_documents');
        Schema::dropIfExists('kyc_profiles');
        Schema::dropIfExists('company_verification_checks');
        Schema::dropIfExists('supplier_verification_checks');
        Schema::dropIfExists('verification_request_documents');
        Schema::dropIfExists('verification_requests');
        Schema::dropIfExists('permission_assignment_histories');
        Schema::dropIfExists('role_assignment_histories');
        Schema::dropIfExists('user_access_grants');
        Schema::dropIfExists('user_api_keys');
        Schema::dropIfExists('user_trusted_devices');
        Schema::dropIfExists('user_mfa_recovery_codes');
        Schema::dropIfExists('user_mfa_methods');
        Schema::dropIfExists('user_password_histories');
        Schema::dropIfExists('user_login_attempts');
        Schema::dropIfExists('user_security_profiles');
    }
};
