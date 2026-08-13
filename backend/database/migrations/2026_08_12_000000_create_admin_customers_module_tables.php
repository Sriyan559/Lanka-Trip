<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Customer Addresses
        if (!Schema::hasTable('customer_addresses')) {
            Schema::create('customer_addresses', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('type', 50)->default('shipping')->index(); // shipping, billing, default
                $table->string('address_line_1');
                $table->string('address_line_2')->nullable();
                $table->string('city');
                $table->string('state')->nullable();
                $table->string('postal_code');
                $table->string('country');
                $table->boolean('is_default_shipping')->default(false);
                $table->boolean('is_default_billing')->default(false);
                $table->timestamps();
            });
        }

        // 2. Customer Segments
        if (!Schema::hasTable('customer_segments')) {
            Schema::create('customer_segments', function (Blueprint $table) {
                $table->id();
                $table->string('name')->unique();
                $table->text('description')->nullable();
                $table->string('criteria')->nullable();
                $table->timestamps();
            });
        }

        // 3. Customer Segment Members
        if (!Schema::hasTable('customer_segment_members')) {
            Schema::create('customer_segment_members', function (Blueprint $table) {
                $table->id();
                $table->foreignId('customer_segment_id')->constrained('customer_segments')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->timestamps();

                $table->unique(['customer_segment_id', 'user_id']);
            });
        }

        // 4. Customer Consents
        if (!Schema::hasTable('customer_consents')) {
            Schema::create('customer_consents', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('consent_type')->index(); // e.g. marketing, data_sharing, terms
                $table->boolean('is_granted')->default(false);
                $table->string('granted_source')->nullable();
                $table->timestamp('granted_at')->nullable();
                $table->timestamp('revoked_at')->nullable();
                $table->timestamps();
                
                $table->unique(['user_id', 'consent_type']);
            });
        }

        // 5. Customer Risks
        if (!Schema::hasTable('customer_risks')) {
            Schema::create('customer_risks', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('risk_level')->default('low')->index(); // low, medium, high
                $table->integer('risk_score')->default(0);
                $table->jsonb('risk_factors')->nullable();
                $table->string('restriction_status')->default('none')->index(); // none, partial, full
                $table->text('restriction_reason')->nullable();
                $table->timestamps();
            });
        }

        // 6. Customer Loyalty Accounts
        if (!Schema::hasTable('customer_loyalty_accounts')) {
            Schema::create('customer_loyalty_accounts', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
                $table->string('tier')->default('bronze')->index(); // bronze, silver, gold, platinum
                $table->integer('points_balance')->default(0);
                $table->integer('lifetime_points')->default(0);
                $table->timestamp('joined_at')->useCurrent();
                $table->timestamps();
            });
        }

        // 7. Customer Loyalty Transactions
        if (!Schema::hasTable('customer_loyalty_transactions')) {
            Schema::create('customer_loyalty_transactions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('customer_loyalty_account_id')->constrained('customer_loyalty_accounts')->cascadeOnDelete();
                $table->string('transaction_type')->index(); // earn, redeem, expire
                $table->integer('points');
                $table->string('description')->nullable();
                $table->nullableMorphs('reference'); // e.g. Order ID
                $table->timestamps();
            });
        }

        // 8. Customer Verifications
        if (!Schema::hasTable('customer_verifications')) {
            Schema::create('customer_verifications', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
                $table->string('verification_status')->default('unverified')->index(); // unverified, pending, verified, rejected
                $table->string('document_type')->nullable();
                $table->string('document_url')->nullable();
                $table->timestamp('verified_at')->nullable();
                $table->text('rejection_reason')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_verifications');
        Schema::dropIfExists('customer_loyalty_transactions');
        Schema::dropIfExists('customer_loyalty_accounts');
        Schema::dropIfExists('customer_risks');
        Schema::dropIfExists('customer_consents');
        Schema::dropIfExists('customer_segment_members');
        Schema::dropIfExists('customer_segments');
        Schema::dropIfExists('customer_addresses');
    }
};
