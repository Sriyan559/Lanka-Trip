<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('uploads', function (Blueprint $table) {
            $table->foreignId('product_id')->nullable()->after('user_id')->constrained()->nullOnDelete();
            $table->foreignId('product_variant_id')->nullable()->after('product_id')->constrained()->nullOnDelete();
            $table->string('sha256', 64)->nullable()->after('file_size')->index();
            $table->unsignedInteger('width')->nullable()->after('sha256');
            $table->unsignedInteger('height')->nullable()->after('width');
            $table->text('alt_text')->nullable()->after('height');
            $table->text('description')->nullable()->after('alt_text');
            $table->string('approval_status', 30)->default('draft')->after('description')->index();
            $table->string('processing_status', 30)->default('completed')->after('approval_status')->index();
            $table->date('rights_expires_at')->nullable()->after('processing_status')->index();
            $table->timestamp('archived_at')->nullable()->after('rights_expires_at')->index();
            $table->index(['product_id', 'approval_status']);
            $table->index(['product_variant_id', 'approval_status']);
            $table->index(['file_type', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::table('uploads', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
            $table->dropForeign(['product_variant_id']);
            $table->dropIndex(['product_id', 'approval_status']);
            $table->dropIndex(['product_variant_id', 'approval_status']);
            $table->dropIndex(['file_type', 'created_at']);
            $table->dropIndex(['sha256']);
            $table->dropIndex(['approval_status']);
            $table->dropIndex(['processing_status']);
            $table->dropIndex(['rights_expires_at']);
            $table->dropIndex(['archived_at']);
            $table->dropColumn(['product_id', 'product_variant_id', 'sha256', 'width', 'height', 'alt_text', 'description', 'approval_status', 'processing_status', 'rights_expires_at', 'archived_at']);
        });
    }
};
