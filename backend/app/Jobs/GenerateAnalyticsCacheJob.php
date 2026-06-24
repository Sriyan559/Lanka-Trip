<?php

namespace App\Jobs;

use App\Models\Category;
use App\Models\Message;
use App\Models\Notification;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\Supplier;
use App\Models\SupplierReview;
use App\Models\User;
use App\Support\CacheKeys;
use Carbon\CarbonImmutable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Cache;

class GenerateAnalyticsCacheJob implements ShouldQueue
{
    use Queueable;

    public function __construct()
    {
        $this->onQueue('default');
    }

    public function handle(): void
    {
        foreach (CacheKeys::ANALYTICS as $key) {
            Cache::forget($key);
        }

        Cache::put('analytics.dashboard', [
            'total_users' => User::count(),
            'total_buyers' => User::where('role', 'buyer')->count(),
            'total_suppliers' => Supplier::count(),
            'total_products' => Product::count(),
            'total_rfqs' => RFQ::count(),
            'total_quotations' => Quotation::count(),
            'total_orders' => Order::count(),
            'completed_orders' => Order::where('status', 'completed')->count(),
            'cancelled_orders' => Order::where('status', 'cancelled')->count(),
            'total_messages' => Message::count(),
            'total_reviews' => ProductReview::count() + SupplierReview::count(),
            'total_notifications' => Notification::count(),
        ], CacheKeys::TTL_SECONDS);

        Cache::put('analytics.top-products', Product::query()
            ->with('category:id,name')
            ->orderByDesc('views_count')
            ->orderByDesc('average_rating')
            ->orderByDesc('reviews_count')
            ->limit(10)
            ->get()
            ->map(fn (Product $product): array => [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category ? [
                    'id' => $product->category->id,
                    'name' => $product->category->name,
                ] : null,
                'views_count' => $product->views_count,
                'average_rating' => (float) $product->average_rating,
                'reviews_count' => $product->reviews_count,
            ])->all(), CacheKeys::TTL_SECONDS);

        Cache::put('analytics.top-suppliers', Supplier::query()
            ->withCount('products')
            ->orderByDesc('rating')
            ->orderByDesc('reviews_count')
            ->limit(10)
            ->get()
            ->map(fn (Supplier $supplier): array => [
                'id' => $supplier->id,
                'company_name' => $supplier->company_name,
                'country' => $supplier->country,
                'rating' => (float) $supplier->rating,
                'reviews_count' => $supplier->reviews_count,
                'products_count' => $supplier->products_count,
            ])->all(), CacheKeys::TTL_SECONDS);

        Cache::put('analytics.top-categories', Category::query()
            ->withCount('products')
            ->orderByDesc('products_count')
            ->orderBy('name')
            ->limit(10)
            ->get()
            ->map(fn (Category $category): array => [
                'id' => $category->id,
                'name' => $category->name,
                'products_count' => $category->products_count,
            ])->all(), CacheKeys::TTL_SECONDS);

        Cache::put('analytics.rfqs', [
            'total_rfqs' => RFQ::count(),
            'open_rfqs' => RFQ::where('status', 'open')->count(),
            'completed_rfqs' => RFQ::where('status', 'completed')->count(),
            'monthly_stats' => $this->monthlyStats(RFQ::query()),
        ], CacheKeys::TTL_SECONDS);

        Cache::put('analytics.quotations', [
            'total_quotations' => Quotation::count(),
            'accepted_quotations' => Quotation::where('status', 'accepted')->count(),
            'rejected_quotations' => Quotation::where('status', 'rejected')->count(),
            'monthly_stats' => $this->monthlyStats(Quotation::query()),
        ], CacheKeys::TTL_SECONDS);

        $orderCounts = Order::query()
            ->selectRaw('status, COUNT(*) as aggregate')
            ->groupBy('status')
            ->pluck('aggregate', 'status');
        Cache::put('analytics.orders', [
            'total_orders' => $orderCounts->sum(),
            'pending_orders' => (int) $orderCounts->get('pending', 0),
            'confirmed_orders' => (int) $orderCounts->get('confirmed', 0),
            'production_orders' => (int) $orderCounts->get('production', 0),
            'shipped_orders' => (int) $orderCounts->get('shipped', 0),
            'completed_orders' => (int) $orderCounts->get('completed', 0),
            'cancelled_orders' => (int) $orderCounts->get('cancelled', 0),
            'monthly_stats' => $this->monthlyStats(Order::query()),
        ], CacheKeys::TTL_SECONDS);

        $completedOrders = Order::query()->where('status', 'completed');
        $now = now();
        Cache::put('analytics.revenue', [
            'daily_revenue' => (float) (clone $completedOrders)
                ->whereDate('created_at', $now->toDateString())
                ->sum('total_amount'),
            'monthly_revenue' => (float) (clone $completedOrders)
                ->whereBetween('created_at', [$now->copy()->startOfMonth(), $now->copy()->endOfMonth()])
                ->sum('total_amount'),
            'yearly_revenue' => (float) (clone $completedOrders)
                ->whereBetween('created_at', [$now->copy()->startOfYear(), $now->copy()->endOfYear()])
                ->sum('total_amount'),
            'currency_breakdown' => (clone $completedOrders)
                ->selectRaw('currency, SUM(total_amount) as total')
                ->groupBy('currency')
                ->orderBy('currency')
                ->pluck('total', 'currency')
                ->map(fn (mixed $total): float => (float) $total)
                ->all(),
        ], CacheKeys::TTL_SECONDS);
    }

    private function monthlyStats(Builder $query): array
    {
        $firstMonth = CarbonImmutable::now()->startOfMonth()->subMonths(11);
        $counts = $query
            ->where('created_at', '>=', $firstMonth)
            ->pluck('created_at')
            ->countBy(fn (mixed $createdAt): string => CarbonImmutable::parse($createdAt)->format('Y-m'));

        return collect(range(0, 11))
            ->map(function (int $offset) use ($firstMonth, $counts): array {
                $month = $firstMonth->addMonths($offset)->format('Y-m');

                return [
                    'month' => $month,
                    'count' => (int) $counts->get($month, 0),
                ];
            })
            ->all();
    }
}
