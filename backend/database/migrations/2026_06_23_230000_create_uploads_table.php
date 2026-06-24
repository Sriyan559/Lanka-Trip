<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('uploads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('original_name');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type', 50);
            $table->string('mime_type');
            $table->unsignedBigInteger('file_size');
            $table->enum('category', [
                'product_image',
                'supplier_logo',
                'supplier_certificate',
                'rfq_attachment',
                'company_video',
                'banner_image',
                'document',
            ])->default('document')->index();
            $table->timestamps();

            $table->index(['user_id', 'file_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('uploads');
    }
};
