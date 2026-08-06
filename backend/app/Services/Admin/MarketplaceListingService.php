<?php

namespace App\Services\Admin;

use App\Repositories\Admin\MarketplaceListingRepository;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MarketplaceListingService
{
    public function __construct(private readonly MarketplaceListingRepository $listings) {}

    public function index(array $filters, array $permissions): array
    {
        $page = $this->listings->paginate($filters);
        $risks = $this->listings->risks($page->getCollection()->pluck('id'));
        $items = $page->getCollection()->map(fn ($row) => $this->row($row, $risks->get($row->id)))->values()->all();
        $counts = $this->listings->metrics([...$filters, 'search' => null, 'status' => null]);

        return ['items' => $items, 'metrics' => $this->metrics($counts), 'health' => ['availability' => 'unavailable', 'reason' => 'approved_listing_health_formula_not_defined', 'score' => null, 'components' => []], 'alerts' => $this->alerts($counts), 'sla' => ['availability' => 'unavailable', 'reason' => 'listing_sla_policy_not_defined', 'items' => []], 'filters' => ['currency' => $filters['currency'] ?? null], 'permissions' => ['can_create' => false, 'can_update' => (bool) ($permissions['can_update'] ?? false), 'can_export' => (bool) ($permissions['can_export'] ?? false), 'can_bulk_action' => false], 'meta' => $this->meta($page)];
    }

    public function export(array $filters): iterable
    {
        $rows = $this->listings->exportRows($filters);
        $risks = $this->listings->risks($rows->pluck('id'));
        foreach ($rows as $row) {
            yield $this->row($row, $risks->get($row->id));
        }
    }

    public function show(int $id): ?array
    {
        $record = $this->listings->find($id);
        if (! $record) {
            return null;
        } $risk = $this->listings->risks(collect([$id]))->get($id);

        return ['listing' => $this->row($record, $risk), 'health' => ['availability' => 'unavailable', 'reason' => 'approved_listing_health_formula_not_defined'], 'sla' => ['availability' => 'unavailable', 'reason' => 'listing_sla_policy_not_defined']];
    }

    private function row(object $row, ?object $risk): array
    {
        $status = $row->approval_status === 'approved' ? ($row->status === 'active' ? 'live' : 'suspended') : str_replace('_', '-', $row->approval_status);

        return ['id' => (string) $row->id, 'listingCode' => $row->sku ?: 'LST-'.str_pad((string) $row->id, 7, '0', STR_PAD_LEFT), 'name' => $row->name, 'descriptor' => $row->short_description, 'thumbnailUrl' => $row->featured_image, 'seller' => $row->supplier_id ? ['id' => (string) $row->supplier_id, 'name' => $row->supplier_name] : null, 'product' => ['id' => (string) $row->id, 'name' => $row->name], 'brand' => null, 'category' => $row->category_id ? ['id' => (string) $row->category_id, 'name' => $row->category_name] : null, 'businessUnit' => null, 'channel' => null, 'sellingPrice' => ['amount' => (float) $row->price, 'currency' => $row->currency], 'stock' => (int) $row->stock, 'sales30Days' => (float) $row->sales_30_days, 'conversionRate30Days' => null, 'verificationStatus' => null, 'policyStatus' => $row->compliance_status, 'riskLevel' => $risk?->risk_level, 'listingStatus' => $status, 'updatedAt' => Carbon::parse($row->updated_at)->toIso8601String(), 'permissions' => ['view' => true, 'edit' => true, 'suspend' => true]];
    }

    private function metrics(array $c): array
    {
        $labels = ['all' => 'Total Listings', 'live' => 'Live Listings', 'pending-review' => 'Pending Review', 'draft' => 'Draft', 'rejected' => 'Rejected', 'suspended' => 'Suspended', 'out-of-stock' => 'Out of Stock', 'low-stock' => 'Low Stock', 'high-risk' => 'High-Risk Listings'];
        $result = [];
        foreach ($labels as $key => $label) {
            $result[] = ['id' => $key, 'label' => $label, 'availability' => 'available', 'value' => $c[$key]];
        }
        foreach ([['price-exceptions', 'Price Exceptions', 'listing_price_policy_not_defined'], ['policy-violations', 'Policy Violations', 'listing_policy_violation_mapping_not_defined'], ['duplicate-risk', 'Duplicate Risk', 'listing_duplicate_detection_not_defined']] as [$id, $label, $reason]) {
            $result[] = compact('id', 'label', 'reason') + ['availability' => 'unavailable', 'value' => null];
        }

        return $result;
    }

    private function alerts(array $counts): array
    {
        return array_values(array_filter([$counts['high-risk'] ? ['id' => 'high-risk', 'title' => 'High-risk listings', 'detail' => "{$counts['high-risk']} listings require risk review", 'severity' => 'danger', 'href' => '/admin/marketplace/listings?status=high-risk'] : null, $counts['out-of-stock'] ? ['id' => 'out-of-stock', 'title' => 'Out of stock', 'detail' => "{$counts['out-of-stock']} listings have no variant stock", 'severity' => 'warning', 'href' => '/admin/marketplace/listings?status=out-of-stock'] : null]));
    }

    private function meta(LengthAwarePaginator $p): array
    {
        return ['page' => $p->currentPage(), 'perPage' => $p->perPage(), 'total' => $p->total(), 'totalPages' => $p->lastPage(), 'from' => $p->firstItem(), 'to' => $p->lastItem(), 'generatedAt' => now()->toIso8601String(), 'dataAsOf' => now()->toIso8601String(), 'refreshIntervalSeconds' => 30];
    }
}
