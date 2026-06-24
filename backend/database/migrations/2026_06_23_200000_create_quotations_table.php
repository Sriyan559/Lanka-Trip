<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rfq_id')->constrained('rfqs')->cascadeOnDelete();
            $table->foreignId('supplier_id')->constrained()->cascadeOnDelete();
            $table->string('quotation_number')->unique();
            $table->decimal('total_amount', 14, 2)->default(0);
            $table->string('currency', 3);
            $table->string('lead_time')->nullable();
            $table->string('payment_terms')->nullable();
            $table->string('shipping_terms')->nullable();
            $table->text('remarks')->nullable();
            $table->enum('status', ['pending', 'accepted', 'rejected'])
                ->default('pending')
                ->index();
            $table->timestamps();

            $table->unique(['rfq_id', 'supplier_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
