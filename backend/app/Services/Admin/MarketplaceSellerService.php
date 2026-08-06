<?php

namespace App\Services\Admin;

use App\Repositories\Admin\MarketplaceSellerRepository;
use Carbon\CarbonImmutable;

class MarketplaceSellerService
{
    public function __construct(private readonly MarketplaceSellerRepository $sellers) {}

    public function index(array $filters, array $permissions): array
    {
        [$from, $to] = $this->dates($filters);
        $currencies = $this->sellers->currencies($from, $to);
        $currency = $filters['currency'] ?? ($currencies->count() === 1 ? $currencies->first() : null);
        $page = $this->sellers->paginate($filters, $from, $to, $currency);
        $counts = $this->sellers->counts($from, $to);
        $aggregate = $this->sellers->aggregate($from, $to, $currency);

        return [
            'source' => 'database',
            'generatedAt' => now()->toIso8601String(),
            'context' => ['currency' => $currency, 'currencies' => $currencies->all(), 'dateFrom' => $from->toDateString(), 'dateTo' => $to->toDateString()],
            'permissions' => $permissions,
            'metrics' => [
                $this->metric('active', 'Active Marketplace Sellers', $counts['active'], 'suppliers.status=active, verification_status=verified, suspended_at is null'),
                $this->metric('new', 'New Sellers', $counts['new'], 'suppliers.created_at in selected date range'),
                $this->metric('under-review', 'Sellers Under Review', $counts['under_review'], 'suppliers.verification_status=pending'),
                $this->metric('suspended', 'Suspended Sellers', $counts['suspended'], 'suppliers.suspended_at is not null'),
                $this->moneyMetric('gmv', 'Total Seller GMV', $aggregate['gmv'], $currency),
                $this->moneyMetric('average-gmv', 'Average Seller GMV', $aggregate['average_seller_gmv'], $currency),
                $this->metric('fulfilment', 'Fulfilment Rate', $aggregate['fulfilment_rate'], 'completed orders / all orders in selected period', '%'),
                $this->metric('cancellation', 'Cancellation Rate', $aggregate['cancellation_rate'], 'cancelled orders / all orders in selected period', '%'),
                $this->metric('returns', 'Return Case Rate', $aggregate['return_rate'], 'return cases / orders in selected period', '%'),
                $this->metric('rating', 'Average Customer Rating', $aggregate['average_rating'], 'average suppliers.rating'),
                ['id' => 'sla', 'label' => 'Seller SLA Breaches', 'availability' => 'unavailable', 'reason' => 'No approved seller SLA policy or breach source exists.'],
                $this->metric('high-risk', 'High-Risk Sellers', $counts['high_risk'], 'latest active supplier risk profile is high or critical'),
            ],
            'trend' => $this->sellers->trend($from, $to, $currency),
            'riskDistribution' => $this->distribution($this->sellers->riskDistribution()),
            'items' => collect($page->items())->map(fn ($row) => $this->row($row, $currency))->all(),
            'alerts' => $this->sellers->alerts(),
            'unavailable' => [
                ['id' => 'health-score', 'label' => 'Marketplace Seller Health', 'reason' => 'No approved composite health formula exists.'],
                ['id' => 'scorecard', 'label' => 'Seller Performance Scorecard', 'reason' => 'No approved weighted scorecard formula exists.'],
                ['id' => 'sla-summary', 'label' => 'Marketplace SLA Summary', 'reason' => 'Support SLA data cannot be relabeled as seller operational SLA.'],
                ['id' => 'business-context', 'label' => 'Business Unit and Channel', 'reason' => 'Suppliers are not assigned to business units or marketplace channels in the current schema.'],
            ],
            'meta' => ['page' => $page->currentPage(), 'perPage' => $page->perPage(), 'total' => $page->total(), 'lastPage' => $page->lastPage(), 'refreshIntervalSeconds' => 30],
        ];
    }

    public function show(int $id, array $filters, array $permissions): ?array
    {
        [$from, $to] = $this->dates($filters);
        $currencies = $this->sellers->currencies($from, $to);
        $currency = $filters['currency'] ?? ($currencies->count() === 1 ? $currencies->first() : null);
        $row = $this->sellers->find($id, $from, $to, $currency);
        if (! $row) return null;

        return ['source' => 'database', 'generatedAt' => now()->toIso8601String(), 'context' => ['currency' => $currency, 'currencies' => $currencies->all(), 'dateFrom' => $from->toDateString(), 'dateTo' => $to->toDateString()], 'permissions' => $permissions, 'seller' => $this->row($row, $currency), 'profile' => ['email' => $row->email, 'phone' => $row->phone, 'website' => $row->website, 'country' => $row->country, 'city' => $row->city, 'description' => $row->description, 'complianceStatus' => $row->compliance_status, 'verificationStatus' => $row->verification_status, 'verifiedAt' => $row->verified_at, 'suspendedAt' => $row->suspended_at], 'unavailable' => ['performanceScore' => 'No approved composite performance formula exists.', 'sla' => 'No approved seller SLA source exists.', 'assignedManager' => 'No supplier-manager assignment exists.']];
    }

    public function export(array $filters): array
    {
        [$from, $to] = $this->dates($filters);
        $currencies = $this->sellers->currencies($from, $to);
        $currency = $filters['currency'] ?? ($currencies->count() === 1 ? $currencies->first() : null);
        $items = []; $pageNumber = 1;
        do {
            $page = $this->sellers->paginate([...$filters, 'page' => $pageNumber, 'perPage' => 100], $from, $to, $currency);
            $items = [...$items, ...collect($page->items())->map(fn ($row) => $this->row($row, $currency))->all()];
            $pageNumber++;
        } while ($pageNumber <= $page->lastPage());
        return $items;
    }

    private function dates(array $filters): array
    {
        $to = isset($filters['dateTo']) ? CarbonImmutable::parse($filters['dateTo'])->endOfDay() : CarbonImmutable::now()->endOfDay();
        $from = isset($filters['dateFrom']) ? CarbonImmutable::parse($filters['dateFrom'])->startOfDay() : $to->subDays(29)->startOfDay();
        return [$from, $to];
    }

    private function row(object $row, ?string $currency): array
    {
        $orders = (int) $row->order_count;
        $status = $row->suspended_at ? 'suspended' : ($row->verification_status === 'pending' ? 'under-review' : ($row->status === 'active' && $row->verification_status === 'verified' ? 'active' : 'inactive'));
        return ['id' => (string) $row->id, 'sellerCode' => 'SELL-'.str_pad((string) $row->id, 8, '0', STR_PAD_LEFT), 'name' => $row->company_name, 'businessType' => $row->business_type, 'country' => $row->country, 'activeListings' => (int) $row->listing_count, 'orders' => $orders, 'gmv' => $currency ? ['amount' => round((float) $row->gmv, 2), 'currency' => $currency] : null, 'averageOrderValue' => $currency ? ['amount' => $orders ? round((float) $row->gmv / max(1, $orders - (int) $row->cancelled_count), 2) : 0, 'currency' => $currency] : null, 'fulfilmentRate' => $orders ? round(((int) $row->completed_count / $orders) * 100, 2) : 0, 'cancellationRate' => $orders ? round(((int) $row->cancelled_count / $orders) * 100, 2) : 0, 'returnRate' => $orders ? round(((int) $row->return_count / $orders) * 100, 2) : 0, 'rating' => $row->rating === null ? null : (float) $row->rating, 'reviewCount' => (int) $row->reviews_count, 'verificationStatus' => $row->verification_status, 'complianceStatus' => $row->compliance_status, 'riskLevel' => $row->risk_level, 'riskScore' => $row->profile_risk_score === null ? null : (float) $row->profile_risk_score, 'status' => $status, 'lastActivityAt' => $row->last_order_at ?: (string) $row->updated_at, 'updatedAt' => (string) $row->updated_at];
    }

    private function distribution(array $counts): array
    {
        $total = array_sum($counts);
        return collect(['low', 'medium', 'high', 'critical'])->map(fn ($level) => ['level' => $level, 'value' => $counts[$level] ?? 0, 'percentage' => $total ? round((($counts[$level] ?? 0) / $total) * 100, 2) : 0])->all();
    }

    private function metric(string $id, string $label, int|float $value, string $definition, ?string $unit = null): array
    {
        return ['id' => $id, 'label' => $label, 'availability' => 'available', 'value' => $value, 'unit' => $unit, 'definition' => $definition];
    }

    private function moneyMetric(string $id, string $label, ?float $value, ?string $currency): array
    {
        return $currency ? ['id' => $id, 'label' => $label, 'availability' => 'available', 'value' => $value, 'unit' => $currency, 'definition' => 'Non-cancelled order gross value in the selected currency and period'] : ['id' => $id, 'label' => $label, 'availability' => 'unavailable', 'reason' => 'Select a currency; monetary values are never combined across currencies.'];
    }
}
