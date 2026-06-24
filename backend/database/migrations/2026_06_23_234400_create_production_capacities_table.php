<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('production_capacities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('monthly_output')->nullable();
            $table->string('output_unit')->nullable();
            $table->unsignedInteger('production_lines')->nullable();
            $table->string('lead_time')->nullable();
            $table->string('factory_size')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('production_capacities');
    }
};
