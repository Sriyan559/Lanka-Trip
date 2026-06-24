<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trending_keywords', function (Blueprint $table) {
            $table->id();
            $table->string('keyword')->unique();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->enum('status', ['active', 'inactive'])->default('active')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trending_keywords');
    }
};
