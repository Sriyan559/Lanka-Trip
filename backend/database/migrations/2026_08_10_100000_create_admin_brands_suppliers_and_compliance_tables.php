<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('supplier_contracts')) {
            Schema::create('supplier_contracts', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('contract_number', 60)->unique();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->string('contract_name');
                $table->string('contract_type', 50)->default('master_service')->index();
                $table->string('status', 30)->default('draft')->index();
                $table->date('start_date')->nullable();
                $table->date('end_date')->nullable();
                $table->date('renewal_date')->nullable();
                $table->boolean('auto_renewal')->default(false);
                $table->decimal('value_amount', 18, 2)->nullable();
                $table->string('currency', 3)->default('LKR');
                $table->foreignId('signed_by_supplier_user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('signed_by_admin_user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamp('signed_at')->nullable();
                $table->string('document_path')->nullable();
                $table->jsonb('terms_and_slas')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_id', 'status']);
                $table->index(['status', 'end_date']);
            });
        }

        if (! Schema::hasTable('product_recalls')) {
            Schema::create('product_recalls', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('recall_code', 60)->unique();
                $table->string('title');
                $table->text('reason');
                $table->string('recall_class', 30)->default('class_2')->index();
                $table->string('severity', 30)->default('high')->index();
                $table->string('status', 30)->default('active')->index();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
                $table->foreignId('initiated_by')->nullable()->constrained('users')->nullOnDelete();
                $table->unsignedInteger('quarantined_batches_count')->default(0);
                $table->unsignedInteger('quarantined_units_count')->default(0);
                $table->unsignedInteger('affected_orders_count')->default(0);
                $table->unsignedInteger('affected_customers_count')->default(0);
                $table->timestamp('initiated_at')->nullable();
                $table->timestamp('resolved_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['supplier_id', 'status']);
                $table->index(['product_id', 'status']);
            });
        }

        if (! Schema::hasTable('admin_data_jobs')) {
            Schema::create('admin_data_jobs', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('job_code', 60)->unique();
                $table->string('domain', 50)->index();
                $table->string('job_type', 50)->index();
                $table->string('title');
                $table->string('status', 30)->default('completed')->index();
                $table->unsignedInteger('processed_records')->default(0);
                $table->unsignedInteger('rejected_records')->default(0);
                $table->unsignedInteger('total_records')->default(0);
                $table->foreignId('initiated_by')->nullable()->constrained('users')->nullOnDelete();
                $table->text('error_summary')->nullable();
                $table->jsonb('details')->nullable();
                $table->timestamps();

                $table->index(['domain', 'job_type']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_data_jobs');
        Schema::dropIfExists('product_recalls');
        Schema::dropIfExists('supplier_contracts');
    }
};
