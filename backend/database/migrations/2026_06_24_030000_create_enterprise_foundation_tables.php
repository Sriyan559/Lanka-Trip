<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name')->unique();
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->string('status', 30)->default('active')->index();
            $table->timestamps();
        });

        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name')->unique();
            $table->string('display_name');
            $table->string('group')->index();
            $table->text('description')->nullable();
            $table->string('status', 30)->default('active')->index();
            $table->timestamps();
        });

        Schema::create('role_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained('roles')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('assigned_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('assigned_at')->nullable();
            $table->string('status', 30)->default('active')->index();
            $table->timestamps();

            $table->unique(['role_id', 'user_id']);
            $table->index(['user_id', 'status']);
        });

        Schema::create('permission_role', function (Blueprint $table) {
            $table->id();
            $table->foreignId('permission_id')->constrained('permissions')->cascadeOnDelete();
            $table->foreignId('role_id')->constrained('roles')->cascadeOnDelete();
            $table->string('status', 30)->default('active')->index();
            $table->timestamps();

            $table->unique(['permission_id', 'role_id']);
            $table->index(['role_id', 'status']);
        });

        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('iso2', 2)->unique();
            $table->string('iso3', 3)->unique();
            $table->string('name')->unique();
            $table->string('phone_code', 20)->nullable();
            $table->string('status', 30)->default('active')->index();
            $table->timestamps();
        });

        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('code', 3)->unique();
            $table->string('name')->unique();
            $table->string('symbol', 12)->nullable();
            $table->unsignedTinyInteger('decimal_places')->default(2);
            $table->string('status', 30)->default('active')->index();
            $table->timestamps();
        });

        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('code', 10)->unique();
            $table->string('name')->unique();
            $table->string('native_name')->nullable();
            $table->string('status', 30)->default('active')->index();
            $table->timestamps();
        });

        Schema::create('buyer_profiles', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
            $table->foreignId('preferred_currency_id')->nullable()->constrained('currencies')->nullOnDelete();
            $table->foreignId('preferred_language_id')->nullable()->constrained('languages')->nullOnDelete();
            $table->string('company_name')->nullable();
            $table->string('job_title')->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('website')->nullable();
            $table->text('address')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('postal_code', 30)->nullable();
            $table->json('sourcing_interests')->nullable();
            $table->string('status', 30)->default('active')->index();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['country_id', 'status']);
        });

        Schema::create('staff_profiles', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->foreignId('manager_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
            $table->string('employee_code')->nullable()->unique();
            $table->string('department')->nullable()->index();
            $table->string('job_title')->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('timezone', 100)->nullable();
            $table->date('joined_at')->nullable();
            $table->string('status', 30)->default('active')->index();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['manager_id', 'status']);
        });

        Schema::create('company_profiles', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('supplier_id')->nullable()->unique()->constrained('suppliers')->cascadeOnDelete();
            $table->foreignId('owner_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
            $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
            $table->foreignId('language_id')->nullable()->constrained('languages')->nullOnDelete();
            $table->string('legal_name');
            $table->string('trading_name')->nullable();
            $table->string('slug')->nullable()->unique();
            $table->string('registration_number')->nullable()->unique();
            $table->string('tax_identifier')->nullable()->unique();
            $table->string('business_type')->nullable()->index();
            $table->string('industry')->nullable()->index();
            $table->string('website')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 50)->nullable();
            $table->text('address_line_1')->nullable();
            $table->text('address_line_2')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('postal_code', 30)->nullable();
            $table->unsignedSmallInteger('established_year')->nullable();
            $table->unsignedInteger('employee_count')->nullable();
            $table->string('status', 30)->default('active')->index();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['country_id', 'status']);
            $table->index(['owner_user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('company_profiles');
        Schema::dropIfExists('staff_profiles');
        Schema::dropIfExists('buyer_profiles');
        Schema::dropIfExists('languages');
        Schema::dropIfExists('currencies');
        Schema::dropIfExists('countries');
        Schema::dropIfExists('permission_role');
        Schema::dropIfExists('role_user');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles');
    }
};
