<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Requests\Order\UpdateOrderStatusRequest;
use App\Http\Resources\OrderCollection;
use App\Http\Resources\OrderResource;
use App\Jobs\SendNotificationJob;
use App\Models\Order;
use App\Models\Quotation;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $quotation = Quotation::query()
            ->with(['items', 'rfq.user', 'supplier.user', 'order'])
            ->findOrFail($request->integer('quotation_id'));

        Gate::authorize('create', [Order::class, $quotation]);

        if ($quotation->status !== 'accepted') {
            return $this->errorResponse(
                'Orders can only be created from accepted quotations.',
                Response::HTTP_CONFLICT,
            );
        }

        if (Order::query()->where('quotation_id', $quotation->id)->exists()) {
            return $this->errorResponse(
                'An order has already been created for this quotation.',
                Response::HTTP_CONFLICT,
            );
        }

        $order = DB::transaction(function () use ($quotation): Order {
            $order = Order::create([
                'order_number' => 'PENDING-'.Str::uuid(),
                'buyer_id' => $quotation->rfq->user_id,
                'supplier_id' => $quotation->supplier_id,
                'quotation_id' => $quotation->id,
                'rfq_id' => $quotation->rfq_id,
                'total_amount' => $quotation->total_amount,
                'currency' => $quotation->currency,
                'payment_terms' => $quotation->payment_terms,
                'shipping_terms' => $quotation->shipping_terms,
                'status' => 'pending',
            ]);

            $order->update([
                'order_number' => sprintf(
                    'ORD-%s-%06d',
                    $order->created_at->format('Y'),
                    $order->id,
                ),
            ]);

            $order->items()->createMany(
                $quotation->items->map(fn ($item): array => [
                    'product_name' => $item->product_name,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'amount' => $item->amount,
                ])->all(),
            );

            return $order;
        });

        Log::channel('orders')->info('Order created', [
            'order_id' => $order->id,
            'order_number' => $order->order_number,
            'buyer_id' => $order->buyer_id,
            'supplier_id' => $order->supplier_id,
        ]);

        return $this->orderResponse(
            $order,
            $request,
            'Order created successfully.',
            Response::HTTP_CREATED,
        );
    }

    public function index(Request $request): OrderCollection
    {
        $query = Order::query()
            ->accessibleTo($request->user())
            ->with(['buyer', 'supplier', 'quotation', 'rfq'])
            ->withCount('items');

        $status = trim($request->string('status')->toString());

        if (in_array($status, Order::STATUSES, true)) {
            $query->where('status', $status);
        }

        return new OrderCollection(
            $query
                ->latest()
                ->paginate(20)
                ->withQueryString(),
        );
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $order = $this->accessibleOrder($request->user(), $id);
        Gate::authorize('view', $order);

        return $this->orderResponse($order, $request);
    }

    public function updateStatus(UpdateOrderStatusRequest $request, int $id): JsonResponse
    {
        $order = $this->accessibleOrder($request->user(), $id);
        Gate::authorize('updateStatus', $order);

        $status = $request->validated('status');

        if (! $order->canTransitionTo($status)) {
            return $this->errorResponse(
                "Order cannot transition from {$order->status} to {$status}.",
                Response::HTTP_CONFLICT,
            );
        }

        DB::transaction(function () use ($order, $status): void {
            $order->update(['status' => $status]);
        });

        SendNotificationJob::dispatch(
            $order->buyer_id,
            'order_status_changed',
            $this->statusNotificationTitle($status),
            $this->statusNotificationMessage($order, $status),
            'order',
            $order->id,
        )->afterCommit();

        activity('orders')
            ->causedBy($request->user())
            ->performedOn($order)
            ->event('status_changed')
            ->withProperties(['status' => $status])
            ->log('Order status changed');

        Log::channel('orders')->info('Order status changed', [
            'order_id' => $order->id,
            'status' => $status,
            'changed_by' => $request->user()->id,
        ]);

        return $this->orderResponse(
            $order->refresh(),
            $request,
            'Order status updated successfully.',
        );
    }

    private function accessibleOrder(User $user, int $id): Order
    {
        return Order::query()
            ->accessibleTo($user)
            ->findOrFail($id);
    }

    private function orderResponse(
        Order $order,
        Request $request,
        ?string $message = null,
        int $status = Response::HTTP_OK,
    ): JsonResponse {
        $order->load([
            'buyer',
            'supplier.user',
            'rfq.items',
            'quotation.items',
            'quotation.supplier',
            'items',
        ]);

        $resource = OrderResource::make($order)->resolve($request);

        return $this->successResponse([
            ...$resource,
            'order' => $resource,
            'buyer' => $resource['buyer'] ?? null,
            'supplier' => $resource['supplier'] ?? null,
            'quotation' => $resource['quotation'] ?? null,
            'items' => $resource['items'] ?? [],
        ], $message, $status);
    }

    private function statusNotificationTitle(string $status): string
    {
        return match ($status) {
            'confirmed' => 'Order confirmed',
            'production' => 'Production started',
            'shipped' => 'Shipment dispatched',
            'completed' => 'Order completed',
            'cancelled' => 'Order cancelled',
            default => 'Order updated',
        };
    }

    private function statusNotificationMessage(Order $order, string $status): string
    {
        return match ($status) {
            'confirmed' => "Supplier confirms order {$order->order_number}.",
            'production' => "Production started for order {$order->order_number}.",
            'shipped' => "Shipment dispatched for order {$order->order_number}.",
            'completed' => "Order {$order->order_number} completed.",
            'cancelled' => "Order {$order->order_number} cancelled.",
            default => "Order {$order->order_number} status changed to {$status}.",
        };
    }
}
