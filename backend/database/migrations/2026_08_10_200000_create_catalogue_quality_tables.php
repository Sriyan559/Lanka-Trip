<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('catalogue_quality_validation_runs', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('requested_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('scope', 40)->default('catalogue')->index();
            $table->string('status', 30)->default('queued')->index();
            $table->unsignedTinyInteger('progress')->default(0);
            $table->unsignedBigInteger('products_scanned')->default(0);
            $table->unsignedBigInteger('issues_created')->default(0);
            $table->unsignedBigInteger('issues_updated')->default(0);
            $table->unsignedBigInteger('issues_resolved')->default(0);
            $table->text('failure_message')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->index(['status', 'created_at']);
        });

        Schema::create('catalogue_duplicate_candidates', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('fingerprint', 64)->unique();
            $table->foreignId('product_a_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('product_b_id')->constrained('products')->cascadeOnDelete();
            $table->string('signal', 40)->index();
            $table->unsignedTinyInteger('confidence_score');
            $table->string('status', 30)->default('open')->index();
            $table->foreignId('surviving_product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->foreignId('resolved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('resolution_reason')->nullable();
            $table->unsignedInteger('lock_version')->default(0);
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
            $table->index(['status', 'confidence_score']);
            $table->index(['product_a_id', 'product_b_id']);
        });

        Schema::create('catalogue_quality_issues', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('fingerprint', 64)->unique();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->foreignId('duplicate_candidate_id')->nullable()->constrained('catalogue_duplicate_candidates')->nullOnDelete();
            $table->foreignId('validation_run_id')->nullable()->constrained('catalogue_quality_validation_runs')->nullOnDelete();
            $table->string('source', 30)->default('validation')->index();
            $table->string('issue_type', 60)->index();
            $table->string('rule_key', 80)->nullable()->index();
            $table->string('title');
            $table->text('description')->nullable();
            $table->text('evidence')->nullable();
            $table->string('severity', 20)->index();
            $table->string('status', 30)->default('new')->index();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('reviewer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('sla_due_at')->nullable()->index();
            $table->timestamp('resolved_at')->nullable()->index();
            $table->foreignId('resolved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('resolution_reason')->nullable();
            $table->unsignedInteger('lock_version')->default(0);
            $table->timestamp('last_detected_at')->nullable();
            $table->timestamps();
            $table->index(['issue_type', 'status', 'severity']);
            $table->index(['product_id', 'status']);
            $table->index(['assigned_to', 'status']);
        });

        Schema::create('catalogue_quality_issue_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('catalogue_quality_issue_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('note');
            $table->timestamps();
            $table->index(['catalogue_quality_issue_id', 'created_at'], 'quality_issue_notes_issue_created_index');
        });

        Schema::create('admin_catalogue_quality_saved_views', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('name');
            $table->json('filters');
            $table->timestamps();
            $table->unique(['user_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_catalogue_quality_saved_views');
        Schema::dropIfExists('catalogue_quality_issue_notes');
        Schema::dropIfExists('catalogue_quality_issues');
        Schema::dropIfExists('catalogue_duplicate_candidates');
        Schema::dropIfExists('catalogue_quality_validation_runs');
    }
};
