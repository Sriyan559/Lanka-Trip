<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->index('company_name', 'suppliers_company_name_index');
        });

        Schema::table('quotations', function (Blueprint $table) {
            $table->index(['rfq_id', 'status'], 'quotations_rfq_status_index');
        });
    }

    public function down(): void
    {
        Schema::table('quotations', function (Blueprint $table) {
            $table->dropIndex('quotations_rfq_status_index');
        });

        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropIndex('suppliers_company_name_index');
        });
    }
};
