<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rfqs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('rfq_number')->unique();
            $table->string('title');
            $table->longText('description')->nullable();
            $table->string('destination_country', 100);
            $table->date('expected_delivery_date')->nullable();
            $table->enum('status', ['open', 'closed', 'completed'])
                ->default('open')
                ->index();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rfqs');
    }
};
