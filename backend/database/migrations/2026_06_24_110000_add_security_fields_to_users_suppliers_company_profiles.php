<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('users', 'account_status')) {
                $table->string('account_status', 30)->default('active')->index()->after('status');
            }

            if (! Schema::hasColumn('users', 'security_status')) {
                $table->string('security_status', 30)->default('clear')->index()->after('account_status');
            }

            if (! Schema::hasColumn('users', 'last_login_at')) {
                $table->timestamp('last_login_at')->nullable()->index()->after('security_status');
            }

            if (! Schema::hasColumn('users', 'last_password_change_at')) {
                $table->timestamp('last_password_change_at')->nullable()->after('last_login_at');
            }

            if (! Schema::hasColumn('users', 'failed_login_count')) {
                $table->unsignedInteger('failed_login_count')->default(0)->after('last_password_change_at');
            }

            if (! Schema::hasColumn('users', 'locked_until')) {
                $table->timestamp('locked_until')->nullable()->index()->after('failed_login_count');
            }

            if (! Schema::hasColumn('users', 'mfa_enabled')) {
                $table->boolean('mfa_enabled')->default(false)->index()->after('locked_until');
            }

            if (! Schema::hasColumn('users', 'risk_score')) {
                $table->decimal('risk_score', 5, 2)->default(0)->index()->after('mfa_enabled');
            }

            if (! Schema::hasColumn('users', 'deleted_at')) {
                $table->softDeletes();
            }
        });

        Schema::table('suppliers', function (Blueprint $table) {
            if (! Schema::hasColumn('suppliers', 'compliance_status')) {
                $table->string('compliance_status', 30)->default('pending')->index()->after('verification_status');
            }

            if (! Schema::hasColumn('suppliers', 'risk_score')) {
                $table->decimal('risk_score', 5, 2)->default(0)->index()->after('compliance_status');
            }

            if (! Schema::hasColumn('suppliers', 'verified_at')) {
                $table->timestamp('verified_at')->nullable()->index()->after('risk_score');
            }

            if (! Schema::hasColumn('suppliers', 'suspended_at')) {
                $table->timestamp('suspended_at')->nullable()->index()->after('verified_at');
            }

            if (! Schema::hasColumn('suppliers', 'suspension_reason')) {
                $table->text('suspension_reason')->nullable()->after('suspended_at');
            }

            if (! Schema::hasColumn('suppliers', 'metadata')) {
                $table->jsonb('metadata')->nullable()->after('suspension_reason');
            }

            $table->index(['verification_status', 'compliance_status'], 'suppliers_verification_compliance_index');
        });

        Schema::table('company_profiles', function (Blueprint $table) {
            if (! Schema::hasColumn('company_profiles', 'verification_status')) {
                $table->string('verification_status', 30)->default('pending')->index()->after('status');
            }

            if (! Schema::hasColumn('company_profiles', 'compliance_status')) {
                $table->string('compliance_status', 30)->default('pending')->index()->after('verification_status');
            }

            if (! Schema::hasColumn('company_profiles', 'risk_score')) {
                $table->decimal('risk_score', 5, 2)->default(0)->index()->after('compliance_status');
            }

            if (! Schema::hasColumn('company_profiles', 'verified_at')) {
                $table->timestamp('verified_at')->nullable()->index()->after('risk_score');
            }

            if (! Schema::hasColumn('company_profiles', 'rejected_at')) {
                $table->timestamp('rejected_at')->nullable()->index()->after('verified_at');
            }

            if (! Schema::hasColumn('company_profiles', 'rejection_reason')) {
                $table->text('rejection_reason')->nullable()->after('rejected_at');
            }

            if (! Schema::hasColumn('company_profiles', 'metadata')) {
                $table->jsonb('metadata')->nullable()->after('rejection_reason');
            }

            $table->index(['verification_status', 'compliance_status'], 'company_profiles_verification_compliance_index');
        });
    }

    public function down(): void
    {
        Schema::table('company_profiles', function (Blueprint $table) {
            $table->dropIndex('company_profiles_verification_compliance_index');
            $table->dropColumn([
                'verification_status',
                'compliance_status',
                'risk_score',
                'verified_at',
                'rejected_at',
                'rejection_reason',
                'metadata',
            ]);
        });

        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropIndex('suppliers_verification_compliance_index');
            $table->dropColumn([
                'compliance_status',
                'risk_score',
                'verified_at',
                'suspended_at',
                'suspension_reason',
                'metadata',
            ]);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'uuid',
                'account_status',
                'security_status',
                'last_login_at',
                'last_password_change_at',
                'failed_login_count',
                'locked_until',
                'mfa_enabled',
                'risk_score',
            ]);

            if (Schema::hasColumn('users', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });
    }
};
