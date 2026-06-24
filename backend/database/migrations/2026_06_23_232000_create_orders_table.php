<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('buyer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('supplier_id')->constrained()->cascadeOnDelete();
            $table->foreignId('quotation_id')->unique()->constrained()->cascadeOnDelete();
            $table->foreignId('rfq_id')->constrained('rfqs')->cascadeOnDelete();
            $table->decimal('total_amount', 14, 2)->default(0);
            $table->string('currency', 3);
            $table->string('payment_terms')->nullable();
            $table->string('shipping_terms')->nullable();
            $table->enum('status', [
                'pending',
                'confirmed',
                'production',
                'shipped',
                'completed',
                'cancelled',
            ])->default('pending')->index();
            $table->timestamps();

            $table->index(['buyer_id', 'status']);
            $table->index(['supplier_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
