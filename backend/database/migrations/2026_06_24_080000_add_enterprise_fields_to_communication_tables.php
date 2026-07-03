<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('conversations', function (Blueprint $table) {
            if (! Schema::hasColumn('conversations', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('conversations', 'conversation_number')) {
                $table->string('conversation_number')->nullable()->unique()->after('uuid');
            }

            if (! Schema::hasColumn('conversations', 'conversation_type')) {
                $table->string('conversation_type', 50)->default('direct')->index()->after('conversation_number');
            }

            if (! Schema::hasColumn('conversations', 'related_type')) {
                $table->string('related_type')->nullable()->after('conversation_type');
            }

            if (! Schema::hasColumn('conversations', 'related_id')) {
                $table->unsignedBigInteger('related_id')->nullable()->after('related_type');
            }

            if (! Schema::hasColumn('conversations', 'buyer_profile_id')) {
                $table->foreignId('buyer_profile_id')
                    ->nullable()
                    ->after('buyer_id')
                    ->constrained('buyer_profiles')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('conversations', 'last_message_id')) {
                $table->foreignId('last_message_id')
                    ->nullable()
                    ->after('quotation_id')
                    ->constrained('messages')
                    ->nullOnDelete();
            }

            if (! Schema::hasColumn('conversations', 'status')) {
                $table->string('status', 30)->default('active')->index()->after('last_message_at');
            }

            if (! Schema::hasColumn('conversations', 'closed_at')) {
                $table->timestamp('closed_at')->nullable()->index()->after('status');
            }

            if (! Schema::hasColumn('conversations', 'deleted_at')) {
                $table->softDeletes();
            }

            $table->index(['buyer_profile_id', 'status'], 'conversations_buyer_profile_status_index');
            $table->index(['supplier_id', 'status'], 'conversations_supplier_status_enterprise_index');
            $table->index(['related_type', 'related_id'], 'conversations_related_index');
            $table->index('created_at', 'conversations_created_at_enterprise_index');
        });

        Schema::table('messages', function (Blueprint $table) {
            if (! Schema::hasColumn('messages', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('messages', 'sender_type')) {
                $table->string('sender_type', 50)->default('user')->index()->after('sender_id');
            }

            if (! Schema::hasColumn('messages', 'message_type')) {
                $table->string('message_type', 50)->default('text')->index()->after('receiver_id');
            }

            if (! Schema::hasColumn('messages', 'body')) {
                $table->text('body')->nullable()->after('message');
            }

            if (! Schema::hasColumn('messages', 'metadata')) {
                $table->jsonb('metadata')->nullable()->after('body');
            }

            if (! Schema::hasColumn('messages', 'read_at')) {
                $table->timestamp('read_at')->nullable()->index()->after('is_read');
            }

            if (! Schema::hasColumn('messages', 'edited_at')) {
                $table->timestamp('edited_at')->nullable()->index()->after('read_at');
            }

            if (! Schema::hasColumn('messages', 'deleted_at')) {
                $table->softDeletes();
            }

            $table->index(['sender_id', 'created_at'], 'messages_sender_created_enterprise_index');
            $table->index(['conversation_id', 'message_type'], 'messages_conversation_type_index');
        });

        Schema::table('notifications', function (Blueprint $table) {
            if (! Schema::hasColumn('notifications', 'uuid')) {
                $table->uuid('uuid')->nullable()->unique()->after('id');
            }

            if (! Schema::hasColumn('notifications', 'notification_type')) {
                $table->string('notification_type')->nullable()->index()->after('type');
            }

            if (! Schema::hasColumn('notifications', 'channel')) {
                $table->string('channel', 50)->default('database')->index()->after('notification_type');
            }

            if (! Schema::hasColumn('notifications', 'body')) {
                $table->text('body')->nullable()->after('message');
            }

            if (! Schema::hasColumn('notifications', 'data')) {
                $table->jsonb('data')->nullable()->after('body');
            }

            if (! Schema::hasColumn('notifications', 'read_at')) {
                $table->timestamp('read_at')->nullable()->index()->after('is_read');
            }

            if (! Schema::hasColumn('notifications', 'sent_at')) {
                $table->timestamp('sent_at')->nullable()->index()->after('read_at');
            }

            if (! Schema::hasColumn('notifications', 'delivery_status')) {
                $table->string('delivery_status', 30)->default('pending')->index()->after('sent_at');
            }

            if (! Schema::hasColumn('notifications', 'status')) {
                $table->string('status', 30)->default('active')->index()->after('delivery_status');
            }

            if (! Schema::hasColumn('notifications', 'deleted_at')) {
                $table->softDeletes();
            }

            $table->index(['user_id', 'status'], 'notifications_user_status_enterprise_index');
            $table->index(['user_id', 'delivery_status'], 'notifications_user_delivery_status_index');
            $table->index('created_at', 'notifications_created_at_enterprise_index');
        });
    }

    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropIndex('notifications_created_at_enterprise_index');
            $table->dropIndex('notifications_user_delivery_status_index');
            $table->dropIndex('notifications_user_status_enterprise_index');

            $table->dropColumn([
                'uuid',
                'notification_type',
                'channel',
                'body',
                'data',
                'read_at',
                'sent_at',
                'delivery_status',
                'status',
            ]);

            if (Schema::hasColumn('notifications', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });

        Schema::table('conversations', function (Blueprint $table) {
            $table->dropIndex('conversations_created_at_enterprise_index');
            $table->dropIndex('conversations_related_index');
            $table->dropIndex('conversations_supplier_status_enterprise_index');
            $table->dropIndex('conversations_buyer_profile_status_index');

            if (Schema::hasColumn('conversations', 'last_message_id')) {
                $table->dropConstrainedForeignId('last_message_id');
            }

            if (Schema::hasColumn('conversations', 'buyer_profile_id')) {
                $table->dropConstrainedForeignId('buyer_profile_id');
            }

            $table->dropColumn([
                'uuid',
                'conversation_number',
                'conversation_type',
                'related_type',
                'related_id',
                'status',
                'closed_at',
            ]);

            if (Schema::hasColumn('conversations', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });

        Schema::table('messages', function (Blueprint $table) {
            $table->dropIndex('messages_conversation_type_index');
            $table->dropIndex('messages_sender_created_enterprise_index');

            $table->dropColumn([
                'uuid',
                'sender_type',
                'message_type',
                'body',
                'metadata',
                'read_at',
                'edited_at',
            ]);

            if (Schema::hasColumn('messages', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });
    }
};
