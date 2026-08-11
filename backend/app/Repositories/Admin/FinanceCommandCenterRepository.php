<?php

namespace App\Repositories\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Database\Query\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class FinanceCommandCenterRepository
{
    public function capabilities(): array
    {
        return [
            'orders' => Schema::hasTable('orders'), 'payments' => Schema::hasTable('payments'),
            'refunds' => Schema::hasTable('payment_refunds'), 'invoices' => Schema::hasTable('invoices'),
            'settlements' => Schema::hasTable('supplier_settlements'), 'payouts' => Schema::hasTable('payouts'),
            'activity' => Schema::hasTable('activity_log'), 'tenantScope' => false, 'journal' => false,
            'reconciliation' => false, 'financeExceptions' => false,
        ];
    }

    public function currencies(): array
    {
        $codes = Schema::hasTable('currencies') ? DB::table('currencies')->where('status', 'active')->orderBy('code')->pluck('code')->all() : [];
        if (Schema::hasTable('orders')) {
            $codes = array_merge($codes, DB::table('orders')->whereNull('deleted_at')->whereNotNull('currency')->distinct()->pluck('currency')->all());
        }
        return array_values(array_unique(array_filter($codes)));
    }

    public function defaultCurrency(): string
    {
        return in_array('LKR', $this->currencies(), true) ? 'LKR' : ($this->currencies()[0] ?? 'LKR');
    }

    public function sums(CarbonImmutable $from, CarbonImmutable $to, string $currency): array
    {
        $orders = DB::table('orders')->whereNull('deleted_at')->where('currency', $currency)->whereBetween('created_at', [$from, $to])
            ->selectRaw('COALESCE(SUM(total_amount),0) gmv, COALESCE(SUM(subtotal),0) gross_sales, COALESCE(SUM(subtotal-discount_amount),0) net_revenue, COALESCE(SUM(tax_amount),0) tax_collected')->first();
        $payments = DB::table('payments as p')->join('orders as o', 'o.id', '=', 'p.order_id')->whereNull('p.deleted_at')->whereNull('o.deleted_at')->where('o.currency', $currency)->whereBetween('p.created_at', [$from, $to])
            ->selectRaw("COUNT(*) payment_count, SUM(CASE WHEN p.payment_status IN ('paid','captured','completed','success') THEN 1 ELSE 0 END) success_count, COALESCE(SUM(CASE WHEN p.payment_status IN ('paid','captured','completed','success') THEN p.amount ELSE 0 END),0) captured, COALESCE(SUM(CASE WHEN p.payment_status IN ('failed','declined') THEN p.amount ELSE 0 END),0) failed")->first();
        $refunds = DB::table('payment_refunds as r')->join('payments as p', 'p.id', '=', 'r.payment_id')->join('orders as o', 'o.id', '=', 'p.order_id')->whereNull('r.deleted_at')->whereNull('p.deleted_at')->whereNull('o.deleted_at')->where('o.currency', $currency)->whereBetween('r.created_at', [$from, $to])
            ->selectRaw("COUNT(*) refund_count, COALESCE(SUM(CASE WHEN r.status IN ('processed','completed','approved','refunded') THEN r.amount ELSE 0 END),0) amount")->first();
        $invoices = DB::table('invoices as i')->join('orders as o', 'o.id', '=', 'i.order_id')->whereNull('i.deleted_at')->whereNull('o.deleted_at')->where('o.currency', $currency)->whereBetween('i.created_at', [$from, $to])
            ->selectRaw('COUNT(*) invoice_count, COALESCE(SUM(CASE WHEN i.balance_due > 0 THEN i.balance_due ELSE 0 END),0) receivables')->first();
        $settlements = DB::table('supplier_settlements')->whereNull('deleted_at')->where('currency', $currency)->whereBetween('period_end', [$from->toDateString(), $to->toDateString()])
            ->selectRaw("COALESCE(SUM(commission_amount),0) commission, COALESCE(SUM(CASE WHEN status NOT IN ('paid','completed') THEN net_amount ELSE 0 END),0) pending")->first();
        $payouts = DB::table('payouts')->whereNull('deleted_at')->where('currency', $currency)->whereBetween('period_end', [$from->toDateString(), $to->toDateString()])
            ->selectRaw("COALESCE(SUM(CASE WHEN status IN ('paid','completed') THEN net_amount ELSE 0 END),0) released, SUM(CASE WHEN status NOT IN ('paid','completed') THEN 1 ELSE 0 END) pending_count")->first();
        return ['gmv'=>(float)$orders->gmv,'gross_sales'=>(float)$orders->gross_sales,'net_revenue'=>max(0,(float)$orders->net_revenue),'tax_collected'=>(float)$orders->tax_collected,
            'payments_captured'=>(float)$payments->captured,'failed_payments'=>(float)$payments->failed,'refunds'=>(float)$refunds->amount,'receivables'=>(float)$invoices->receivables,
            'payables'=>(float)$settlements->pending,'commission'=>(float)$settlements->commission,'settlements_pending'=>(float)$settlements->pending,'unreconciled'=>0.0,'exceptions_open'=>0,
            'payment_count'=>(int)$payments->payment_count,'payment_success_count'=>(int)$payments->success_count,'refund_count'=>(int)$refunds->refund_count,'invoice_count'=>(int)$invoices->invoice_count,
            'pending_approval_count'=>DB::table('order_approvals')->where('status','pending')->whereBetween('created_at',[$from,$to])->count(),'payouts_released'=>(float)$payouts->released,'payout_pending_count'=>(int)$payouts->pending_count];
    }

    public function daily(CarbonImmutable $from, CarbonImmutable $to, string $currency): array
    {
        $orders = DB::table('orders')->whereNull('deleted_at')->where('currency', $currency)->whereBetween('created_at', [$from, $to])->selectRaw('DATE(created_at) period, SUM(total_amount) gmv, SUM(subtotal - discount_amount) revenue')->groupByRaw('DATE(created_at)')->get()->keyBy('period');
        $payments = DB::table('payments as p')->join('orders as o', 'o.id', '=', 'p.order_id')->whereNull('p.deleted_at')->whereNull('o.deleted_at')->where('o.currency', $currency)->whereBetween('p.created_at', [$from, $to])->selectRaw("DATE(p.created_at) period, SUM(CASE WHEN p.payment_status IN ('paid','captured','completed','success') THEN p.amount ELSE 0 END) collections, SUM(CASE WHEN p.payment_status IN ('failed','declined') THEN p.amount ELSE 0 END) failed")->groupByRaw('DATE(p.created_at)')->get()->keyBy('period');
        $refunds = DB::table('payment_refunds as r')->join('payments as p', 'p.id', '=', 'r.payment_id')->join('orders as o', 'o.id', '=', 'p.order_id')->whereNull('r.deleted_at')->where('o.currency', $currency)->whereBetween('r.created_at', [$from, $to])->selectRaw('DATE(r.created_at) period, SUM(r.amount) refunds')->groupByRaw('DATE(r.created_at)')->get()->keyBy('period');
        $items = [];
        for ($date = $from->startOfDay(); $date->lte($to); $date = $date->addDay()) {
            $key = $date->toDateString(); $o = $orders->get($key); $p = $payments->get($key); $r = $refunds->get($key);
            $items[] = ['period' => $key, 'gmv' => (float) ($o?->gmv ?? 0), 'revenue' => (float) ($o?->revenue ?? 0), 'collections' => (float) ($p?->collections ?? 0), 'failed' => (float) ($p?->failed ?? 0), 'refunds' => (float) ($r?->refunds ?? 0)];
        }
        return $items;
    }

    public function paymentMethods(CarbonImmutable $from, CarbonImmutable $to, string $currency): array
    {
        return DB::table('payments as p')->join('orders as o', 'o.id', '=', 'p.order_id')->leftJoin('payment_methods as pm', 'pm.id', '=', 'p.payment_method_id')->whereNull('p.deleted_at')->whereNull('o.deleted_at')->where('o.currency', $currency)->whereBetween('p.created_at', [$from, $to])->whereIn('p.payment_status', ['paid', 'captured', 'completed', 'success'])->selectRaw("COALESCE(pm.name, 'Other') method, COUNT(*) count, SUM(p.amount) amount")->groupBy('pm.name')->orderByDesc('amount')->get()->map(fn ($row) => ['method' => $row->method, 'count' => (int) $row->count, 'amount' => (float) $row->amount])->all();
    }

    public function paymentStatuses(CarbonImmutable $from, CarbonImmutable $to, string $currency): array
    {
        return DB::table('payments as p')->join('orders as o', 'o.id', '=', 'p.order_id')->whereNull('p.deleted_at')->whereNull('o.deleted_at')->where('o.currency', $currency)->whereBetween('p.created_at', [$from, $to])->selectRaw('p.payment_status status, COUNT(*) count, SUM(p.amount) amount')->groupBy('p.payment_status')->orderByDesc('amount')->get()->map(fn ($row) => ['status' => (string) $row->status, 'count' => (int) $row->count, 'amount' => (float) $row->amount])->all();
    }

    public function operations(array $filters): LengthAwarePaginator
    {
        $union = $this->operationsUnion($filters['from'], $filters['to'], $filters['currency']);
        $query = DB::query()->fromSub($union, 'finance_operations');
        if ($filters['search'] ?? null) { $search = '%'.addcslashes($filters['search'], '%_').'%' ; $query->where(fn ($q) => $q->where('reference', 'like', $search)->orWhere('relatedReference', 'like', $search)->orWhere('party', 'like', $search)); }
        if ($filters['domain'] ?? null) $query->where('domain', $filters['domain']);
        if ($filters['status'] ?? null) $query->where('status', $filters['status']);
        $sorts = ['reference' => 'reference', 'domain' => 'domain', 'grossAmount' => 'grossAmount', 'netAmount' => 'netAmount', 'status' => 'status', 'transactionDate' => 'transactionDate', 'updatedAt' => 'updatedAt'];
        return $query->orderBy($sorts[$filters['sort']], $filters['direction'])->orderBy('recordKey')->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function operation(string $recordKey): ?object
    {
        [$domain, $id] = array_pad(explode(':', $recordKey, 2), 2, null);
        if (!ctype_digit((string) $id)) return null;
        $from = CarbonImmutable::create(1970); $to = CarbonImmutable::create(2100);
        return DB::query()->fromSub($this->operationsUnion($from, $to, null), 'finance_operations')->where('recordKey', $domain.':'.$id)->first();
    }

    private function operationsUnion(CarbonImmutable $from, CarbonImmutable $to, ?string $currency): Builder
    {
        $payment = DB::table('payments as p')->join('orders as o', 'o.id', '=', 'p.order_id')->leftJoin('users as u', 'u.id', '=', 'p.payer_user_id')->whereNull('p.deleted_at')->whereNull('o.deleted_at')->whereBetween('p.created_at', [$from, $to])->when($currency, fn ($q) => $q->where('o.currency', $currency))->selectRaw("CONCAT('payment:', p.id) recordKey, p.payment_number reference, 'payment' domain, 'Payment' type, o.order_number relatedReference, COALESCE(u.name, 'Not available') party, o.currency currency, p.amount grossAmount, o.tax_amount taxAmount, p.fee_amount feeAmount, 0 commissionAmount, 0 refundAmount, (p.amount-p.fee_amount) netAmount, p.payment_status status, o.approval_status approvalStatus, p.created_at transactionDate, p.updated_at updatedAt");
        $refund = DB::table('payment_refunds as r')->join('payments as p', 'p.id', '=', 'r.payment_id')->join('orders as o', 'o.id', '=', 'p.order_id')->leftJoin('users as u', 'u.id', '=', 'p.payer_user_id')->whereNull('r.deleted_at')->whereNull('p.deleted_at')->whereNull('o.deleted_at')->whereBetween('r.created_at', [$from, $to])->when($currency, fn ($q) => $q->where('o.currency', $currency))->selectRaw("CONCAT('refund:', r.id), r.refund_number, 'refund', 'Refund', o.order_number, COALESCE(u.name, 'Not available'), o.currency, r.amount, 0, 0, 0, r.amount, -r.amount, r.status, o.approval_status, r.created_at, r.updated_at");
        $invoice = DB::table('invoices as i')->join('orders as o', 'o.id', '=', 'i.order_id')->leftJoin('suppliers as s', 's.id', '=', 'i.supplier_id')->whereNull('i.deleted_at')->whereNull('o.deleted_at')->whereBetween('i.created_at', [$from, $to])->when($currency, fn ($q) => $q->where('o.currency', $currency))->selectRaw("CONCAT('invoice:', i.id), i.invoice_number, 'invoice', 'Invoice', o.order_number, COALESCE(s.company_name, 'Not available'), o.currency, i.total_amount, i.tax_amount, 0, 0, 0, i.balance_due, i.payment_status, o.approval_status, i.created_at, i.updated_at");
        $settlement = DB::table('supplier_settlements as s')->join('suppliers as v', 'v.id', '=', 's.supplier_id')->whereNull('s.deleted_at')->whereBetween('s.period_end', [$from->toDateString(), $to->toDateString()])->when($currency, fn ($q) => $q->where('s.currency', $currency))->selectRaw("CONCAT('settlement:', s.id), s.settlement_number, 'settlement', 'Supplier Settlement', s.settlement_number, v.company_name, s.currency, s.gross_amount, 0, 0, s.commission_amount, s.refund_adjustment, s.net_amount, s.status, 'Not available', s.period_end, s.updated_at");
        $payout = DB::table('payouts as p')->join('suppliers as s', 's.id', '=', 'p.supplier_id')->whereNull('p.deleted_at')->whereBetween('p.period_end', [$from->toDateString(), $to->toDateString()])->when($currency, fn ($q) => $q->where('p.currency', $currency))->selectRaw("CONCAT('payout:', p.id), p.payout_number, 'payout', 'Supplier Payout', COALESCE(p.payment_reference, p.payout_number), s.company_name, p.currency, p.gross_amount, 0, 0, p.commission_amount, p.refund_adjustment, p.net_amount, p.status, CASE WHEN p.approved_at IS NULL THEN 'pending' ELSE 'approved' END, p.period_end, p.updated_at");
        return $payment->unionAll($refund)->unionAll($invoice)->unionAll($settlement)->unionAll($payout);
    }

    private function sum(Builder $query, string $column): float { return (float) $query->sum($column); }
}
