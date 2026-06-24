<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->unsignedSmallInteger('established_year')->nullable()->after('business_type');
            $table->unsignedInteger('employee_count')->nullable()->after('established_year');
            $table->string('factory_size')->nullable()->after('employee_count');
            $table->decimal('annual_revenue', 14, 2)->nullable()->after('factory_size');
            $table->decimal('export_percentage', 5, 2)->nullable()->after('annual_revenue');
            $table->json('main_markets')->nullable()->after('export_percentage');
        });
    }

    public function down(): void
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropColumn([
                'established_year',
                'employee_count',
                'factory_size',
                'annual_revenue',
                'export_percentage',
                'main_markets',
            ]);
        });
    }
};
