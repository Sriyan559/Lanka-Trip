<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('customer_verifications', function (Blueprint $table) {
            $table->string('verification_type')->nullable()->after('verification_status'); 
            $table->string('verification_level')->nullable()->after('verification_type'); 
            $table->string('phone_status')->nullable()->after('verification_level');
            $table->string('document_status')->nullable()->after('document_url');
            $table->date('document_expiry_date')->nullable()->after('document_status');
            $table->string('authenticity_status')->nullable()->after('document_expiry_date');
            $table->string('address_status')->nullable()->after('authenticity_status');
            $table->integer('evidence_completeness')->default(0)->after('address_status');
            $table->string('duplicate_risk_level')->nullable()->after('evidence_completeness');
            $table->string('current_stage')->nullable()->after('duplicate_risk_level');
            $table->foreignId('reviewer_id')->nullable()->after('current_stage')->constrained('users')->nullOnDelete();
            $table->timestamp('submitted_at')->nullable()->after('reviewer_id');
            $table->timestamp('due_date')->nullable()->after('submitted_at');
            $table->integer('sla_percentage')->nullable()->after('due_date');
        });
    }

    public function down(): void
    {
        Schema::table('customer_verifications', function (Blueprint $table) {
            $table->dropForeign(['reviewer_id']);
            $table->dropColumn([
                'verification_type',
                'verification_level',
                'phone_status',
                'document_status',
                'document_expiry_date',
                'authenticity_status',
                'address_status',
                'evidence_completeness',
                'duplicate_risk_level',
                'current_stage',
                'reviewer_id',
                'submitted_at',
                'due_date',
                'sla_percentage',
            ]);
        });
    }
};
