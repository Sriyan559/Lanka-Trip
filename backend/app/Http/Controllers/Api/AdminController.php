<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateProductStatusRequest;
use App\Http\Requests\Admin\UpdateUserStatusRequest;
use App\Http\Requests\Admin\VerifySupplierRequest;
use App\Http\Resources\ActivityLogResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\OrderCollection;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Http\Resources\QuotationCollection;
use App\Http\Resources\RFQCollection;
use App\Http\Resources\SupplierResource;
use App\Http\Resources\UserResource;
use App\Jobs\SendNotificationJob;
use App\Models\Message;
use App\Models\Notification;
use App\Models\Order;
use App\Models\Product;
use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Laravel\Horizon\Contracts\MasterSupervisorRepository;
use Spatie\Activitylog\Models\Activity;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AdminController extends Controller
{
    public function dashboard(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        return $this->successResponse([
            'users_count' => User::count(),
            'buyers_count' => User::where('role', 'buyer')->count(),
            'suppliers_count' => Supplier::count(),
            'products_count' => Product::count(),
            'active_products_count' => Product::active()->count(),
            'rfqs_count' => RFQ::count(),
            'open_rfqs_count' => RFQ::where('status', 'open')->count(),
            'quotations_count' => Quotation::count(),
            'orders_count' => Order::count(),
            'pending_orders_count' => Order::where('status', 'pending')->count(),
            'messages_count' => Message::count(),
            'unread_notifications_count' => Notification::unread()->count(),
        ]);
    }

    public function users(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $query = User::query()->latest();

        $this->applyUserFilters($query, $request);

        return $this->paginatedResourceResponse(
            $query->paginate(20)->withQueryString(),
            UserResource::class,
            $request,
        );
    }

    public function user(Request $request, int $id): JsonResponse
    {
        $this->ensureAdmin($request);

        $user = User::query()->with('supplier')->findOrFail($id);
        $data = UserResource::make($user)->resolve($request);

        if ($user->supplier) {
            $data['supplier'] = SupplierResource::make($user->supplier)->resolve($request);
        }

        return $this->successResponse(['user' => $data]);
    }

    public function updateUserStatus(UpdateUserStatusRequest $request, int $id): JsonResponse
    {
        $user = User::query()->findOrFail($id);
        $user->update(['status' => $request->validated('status')]);

        return $this->successResponse([
            'user' => UserResource::make($user->refresh())->resolve($request),
        ], 'User status updated successfully.');
    }

    public function suppliers(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $query = Supplier::query()
            ->with('user')
            ->withCount('products')
            ->latest();

        $this->applySupplierFilters($query, $request);

        return $this->paginatedResourceResponse(
            $query->paginate(20)->withQueryString(),
            SupplierResource::class,
            $request,
        );
    }

    public function supplier(Request $request, int $id): JsonResponse
    {
        $this->ensureAdmin($request);

        $supplier = Supplier::query()
            ->withCount('products')
            ->with([
                'user',
                'products' => fn ($query) => $query
                    ->with(['category', 'images', 'supplier'])
                    ->latest()
                    ->limit(20),
            ])
            ->findOrFail($id);

        return $this->successResponse([
            'supplier' => SupplierResource::make($supplier)->resolve($request),
        ]);
    }

    public function verifySupplier(VerifySupplierRequest $request, int $id): JsonResponse
    {
        $supplier = Supplier::query()->with('user')->findOrFail($id);
        Gate::authorize('verify', $supplier);
        $oldStatus = $supplier->verification_status;
        $newStatus = $request->validated('verification_status');

        $supplier->update(['verification_status' => $newStatus]);

        if ($newStatus === 'verified' && $oldStatus !== 'verified') {
            if ($supplier->user_id) {
                SendNotificationJob::dispatch(
                    $supplier->user_id,
                    'supplier_verified',
                    'Supplier verified',
                    "Your supplier profile {$supplier->company_name} has been verified.",
                    'supplier',
                    $supplier->id,
                )->afterCommit();
            }
        }

        activity('suppliers')
            ->causedBy($request->user())
            ->performedOn($supplier)
            ->event('verification_updated')
            ->withProperties([
                'old_status' => $oldStatus,
                'new_status' => $newStatus,
            ])
            ->log('Supplier verification updated');

        return $this->successResponse([
            'supplier' => SupplierResource::make($supplier->refresh()->load('user'))->resolve($request),
        ], 'Supplier verification updated successfully.');
    }

    public function products(Request $request): ProductCollection
    {
        $this->ensureAdmin($request);

        $query = Product::query()
            ->with(['category', 'images', 'supplier'])
            ->latest();

        $this->applyProductFilters($query, $request);

        return new ProductCollection($query->paginate(20)->withQueryString());
    }

    public function product(Request $request, int $id): JsonResponse
    {
        $this->ensureAdmin($request);

        $product = Product::query()
            ->with(['category', 'images', 'supplier'])
            ->findOrFail($id);

        return $this->successResponse([
            'product' => ProductResource::make($product)->resolve($request),
        ]);
    }

    public function updateProductStatus(UpdateProductStatusRequest $request, int $id): JsonResponse
    {
        $product = Product::query()->findOrFail($id);
        Gate::authorize('update', $product);
        $product->update(['status' => $request->validated('status')]);

        return $this->successResponse([
            'product' => ProductResource::make($product->refresh()->load(['category', 'images', 'supplier']))->resolve($request),
        ], 'Product status updated successfully.');
    }

    public function deleteProduct(Request $request, int $id): JsonResponse
    {
        $this->ensureAdmin($request);

        $product = Product::query()->findOrFail($id);
        Gate::authorize('delete', $product);
        $product->delete();

        return $this->successResponse(message: 'Product deleted successfully.');
    }

    public function rfqs(Request $request): RFQCollection
    {
        $this->ensureAdmin($request);

        $query = RFQ::query()
            ->with(['items', 'user'])
            ->withCount('quotations')
            ->latest();

        $search = trim($request->string('search', $request->string('q')->toString())->toString());

        if ($search !== '') {
            $query->where(function (Builder $query) use ($search): void {
                $query
                    ->where('rfq_number', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('destination_country', 'like', "%{$search}%");
            });
        }

        return new RFQCollection($query->paginate(20)->withQueryString());
    }

    public function quotations(Request $request): QuotationCollection
    {
        $this->ensureAdmin($request);

        $query = Quotation::query()
            ->with(['items', 'rfq.items', 'supplier'])
            ->latest();

        $search = trim($request->string('search', $request->string('q')->toString())->toString());

        if ($search !== '') {
            $query->where(function (Builder $query) use ($search): void {
                $query
                    ->where('quotation_number', 'like', "%{$search}%")
                    ->orWhere('currency', 'like', "%{$search}%")
                    ->orWhereHas('rfq', fn (Builder $query) => $query->where('title', 'like', "%{$search}%"));
            });
        }

        return new QuotationCollection($query->paginate(20)->withQueryString());
    }

    public function orders(Request $request): OrderCollection
    {
        $this->ensureAdmin($request);

        $query = Order::query()
            ->with(['buyer', 'supplier', 'quotation', 'rfq'])
            ->latest();

        $search = trim($request->string('search', $request->string('q')->toString())->toString());

        if ($search !== '') {
            $query->where(function (Builder $query) use ($search): void {
                $query
                    ->where('order_number', 'like', "%{$search}%")
                    ->orWhere('currency', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%");
            });
        }

        return new OrderCollection($query->paginate(20)->withQueryString());
    }

    public function messages(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $query = Message::query()
            ->with(['sender', 'receiver'])
            ->latest();

        $search = trim($request->string('search', $request->string('q')->toString())->toString());

        if ($search !== '') {
            $query->where(function (Builder $query) use ($search): void {
                $query
                    ->where('message', 'like', "%{$search}%")
                    ->orWhereHas('sender', fn (Builder $query) => $query->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('receiver', fn (Builder $query) => $query->where('name', 'like', "%{$search}%"));
            });
        }

        return $this->paginatedResourceResponse(
            $query->paginate(20)->withQueryString(),
            MessageResource::class,
            $request,
        );
    }

    public function horizonStatus(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        try {
            $running = app(MasterSupervisorRepository::class)->all() !== [];
        } catch (Throwable) {
            $running = false;
        }

        return $this->successResponse([
            'status' => $running ? 'running' : 'stopped',
            'queues' => ['default', 'notifications', 'emails'],
        ]);
    }

    public function activityLogs(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $paginator = Activity::query()
            ->with('causer')
            ->latest()
            ->paginate(20)
            ->withQueryString();
        $pagination = $paginator->toArray();
        unset($pagination['data']);

        return $this->successResponse([
            'data' => ActivityLogResource::collection($paginator->getCollection())->resolve($request),
            ...$pagination,
        ]);
    }

    public function system(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        try {
            DB::connection()->getPdo();
            $database = 'connected';
        } catch (Throwable) {
            $database = 'unavailable';
        }

        try {
            Redis::connection()->ping();
            $redis = 'connected';
        } catch (Throwable) {
            $redis = 'unavailable';
        }

        try {
            $horizon = app(MasterSupervisorRepository::class)->all() !== []
                ? 'running'
                : 'stopped';
        } catch (Throwable) {
            $horizon = 'unavailable';
        }

        return $this->successResponse([
            'php_version' => PHP_VERSION,
            'laravel_version' => Application::VERSION,
            'database' => [
                'driver' => config('database.default'),
                'status' => $database,
            ],
            'cache' => config('cache.default'),
            'queue' => config('queue.default'),
            'redis' => $redis,
            'horizon' => $horizon,
        ]);
    }

    public function backups(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        $diskName = config('backup.backup.destination.disks.0', 'local');
        $backupName = config('backup.backup.name', config('app.name'));
        $disk = Storage::disk($diskName);

        $backups = collect($disk->allFiles($backupName))
            ->filter(fn (string $path): bool => str_ends_with($path, '.zip'))
            ->map(fn (string $path): array => [
                'name' => basename($path),
                'path' => $path,
                'disk' => $diskName,
                'size' => $disk->size($path),
                'last_modified' => date(DATE_ATOM, $disk->lastModified($path)),
            ])
            ->sortByDesc('last_modified')
            ->values()
            ->all();

        return $this->successResponse([
            'backups' => $backups,
            'total' => count($backups),
        ]);
    }

    public function enableMaintenance(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        Artisan::call('down', ['--retry' => 60]);

        return $this->successResponse(
            ['maintenance' => true],
            'Maintenance mode enabled.',
        );
    }

    public function disableMaintenance(Request $request): JsonResponse
    {
        $this->ensureAdmin($request);

        Artisan::call('up');
        Cache::flush();

        return $this->successResponse(
            ['maintenance' => false],
            'Maintenance mode disabled.',
        );
    }

    private function ensureAdmin(Request $request): void
    {
        abort_unless($request->user()?->isAdministrator(), Response::HTTP_FORBIDDEN);
    }

    private function applyUserFilters(Builder $query, Request $request): void
    {
        $search = trim($request->string('search', $request->string('q')->toString())->toString());

        if ($search !== '') {
            $query->where(function (Builder $query) use ($search): void {
                $query
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('company_name', 'like', "%{$search}%");
            });
        }

        foreach (['role', 'status'] as $filter) {
            $value = trim($request->string($filter)->toString());

            if ($value !== '') {
                $query->where($filter, $value);
            }
        }
    }

    private function applySupplierFilters(Builder $query, Request $request): void
    {
        $search = trim($request->string('search', $request->string('q')->toString())->toString());

        if ($search !== '') {
            $query->where(function (Builder $query) use ($search): void {
                $query
                    ->where('company_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('business_type', 'like', "%{$search}%")
                    ->orWhere('country', 'like', "%{$search}%");
            });
        }

        foreach (['verification_status', 'status'] as $filter) {
            $value = trim($request->string($filter)->toString());

            if ($value !== '') {
                $query->where($filter, $value);
            }
        }
    }

    private function applyProductFilters(Builder $query, Request $request): void
    {
        $search = trim($request->string('search', $request->string('q')->toString())->toString());

        if ($search !== '') {
            $query->where(function (Builder $query) use ($search): void {
                $query
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('short_description', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $status = trim($request->string('status')->toString());

        if ($status !== '') {
            $query->where('status', $status);
        }

        $category = trim($request->string('category')->toString());

        if ($category !== '') {
            $query->whereHas('category', fn (Builder $query) => $query
                ->where('slug', $category)
                ->orWhere('id', $category));
        }
    }

    private function paginatedResourceResponse($paginator, string $resourceClass, Request $request): JsonResponse
    {
        $pagination = $paginator->toArray();
        unset($pagination['data']);

        return $this->successResponse([
            'data' => $resourceClass::collection($paginator->getCollection())->resolve($request),
            ...$pagination,
        ]);
    }
}
