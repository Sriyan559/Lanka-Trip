<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('conversation_participants')) {
            Schema::create('conversation_participants', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('conversation_id')->constrained('conversations')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
                $table->foreignId('buyer_profile_id')->nullable()->constrained('buyer_profiles')->nullOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
                $table->string('participant_type', 50)->default('user')->index();
                $table->timestamp('joined_at')->nullable();
                $table->timestamp('last_read_at')->nullable();
                $table->boolean('is_muted')->default(false)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->unique(['conversation_id', 'user_id'], 'conversation_participants_unique_user');
                $table->index(['conversation_id', 'status']);
                $table->index(['user_id', 'status']);
                $table->index(['supplier_id', 'status']);
                $table->index(['buyer_profile_id', 'status'], 'conversation_participants_buyer_status_index');
            });
        }

        if (! Schema::hasTable('message_attachments')) {
            Schema::create('message_attachments', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('message_id')->constrained('messages')->cascadeOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
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

                $table->index(['message_id', 'status']);
            });
        }

        if (! Schema::hasTable('message_read_receipts')) {
            Schema::create('message_read_receipts', function (Blueprint $table) {
                $table->id();
                $table->foreignId('message_id')->constrained('messages')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->timestamp('read_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->unique(['message_id', 'user_id']);
                $table->index(['user_id', 'read_at']);
            });
        }

        if (! Schema::hasTable('message_reactions')) {
            Schema::create('message_reactions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('message_id')->constrained('messages')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('reaction', 50);
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();

                $table->unique(['message_id', 'user_id', 'reaction']);
                $table->index(['message_id', 'status']);
            });
        }

        if (! Schema::hasTable('message_status_histories')) {
            Schema::create('message_status_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('message_id')->constrained('messages')->cascadeOnDelete();
                $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('previous_status', 30)->nullable();
                $table->string('new_status', 30)->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['message_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('notification_channels')) {
            Schema::create('notification_channels', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->string('channel_type', 50)->index();
                $table->text('description')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('notification_templates')) {
            Schema::create('notification_templates', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('name')->unique();
                $table->string('slug')->unique();
                $table->foreignId('notification_channel_id')->nullable()->constrained('notification_channels')->nullOnDelete();
                $table->string('notification_type')->index();
                $table->string('subject')->nullable();
                $table->text('body_template');
                $table->jsonb('variables')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('notification_preferences')) {
            Schema::create('notification_preferences', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->foreignId('notification_channel_id')->nullable()->constrained('notification_channels')->cascadeOnDelete();
                $table->string('notification_type')->index();
                $table->boolean('is_enabled')->default(true)->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->unique(['user_id', 'notification_channel_id', 'notification_type'], 'notification_preferences_unique');
                $table->index(['user_id', 'is_enabled']);
            });
        }

        if (! Schema::hasTable('notification_delivery_logs')) {
            Schema::create('notification_delivery_logs', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('notification_id')->nullable()->constrained('notifications')->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('notification_channel_id')->nullable()->constrained('notification_channels')->nullOnDelete();
                $table->string('channel', 50)->index();
                $table->string('recipient')->nullable();
                $table->string('delivery_status', 30)->default('pending')->index();
                $table->timestamp('sent_at')->nullable();
                $table->timestamp('delivered_at')->nullable();
                $table->timestamp('failed_at')->nullable();
                $table->text('error_message')->nullable();
                $table->jsonb('payload')->nullable();
                $table->jsonb('provider_response')->nullable();
                $table->timestamps();

                $table->index(['notification_id', 'delivery_status'], 'notification_delivery_logs_notification_status_index');
                $table->index(['user_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('push_device_tokens')) {
            Schema::create('push_device_tokens', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('token')->unique();
                $table->string('platform', 50)->index();
                $table->jsonb('device_info')->nullable();
                $table->timestamp('last_used_at')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['user_id', 'status']);
            });
        }

        if (! Schema::hasTable('audit_logs')) {
            Schema::create('audit_logs', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->nullableMorphs('actor');
                $table->nullableMorphs('auditable');
                $table->string('event')->index();
                $table->text('description')->nullable();
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['actor_type', 'actor_id'], 'audit_logs_actor_index');
                $table->index(['auditable_type', 'auditable_id'], 'audit_logs_auditable_index');
                $table->index('created_at', 'audit_logs_created_at_index');
            });
        }

        if (! Schema::hasTable('audit_log_changes')) {
            Schema::create('audit_log_changes', function (Blueprint $table) {
                $table->id();
                $table->foreignId('audit_log_id')->constrained('audit_logs')->cascadeOnDelete();
                $table->string('field_name')->index();
                $table->jsonb('old_value')->nullable();
                $table->jsonb('new_value')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['audit_log_id', 'field_name']);
            });
        }

        if (! Schema::hasTable('system_event_logs')) {
            Schema::create('system_event_logs', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('event_type')->index();
                $table->string('source')->nullable()->index();
                $table->string('severity', 30)->default('info')->index();
                $table->text('message')->nullable();
                $table->jsonb('payload')->nullable();
                $table->timestamps();

                $table->index('created_at', 'system_event_logs_created_at_index');
            });
        }

        if (! Schema::hasTable('user_activity_sessions')) {
            Schema::create('user_activity_sessions', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
                $table->string('session_id')->nullable()->index();
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->timestamp('started_at')->nullable();
                $table->timestamp('last_activity_at')->nullable();
                $table->timestamp('ended_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();

                $table->index(['user_id', 'last_activity_at']);
                $table->index('created_at', 'user_activity_sessions_created_at_index');
            });
        }

        if (! Schema::hasTable('security_event_logs')) {
            Schema::create('security_event_logs', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('event_type')->index();
                $table->string('severity', 30)->default('info')->index();
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->string('status', 30)->default('open')->index();
                $table->jsonb('security_context')->nullable();
                $table->timestamps();

                $table->index(['user_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('moderation_cases')) {
            Schema::create('moderation_cases', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->string('case_number')->unique();
                $table->foreignId('reported_by')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
                $table->nullableMorphs('moderatable');
                $table->string('case_type', 80)->index();
                $table->string('priority', 30)->default('normal')->index();
                $table->string('status', 30)->default('open')->index();
                $table->text('summary')->nullable();
                $table->timestamp('resolved_at')->nullable();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['reported_by', 'status']);
                $table->index(['moderatable_type', 'moderatable_id'], 'moderation_cases_moderatable_index');
                $table->index('created_at', 'moderation_cases_created_at_index');
            });
        }

        if (! Schema::hasTable('moderation_case_messages')) {
            Schema::create('moderation_case_messages', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('moderation_case_id')->constrained('moderation_cases')->cascadeOnDelete();
                $table->foreignId('sender_id')->nullable()->constrained('users')->nullOnDelete();
                $table->text('message');
                $table->boolean('is_internal')->default(false)->index();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['moderation_case_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('moderation_case_attachments')) {
            Schema::create('moderation_case_attachments', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('moderation_case_id')->constrained('moderation_cases')->cascadeOnDelete();
                $table->foreignId('moderation_case_message_id')->nullable()->constrained('moderation_case_messages')->cascadeOnDelete();
                $table->foreignId('upload_id')->nullable()->constrained('uploads')->nullOnDelete();
                $table->string('title')->nullable();
                $table->string('file_url')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['moderation_case_id', 'status']);
            });
        }

        if (! Schema::hasTable('communication_blocklists')) {
            Schema::create('communication_blocklists', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->foreignId('blocked_user_id')->nullable()->constrained('users')->cascadeOnDelete();
                $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->cascadeOnDelete();
                $table->text('reason')->nullable();
                $table->string('status', 30)->default('active')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['user_id', 'status']);
                $table->index(['supplier_id', 'status']);
            });
        }

        if (! Schema::hasTable('communication_reports')) {
            Schema::create('communication_reports', function (Blueprint $table) {
                $table->id();
                $table->uuid('uuid')->unique();
                $table->foreignId('reporter_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('reported_user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('conversation_id')->nullable()->constrained('conversations')->nullOnDelete();
                $table->foreignId('message_id')->nullable()->constrained('messages')->nullOnDelete();
                $table->foreignId('moderation_case_id')->nullable()->constrained('moderation_cases')->nullOnDelete();
                $table->string('report_type', 80)->index();
                $table->text('description')->nullable();
                $table->string('status', 30)->default('open')->index();
                $table->jsonb('metadata')->nullable();
                $table->timestamps();
                $table->softDeletes();

                $table->index(['conversation_id', 'status']);
                $table->index(['message_id', 'status']);
                $table->index(['reporter_id', 'status']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('communication_reports');
        Schema::dropIfExists('communication_blocklists');
        Schema::dropIfExists('moderation_case_attachments');
        Schema::dropIfExists('moderation_case_messages');
        Schema::dropIfExists('moderation_cases');
        Schema::dropIfExists('security_event_logs');
        Schema::dropIfExists('user_activity_sessions');
        Schema::dropIfExists('system_event_logs');
        Schema::dropIfExists('audit_log_changes');
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('push_device_tokens');
        Schema::dropIfExists('notification_delivery_logs');
        Schema::dropIfExists('notification_preferences');
        Schema::dropIfExists('notification_templates');
        Schema::dropIfExists('notification_channels');
        Schema::dropIfExists('message_status_histories');
        Schema::dropIfExists('message_reactions');
        Schema::dropIfExists('message_read_receipts');
        Schema::dropIfExists('message_attachments');
        Schema::dropIfExists('conversation_participants');
    }
};
