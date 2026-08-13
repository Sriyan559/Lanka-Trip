<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('marketing_audiences', function (Blueprint $table) {
            $table->id(); $table->uuid('uuid')->unique(); $table->string('code', 40)->unique();
            $table->string('name', 180); $table->string('type', 60)->index(); $table->string('status', 30)->default('draft')->index();
            $table->foreignId('owner_id')->nullable()->constrained('users')->nullOnDelete(); $table->string('business_unit', 80)->nullable()->index();
            $table->json('rules')->nullable(); $table->string('refresh_mode', 30)->default('manual'); $table->timestamp('last_recalculated_at')->nullable();
            $table->unsignedBigInteger('eligible_count')->default(0); $table->unsignedBigInteger('marketable_count')->default(0); $table->unsignedBigInteger('suppressed_count')->default(0);
            $table->unsignedBigInteger('email_count')->default(0); $table->unsignedBigInteger('sms_count')->default(0); $table->unsignedBigInteger('push_count')->default(0);
            $table->decimal('paid_media_match_percentage', 5, 2)->default(0); $table->string('governance_status', 30)->default('clear')->index();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps(); $table->softDeletes(); $table->index(['status', 'type', 'created_at']);
        });
        Schema::create('marketing_audience_memberships', function (Blueprint $table) {
            $table->id(); $table->foreignId('audience_id')->constrained('marketing_audiences')->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained('users')->cascadeOnDelete(); $table->boolean('is_eligible')->default(true); $table->boolean('is_marketable')->default(true);
            $table->string('suppression_reason', 100)->nullable()->index(); $table->timestamp('evaluated_at')->nullable(); $table->timestamps();
            $table->unique(['audience_id', 'customer_id']);
        });
        Schema::create('marketing_journeys', function (Blueprint $table) {
            $table->id(); $table->uuid('uuid')->unique(); $table->string('code', 40)->unique(); $table->string('name', 180);
            $table->string('type', 60)->index(); $table->string('status', 30)->default('draft')->index(); $table->string('approval_status', 30)->default('not_submitted')->index();
            $table->foreignId('owner_id')->nullable()->constrained('users')->nullOnDelete(); $table->foreignId('audience_id')->nullable()->constrained('marketing_audiences')->nullOnDelete();
            $table->foreignId('campaign_id')->nullable()->constrained('marketing_campaigns')->nullOnDelete(); $table->json('trigger_config')->nullable();
            $table->unsignedBigInteger('active_customers')->default(0); $table->unsignedBigInteger('entries')->default(0); $table->unsignedBigInteger('completions')->default(0); $table->unsignedBigInteger('conversions')->default(0);
            $table->decimal('recovered_revenue', 18, 2)->default(0); $table->unsignedInteger('exception_count')->default(0); $table->unsignedTinyInteger('health_score')->default(0);
            $table->timestamp('starts_at')->nullable(); $table->timestamp('last_activity_at')->nullable(); $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps(); $table->softDeletes(); $table->index(['status', 'type', 'created_at']);
        });
        Schema::create('marketing_journey_nodes', function (Blueprint $table) {
            $table->id(); $table->foreignId('journey_id')->constrained('marketing_journeys')->cascadeOnDelete(); $table->string('node_key', 80); $table->string('type', 30); $table->string('title', 180);
            $table->json('config')->nullable(); $table->unsignedInteger('position')->default(0); $table->timestamps(); $table->unique(['journey_id', 'node_key']);
        });
        Schema::create('marketing_journey_edges', function (Blueprint $table) {
            $table->id(); $table->foreignId('journey_id')->constrained('marketing_journeys')->cascadeOnDelete(); $table->foreignId('from_node_id')->constrained('marketing_journey_nodes')->cascadeOnDelete();
            $table->foreignId('to_node_id')->constrained('marketing_journey_nodes')->cascadeOnDelete(); $table->json('condition')->nullable(); $table->timestamps();
        });
        Schema::create('marketing_content', function (Blueprint $table) {
            $table->id(); $table->uuid('uuid')->unique(); $table->string('code', 40)->unique(); $table->string('name', 180); $table->string('type', 60)->index();
            $table->string('status', 30)->default('draft')->index(); $table->string('approval_status', 30)->default('not_submitted')->index(); $table->foreignId('owner_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('brand', 120)->nullable(); $table->string('business_unit', 80)->nullable()->index(); $table->string('primary_market', 80)->nullable(); $table->string('preview_url', 1000)->nullable();
            $table->string('version', 30)->default('v1'); $table->json('metadata')->nullable(); $table->string('rights_state', 30)->default('rights_valid')->index(); $table->date('rights_starts_on')->nullable(); $table->date('rights_expires_on')->nullable()->index();
            $table->unsignedBigInteger('impressions')->default(0); $table->unsignedBigInteger('clicks')->default(0); $table->unsignedBigInteger('conversions')->default(0); $table->decimal('attributed_revenue', 18, 2)->default(0);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps(); $table->softDeletes();
            $table->index(['status', 'type', 'created_at']);
        });
        Schema::create('marketing_content_links', function (Blueprint $table) {
            $table->id(); $table->foreignId('content_id')->constrained('marketing_content')->cascadeOnDelete(); $table->string('linkable_type', 30)->index(); $table->unsignedBigInteger('linkable_id')->index();
            $table->string('role', 60)->nullable(); $table->timestamps(); $table->unique(['content_id', 'linkable_type', 'linkable_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketing_content_links'); Schema::dropIfExists('marketing_content'); Schema::dropIfExists('marketing_journey_edges');
        Schema::dropIfExists('marketing_journey_nodes'); Schema::dropIfExists('marketing_journeys'); Schema::dropIfExists('marketing_audience_memberships'); Schema::dropIfExists('marketing_audiences');
    }
};
