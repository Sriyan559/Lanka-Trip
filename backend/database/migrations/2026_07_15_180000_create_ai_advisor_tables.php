<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_advisor_conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->uuid('guest_session_id')->nullable()->index();
            $table->string('status', 30)->default('active')->index();
            $table->json('profile_context')->nullable();
            $table->timestamps();
        });

        Schema::create('ai_advisor_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained('ai_advisor_conversations')->cascadeOnDelete();
            $table->string('role', 30)->index();
            $table->text('content');
            $table->json('structured_data')->nullable();
            $table->string('provider', 50)->nullable();
            $table->string('model', 100)->nullable();
            $table->json('token_usage')->nullable();
            $table->timestamps();
        });

        Schema::create('ai_advisor_saved_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('conversation_id')->nullable()->constrained('ai_advisor_conversations')->nullOnDelete();
            $table->string('title');
            $table->json('profile_context');
            $table->json('routine_data');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_advisor_saved_plans');
        Schema::dropIfExists('ai_advisor_messages');
        Schema::dropIfExists('ai_advisor_conversations');
    }
};
