<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource;
use App\Http\Resources\RevenueResource;
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
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class AnalyticsController extends Controller
{
    private const CACHE_TTL_SECONDS = 300;

    public function dashboard(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $data = Cache::remember('analytics.dashboard', self::CACHE_TTL_SECONDS, fn (): array => [
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
        ]);

        return $this->successResponse(
            DashboardResource::make($data)->resolve($request),
        );
    }

    public function topProducts(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $products = Cache::remember('analytics.top-products', self::CACHE_TTL_SECONDS, fn (): array => Product::query()
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
            ])
            ->all());

        return $this->successResponse(['products' => $products]);
    }

    public function topSuppliers(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $suppliers = Cache::remember('analytics.top-suppliers', self::CACHE_TTL_SECONDS, fn (): array => Supplier::query()
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
            ])
            ->all());

        return $this->successResponse(['suppliers' => $suppliers]);
    }

    public function topCategories(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $categories = Cache::remember('analytics.top-categories', self::CACHE_TTL_SECONDS, fn (): array => Category::query()
            ->withCount('products')
            ->orderByDesc('products_count')
            ->orderBy('name')
            ->limit(10)
            ->get()
            ->map(fn (Category $category): array => [
                'id' => $category->id,
                'name' => $category->name,
                'products_count' => $category->products_count,
            ])
            ->all());

        return $this->successResponse(['categories' => $categories]);
    }

    public function rfqs(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $data = Cache::remember('analytics.rfqs', self::CACHE_TTL_SECONDS, fn (): array => [
            'total_rfqs' => RFQ::count(),
            'open_rfqs' => RFQ::where('status', 'open')->count(),
            'completed_rfqs' => RFQ::where('status', 'completed')->count(),
            'monthly_stats' => $this->monthlyStats(RFQ::query()),
        ]);

        return $this->successResponse($data);
    }

    public function quotations(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $data = Cache::remember('analytics.quotations', self::CACHE_TTL_SECONDS, fn (): array => [
            'total_quotations' => Quotation::count(),
            'accepted_quotations' => Quotation::where('status', 'accepted')->count(),
            'rejected_quotations' => Quotation::where('status', 'rejected')->count(),
            'monthly_stats' => $this->monthlyStats(Quotation::query()),
        ]);

        return $this->successResponse($data);
    }

    public function orders(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $data = Cache::remember('analytics.orders', self::CACHE_TTL_SECONDS, function (): array {
            $statusCounts = Order::query()
                ->selectRaw('status, COUNT(*) as aggregate')
                ->groupBy('status')
                ->pluck('aggregate', 'status');

            return [
                'total_orders' => $statusCounts->sum(),
                'pending_orders' => (int) $statusCounts->get('pending', 0),
                'confirmed_orders' => (int) $statusCounts->get('confirmed', 0),
                'production_orders' => (int) $statusCounts->get('production', 0),
                'shipped_orders' => (int) $statusCounts->get('shipped', 0),
                'completed_orders' => (int) $statusCounts->get('completed', 0),
                'cancelled_orders' => (int) $statusCounts->get('cancelled', 0),
                'monthly_stats' => $this->monthlyStats(Order::query()),
            ];
        });

        return $this->successResponse($data);
    }

    public function revenue(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $data = Cache::remember('analytics.revenue', self::CACHE_TTL_SECONDS, function (): array {
            $completedOrders = Order::query()->where('status', 'completed');
            $now = now();

            return [
                'daily_revenue' => (float) (clone $completedOrders)
                    ->whereDate('created_at', $now->toDateString())
                    ->sum('total_amount'),
                'monthly_revenue' => (float) (clone $completedOrders)
                    ->whereBetween('created_at', [
                        $now->copy()->startOfMonth(),
                        $now->copy()->endOfMonth(),
                    ])
                    ->sum('total_amount'),
                'yearly_revenue' => (float) (clone $completedOrders)
                    ->whereBetween('created_at', [
                        $now->copy()->startOfYear(),
                        $now->copy()->endOfYear(),
                    ])
                    ->sum('total_amount'),
                'currency_breakdown' => (clone $completedOrders)
                    ->selectRaw('currency, SUM(total_amount) as total')
                    ->groupBy('currency')
                    ->orderBy('currency')
                    ->pluck('total', 'currency')
                    ->map(fn (mixed $total): float => (float) $total)
                    ->all(),
            ];
        });

        return $this->successResponse(
            RevenueResource::make($data)->resolve($request),
        );
    }

    private function ensureAdmin(Request $request): void
    {
        abort_unless($request->user()?->role === 'admin', Response::HTTP_FORBIDDEN);
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
