<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('logistics_facilities', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('reference')->unique();
            $table->string('name');
            $table->string('type', 40)->index();
            $table->string('status', 30)->default('active')->index();
            $table->string('capacity_status', 30)->nullable()->index();
            $table->string('region')->nullable()->index();
            $table->string('city')->nullable()->index();
            $table->decimal('total_capacity', 14, 2)->nullable();
            $table->decimal('capacity_used', 14, 2)->nullable();
            $table->json('capabilities')->nullable();
            $table->json('metadata')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['region', 'type', 'status']);
        });
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('logistics_facility_id')->nullable()->after('shipment_method_id')->constrained('logistics_facilities')->nullOnDelete();
            $table->index(['logistics_facility_id', 'fulfillment_status'], 'orders_facility_fulfilment_index');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex('orders_facility_fulfilment_index');
            $table->dropConstrainedForeignId('logistics_facility_id');
        });
        Schema::dropIfExists('logistics_facilities');
    }
};
