<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('catalogue_data_jobs', function (Blueprint $table): void {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->string('operation_type', 20)->index();
            $table->string('data_type', 50)->index();
            $table->string('status', 30)->default('queued')->index();
            $table->string('validation_status', 30)->default('pending')->index();
            $table->string('approval_status', 30)->default('not_required')->index();
            $table->string('original_name')->nullable();
            $table->string('input_path')->nullable();
            $table->string('output_path')->nullable();
            $table->string('mime_type', 120)->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->char('file_hash', 64)->nullable()->index();
            $table->string('idempotency_key', 120)->unique();
            $table->unsignedBigInteger('total_records')->default(0);
            $table->unsignedBigInteger('processed_records')->default(0);
            $table->unsignedBigInteger('successful_records')->default(0);
            $table->unsignedBigInteger('warning_records')->default(0);
            $table->unsignedBigInteger('failed_records')->default(0);
            $table->unsignedTinyInteger('progress')->default(0);
            $table->string('current_stage', 50)->default('queued');
            $table->text('failure_message')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();
            $table->index(['operation_type', 'status', 'created_at'], 'catalogue_jobs_operation_status_created');
            $table->index(['user_id', 'created_at'], 'catalogue_jobs_user_created');
        });

        Schema::create('catalogue_data_job_errors', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('catalogue_data_job_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('row_number')->nullable();
            $table->string('field', 100)->nullable();
            $table->string('error_code', 80);
            $table->string('severity', 20)->default('error');
            $table->text('message');
            $table->text('reference_value')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->index(['catalogue_data_job_id', 'row_number'], 'catalogue_job_errors_job_row');
        });

        Schema::create('catalogue_export_schedules', function (Blueprint $table): void {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->string('name');
            $table->string('data_type', 50);
            $table->string('frequency', 20);
            $table->string('format', 10)->default('csv');
            $table->string('timezone', 80);
            $table->json('filters')->nullable();
            $table->boolean('enabled')->default(true)->index();
            $table->timestamp('next_run_at')->index();
            $table->timestamp('last_run_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('catalogue_export_schedules');
        Schema::dropIfExists('catalogue_data_job_errors');
        Schema::dropIfExists('catalogue_data_jobs');
    }
};
