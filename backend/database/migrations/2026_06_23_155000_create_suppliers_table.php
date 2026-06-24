<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('company_name');
            $table->string('slug')->unique();
            $table->string('logo')->nullable();
            $table->string('cover_image')->nullable();
            $table->longText('description')->nullable();
            $table->string('country', 100);
            $table->string('city', 100)->nullable();
            $table->text('address')->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('email');
            $table->string('website')->nullable();
            $table->string('business_type')->nullable();
            $table->enum('verification_status', ['pending', 'verified', 'rejected'])
                ->default('pending')
                ->index();
            $table->boolean('is_featured')->default(false)->index();
            $table->decimal('rating', 3, 2)->default(0);
            $table->enum('status', ['active', 'inactive'])->default('active')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
