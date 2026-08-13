<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('delivery_configurations', function (Blueprint $table) {
            $table->id(); $table->uuid('uuid')->unique(); $table->string('reference', 40)->unique();
            $table->string('name', 150); $table->string('rule_type', 40)->index(); $table->string('zone_name', 150);
            $table->string('region', 100)->nullable()->index(); $table->string('province', 100)->nullable();
            $table->string('district', 100)->nullable()->index(); $table->string('city_area', 120)->nullable();
            $table->foreignId('logistics_partner_id')->nullable()->constrained('logistics_partners')->nullOnDelete();
            $table->string('service', 80)->nullable(); $table->string('service_level', 80)->nullable();
            $table->decimal('base_rate', 18, 2)->default(0); $table->decimal('surcharge', 18, 2)->default(0);
            $table->decimal('free_shipping_threshold', 18, 2)->default(0); $table->unsignedInteger('capacity_limit')->default(0);
            $table->unsignedInteger('capacity_used')->default(0); $table->time('cutoff_time')->nullable();
            $table->unsignedSmallInteger('promised_sla_days')->nullable(); $table->boolean('same_day')->default(false);
            $table->boolean('next_day')->default(false); $table->boolean('cod')->default(false); $table->boolean('rto')->default(false);
            $table->string('approval_status', 30)->default('draft')->index(); $table->string('status', 30)->default('draft')->index();
            $table->unsignedInteger('priority')->default(100); $table->date('effective_from')->nullable(); $table->date('effective_to')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps(); $table->softDeletes();
            $table->index(['zone_name','service','logistics_partner_id','status'], 'delivery_configuration_conflict_index');
        });
    }
    public function down(): void { Schema::dropIfExists('delivery_configurations'); }
};
