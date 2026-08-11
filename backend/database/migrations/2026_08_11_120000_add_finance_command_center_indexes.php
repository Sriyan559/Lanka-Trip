<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payments', fn (Blueprint $table) => $table->index(['payment_status', 'created_at'], 'payments_finance_status_created_index'));
        Schema::table('payment_refunds', fn (Blueprint $table) => $table->index(['status', 'created_at'], 'refunds_finance_status_created_index'));
        Schema::table('invoices', fn (Blueprint $table) => $table->index(['payment_status', 'created_at'], 'invoices_finance_payment_created_index'));
        Schema::table('supplier_settlements', fn (Blueprint $table) => $table->index(['currency', 'period_end', 'status'], 'settlements_finance_scope_index'));
        Schema::table('payouts', fn (Blueprint $table) => $table->index(['currency', 'period_end', 'status'], 'payouts_finance_scope_index'));
    }

    public function down(): void
    {
        Schema::table('payments', fn (Blueprint $table) => $table->dropIndex('payments_finance_status_created_index'));
        Schema::table('payment_refunds', fn (Blueprint $table) => $table->dropIndex('refunds_finance_status_created_index'));
        Schema::table('invoices', fn (Blueprint $table) => $table->dropIndex('invoices_finance_payment_created_index'));
        Schema::table('supplier_settlements', fn (Blueprint $table) => $table->dropIndex('settlements_finance_scope_index'));
        Schema::table('payouts', fn (Blueprint $table) => $table->dropIndex('payouts_finance_scope_index'));
    }
};
