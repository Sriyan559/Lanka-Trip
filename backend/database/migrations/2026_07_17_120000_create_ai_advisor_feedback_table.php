<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ai_advisor_feedback', function (Blueprint $table) {
            $table->id();
            $table->foreignId('message_id')->constrained('ai_advisor_messages')->cascadeOnDelete();
            $table->foreignId('conversation_id')->constrained('ai_advisor_conversations')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('guest_session_id', 64)->nullable()->index();
            $table->string('feedback_type', 40);
            $table->string('language', 12)->default('en');
            $table->string('intent', 80)->nullable();
            $table->json('source_urls')->nullable();
            $table->string('prompt_version', 30)->nullable();
            $table->string('model_version', 120)->nullable();
            $table->text('comment')->nullable();
            $table->timestamps();
            $table->unique(['message_id', 'user_id', 'guest_session_id'], 'ai_feedback_actor_unique');
        });
    }

    public function down(): void { Schema::dropIfExists('ai_advisor_feedback'); }
};
