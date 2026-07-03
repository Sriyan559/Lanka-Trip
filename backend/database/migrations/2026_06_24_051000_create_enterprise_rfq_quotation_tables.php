<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('rfq_attachments')) {
            Schema::create('rfq_attachments', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('rfq_id')->constrained('rfqs')->cascadeOnDelete();
                $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('title')->nullable();
                $table->string('attachment_type', 80)->nullable()->index();
                $table->string('file_url')->nullable();
                $table->string('file_path')->nullable();
                $table->string('mime_type', 120)->nullable();
                $table->unsignedBigInteger('file_size')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['rfq_id', 'status']);
                $table->index(['rfq_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('rfq_invited_suppliers')) {
            Schema::create('rfq_invited_suppliers', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('rfq_id')->constrained('rfqs')->cascadeOnDelete();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('invited_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamp('invited_at')->nullable();
                $table->timestamp('viewed_at')->nullable();
                $table->timestamp('responded_at')->nullable();
                $table->string('status', 30)->default('invited')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->unique(['rfq_id', 'supplier_id']);
                $table->index(['supplier_id', 'status']);
                $table->index(['rfq_id', 'status']);
            });
        }

        if (! Schema::hasTable('rfq_supplier_matches')) {
            Schema::create('rfq_supplier_matches', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('rfq_id')->constrained('rfqs')->cascadeOnDelete();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->decimal('match_score', 5, 2)->default(0);
                $table->jsonb('match_reasons')->nullable();
                $table->jsonb('comparison_summary')->nullable();
                $table->string('status', 30)->default('matched')->index();
                $table->timestamp('matched_at')->nullable();
                $table->timestamps();

                $table->unique(['rfq_id', 'supplier_id']);
                $table->index(['supplier_id', 'status']);
                $table->index(['rfq_id', 'status']);
            });
        }

        if (! Schema::hasTable('quotation_attachments')) {
            Schema::create('quotation_attachments', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('quotation_id')->constrained('quotations')->cascadeOnDelete();
                $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('title')->nullable();
                $table->string('attachment_type', 80)->nullable()->index();
                $table->string('file_url')->nullable();
                $table->string('file_path')->nullable();
                $table->string('mime_type', 120)->nullable();
                $table->unsignedBigInteger('file_size')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['quotation_id', 'status']);
                $table->index(['quotation_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('quotation_negotiations')) {
            Schema::create('quotation_negotiations', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('quotation_id')->constrained('quotations')->cascadeOnDelete();
                $table->foreignId('rfq_id')->constrained('rfqs')->cascadeOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
                $table->foreignId('opened_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('negotiation_number')->unique();
                $table->string('subject')->nullable();
                $table->decimal('current_offer_amount', 14, 2)->nullable();
                $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
                $table->string('status', 30)->default('open')->index();
                $table->timestamp('opened_at')->nullable();
                $table->timestamp('closed_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['quotation_id', 'status']);
                $table->index(['rfq_id', 'status']);
                $table->index(['supplier_id', 'status']);
                $table->index(['buyer_profile_id', 'status'], 'quotation_negotiations_buyer_status_index');
            });
        }

        if (! Schema::hasTable('quotation_negotiation_messages')) {
            Schema::create('quotation_negotiation_messages', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('quotation_negotiation_id')->constrained('quotation_negotiations')->cascadeOnDelete();
                $table->foreignId('sender_id')->nullable()->constrained('users')->nullOnDelete();
                $table->text('message');
                $table->decimal('offer_amount', 14, 2)->nullable();
                $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
                $table->jsonb('offer_terms')->nullable();
                $table->timestamp('read_at')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['quotation_negotiation_id', 'created_at'], 'quotation_negotiation_messages_negotiation_created_index');
                $table->index(['sender_id', 'status']);
            });
        }

        if (! Schema::hasTable('quotation_negotiation_attachments')) {
            Schema::create('quotation_negotiation_attachments', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('quotation_negotiation_id')->constrained('quotation_negotiations')->cascadeOnDelete();
                $table->foreignId('quotation_negotiation_message_id')
                    ->nullable()
                    ->constrained('quotation_negotiation_messages')
                    ->cascadeOnDelete();
                $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('title')->nullable();
                $table->string('attachment_type', 80)->nullable()->index();
                $table->string('file_url')->nullable();
                $table->string('file_path')->nullable();
                $table->string('mime_type', 120)->nullable();
                $table->unsignedBigInteger('file_size')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['quotation_negotiation_id', 'status'], 'quotation_negotiation_attachments_negotiation_status_index');
                $table->index(['quotation_negotiation_message_id', 'status'], 'quotation_negotiation_attachments_message_status_index');
            });
        }

        if (! Schema::hasTable('rfq_status_histories')) {
            Schema::create('rfq_status_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('rfq_id')->constrained('rfqs')->cascadeOnDelete();
                $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('previous_status', 30)->nullable();
                $table->string('new_status', 30)->index();
                $table->text('notes')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['rfq_id', 'created_at']);
                $table->index(['changed_by', 'created_at']);
            });
        }

        if (! Schema::hasTable('quotation_status_histories')) {
            Schema::create('quotation_status_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('quotation_id')->constrained('quotations')->cascadeOnDelete();
                $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('previous_status', 30)->nullable();
                $table->string('new_status', 30)->index();
                $table->text('notes')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['quotation_id', 'created_at']);
                $table->index(['changed_by', 'created_at']);
            });
        }

        if (! Schema::hasTable('rfq_view_logs')) {
            Schema::create('rfq_view_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('rfq_id')->constrained('rfqs')->cascadeOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->timestamp('viewed_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['rfq_id', 'created_at']);
                $table->index(['supplier_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('rfq_response_summaries')) {
            Schema::create('rfq_response_summaries', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('rfq_id')->unique()->constrained('rfqs')->cascadeOnDelete();
                $table->unsignedInteger('invited_suppliers_count')->default(0);
                $table->unsignedInteger('matched_suppliers_count')->default(0);
                $table->unsignedInteger('viewed_suppliers_count')->default(0);
                $table->unsignedInteger('quotation_count')->default(0);
                $table->decimal('lowest_quote_amount', 14, 2)->nullable();
                $table->decimal('highest_quote_amount', 14, 2)->nullable();
                $table->decimal('average_quote_amount', 14, 2)->nullable();
                $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
                $table->jsonb('comparison_summary')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamp('last_quotation_at')->nullable();
                $table->timestamps();

                $table->index(['rfq_id', 'created_at']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('rfq_response_summaries');
        Schema::dropIfExists('rfq_view_logs');
        Schema::dropIfExists('quotation_status_histories');
        Schema::dropIfExists('rfq_status_histories');
        Schema::dropIfExists('quotation_negotiation_attachments');
        Schema::dropIfExists('quotation_negotiation_messages');
        Schema::dropIfExists('quotation_negotiations');
        Schema::dropIfExists('quotation_attachments');
        Schema::dropIfExists('rfq_supplier_matches');
        Schema::dropIfExists('rfq_invited_suppliers');
        Schema::dropIfExists('rfq_attachments');
    }
};
