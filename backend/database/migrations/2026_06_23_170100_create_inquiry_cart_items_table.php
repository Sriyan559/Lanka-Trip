<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inquiry_cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inquiry_cart_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('quantity')->default(1);
            $table->text('note')->nullable();
            $table->timestamps();

            $table->unique(['inquiry_cart_id', 'product_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiry_cart_items');
    }
};
