<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderShipment;
use App\Models\OrderStatusHistory;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\PaymentTransaction;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CheckoutController extends Controller
{
    private const CURRENCY = 'LKR';
    private const SHIPPING_AMOUNT = 25000;
    private const PAYMENT_METHODS = [
        'card' => [
            'name' => 'Credit / Debit Card',
            'type' => 'card',
            'description' => 'Demo card payment is confirmed instantly by the platform.',
            'manual' => false,
        ],
        'bank_transfer' => [
            'name' => 'Bank Transfer',
            'type' => 'bank_transfer',
            'description' => 'Order is confirmed after bank payment review.',
            'manual' => true,
        ],
        'cod' => [
            'name' => 'Cash on Delivery',
            'type' => 'cash',
            'description' => 'Pay the courier when the order is delivered.',
            'manual' => true,
        ],
    ];

    public function quote(Request $request): JsonResponse
    {
        $validated = $this->validateCheckoutItem($request);
        $product = $this->findCheckoutProduct($validated);
        $quote = $this->buildQuote($product, (int) $validated['quantity']);

        return response()->json([
            'success' => true,
            'quote' => $quote,
            'payment_methods' => $this->paymentMethodsPayload(),
        ]);
    }

    public function confirm(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => ['nullable', 'integer'],
            'product_slug' => ['nullable', 'string', 'max:180'],
            'product_name' => ['nullable', 'string', 'max:255'],
            'product_image' => ['nullable', 'string', 'max:1000'],
            'category_slug' => ['nullable', 'string', 'max:180'],
            'category_name' => ['nullable', 'string', 'max:180'],
            'unit_price' => ['nullable', 'numeric', 'min:0', 'max:9999999'],
            'unit' => ['nullable', 'string', 'max:50'],
            'quantity' => ['required', 'integer', 'min:1', 'max:999'],
            'payment_method' => ['required', Rule::in(array_keys(self::PAYMENT_METHODS))],
            'customer.fullName' => ['required', 'string', 'max:160'],
            'customer.email' => ['required', 'email', 'max:160'],
            'customer.phone' => ['required', 'string', 'max:60'],
            'delivery.address1' => ['required', 'string', 'max:200'],
            'delivery.address2' => ['nullable', 'string', 'max:200'],
            'delivery.city' => ['required', 'string', 'max:120'],
            'delivery.province' => ['required', 'string', 'max:120'],
            'delivery.postalCode' => ['required', 'string', 'max:30'],
            'delivery.country' => ['required', 'string', 'max:80'],
            'idempotency_key' => ['nullable', 'string', 'max:120'],
        ]);

        $product = $this->findCheckoutProduct($validated);
        $quote = $this->buildQuote($product, (int) $validated['quantity']);
        $method = $this->paymentMethod($validated['payment_method']);

        $order = DB::transaction(function () use ($request, $validated, $product, $quote, $method) {
            $order = Order::create([
                'uuid' => (string) Str::uuid(),
                'order_number' => $this->nextNumber(Order::class, 'order_number', 'SLB'),
                'buyer_id' => $request->user()->id,
                'supplier_id' => $product->supplier_id,
                'quotation_id' => null,
                'rfq_id' => null,
                'subtotal' => $quote['totals']['subtotal'],
                'tax_amount' => $quote['totals']['tax'],
                'shipping_amount' => $quote['totals']['shipping'],
                'discount_amount' => $quote['totals']['discount'],
                'platform_fee_amount' => $quote['totals']['platform_fee'],
                'total_amount' => $quote['totals']['total'],
                'currency' => self::CURRENCY,
                'payment_method_slug' => $validated['payment_method'],
                'payment_terms' => $method['name'],
                'shipping_terms' => 'Islandwide delivery',
                'delivery_terms' => 'Standard delivery',
                'status' => 'confirmed',
                'payment_status' => $validated['payment_method'] === 'card' ? 'paid' : 'pending',
                'fulfillment_status' => 'pending',
                'approval_status' => 'approved',
                'order_source' => 'buy_now',
                'checkout_customer' => $validated['customer'],
                'checkout_delivery_address' => $validated['delivery'],
                'confirmed_at' => now(),
                'expected_delivery_date' => now()->addDays(5)->toDateString(),
            ]);

            OrderItem::create([
                'uuid' => (string) Str::uuid(),
                'order_id' => $order->id,
                'product_id' => $product->id,
                'product_name' => $product->name,
                'quantity' => $quote['quantity'],
                'unit' => $product->unit ?: 'Item',
                'unit_price' => $quote['unit_price'],
                'amount' => $quote['totals']['subtotal'],
                'tax_amount' => 0,
                'discount_amount' => 0,
                'total_amount' => $quote['totals']['subtotal'],
                'metadata' => [
                    'slug' => $product->slug,
                    'image' => $product->featured_image,
                ],
            ]);

            $paymentMethod = PaymentMethod::firstOrCreate(
                ['slug' => $validated['payment_method']],
                [
                    'uuid' => (string) Str::uuid(),
                    'name' => $method['name'],
                    'provider' => 'SL Beauty Platform',
                    'method_type' => $method['type'],
                    'description' => $method['description'],
                    'requires_manual_review' => $method['manual'],
                    'status' => 'active',
                    'metadata' => [],
                ],
            );

            $payment = Payment::create([
                'uuid' => (string) Str::uuid(),
                'order_id' => $order->id,
                'payment_method_id' => $paymentMethod->id,
                'payer_user_id' => $request->user()->id,
                'payment_number' => $this->nextNumber(Payment::class, 'payment_number', 'PAY'),
                'amount' => $quote['totals']['total'],
                'fee_amount' => 0,
                'status' => $order->payment_status,
                'payment_status' => $order->payment_status,
                'gateway_reference' => $validated['payment_method'] === 'card' ? $this->nextNumber(PaymentTransaction::class, 'transaction_reference', 'TXN') : null,
                'paid_at' => $validated['payment_method'] === 'card' ? now() : null,
                'gateway_response' => $validated['payment_method'] === 'card'
                    ? ['message' => 'Demo payment approved by SL Beauty Platform.']
                    : null,
                'metadata' => [
                    'idempotency_key' => $validated['idempotency_key'] ?? null,
                ],
            ]);

            PaymentTransaction::create([
                'uuid' => (string) Str::uuid(),
                'payment_id' => $payment->id,
                'transaction_reference' => $payment->gateway_reference ?: $this->nextNumber(PaymentTransaction::class, 'transaction_reference', 'TXN'),
                'transaction_type' => 'checkout_confirmation',
                'amount' => $quote['totals']['total'],
                'status' => $order->payment_status,
                'gateway_status' => $validated['payment_method'] === 'card' ? 'approved' : 'manual_pending',
                'gateway_response' => null,
                'metadata' => ['payment_method' => $validated['payment_method']],
            ]);

            OrderStatusHistory::create([
                'order_id' => $order->id,
                'changed_by' => $request->user()->id,
                'previous_status' => null,
                'new_status' => $order->status,
                'notes' => $order->payment_status === 'paid'
                    ? 'Order confirmed and demo payment approved.'
                    : 'Order confirmed with offline payment pending.',
                'metadata' => ['source' => 'buy_now_checkout'],
            ]);

            OrderShipment::create([
                'uuid' => (string) Str::uuid(),
                'order_id' => $order->id,
                'shipment_number' => $this->nextNumber(OrderShipment::class, 'shipment_number', 'SHP'),
                'shipping_method' => 'Standard delivery',
                'estimated_ship_date' => now()->addDays(2)->toDateString(),
                'estimated_delivery_date' => now()->addDays(5)->toDateString(),
                'status' => 'pending',
                'metadata' => [],
            ]);

            return $order->fresh(['items.product', 'supplier', 'payments.method', 'statusHistories', 'shipments']);
        });

        return response()->json([
            'success' => true,
            'message' => 'Order created successfully.',
            'order' => $this->orderPayload($order),
        ], 201);
    }

    public function tracking(Request $request, string $reference): JsonResponse
    {
        $order = Order::query()
            ->accessibleTo($request->user())
            ->with(['items.product', 'supplier', 'payments.method', 'statusHistories', 'shipments'])
            ->where(function ($query) use ($reference) {
                $query->where('order_number', $reference);
                if (ctype_digit($reference)) {
                    $query->orWhere('id', (int) $reference);
                }
            })
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'order' => $this->orderPayload($order),
        ]);
    }

    public function retryPayment(Request $request, string $reference): JsonResponse
    {
        $order = Order::query()
            ->accessibleTo($request->user())
            ->with(['payments.method'])
            ->where(function ($query) use ($reference) {
                $query->where('order_number', $reference);
                if (ctype_digit($reference)) {
                    $query->orWhere('id', (int) $reference);
                }
            })
            ->firstOrFail();

        abort_if($order->payment_method_slug !== 'card', 422, 'Only card payments can be retried online.');
        abort_if(in_array($order->payment_status, ['paid', 'pending'], true), 422, 'This payment cannot be retried.');

        $payment = $order->payments()->latest()->first();
        abort_if(! $payment, 422, 'No payment record exists for this order.');

        $referenceNumber = $this->nextNumber(PaymentTransaction::class, 'transaction_reference', 'TXN');
        $payment->update([
            'status' => 'processing',
            'payment_status' => 'processing',
            'gateway_reference' => $referenceNumber,
        ]);
        $order->update(['payment_status' => 'processing']);

        PaymentTransaction::create([
            'uuid' => (string) Str::uuid(),
            'payment_id' => $payment->id,
            'transaction_reference' => $referenceNumber,
            'transaction_type' => 'payment_retry',
            'amount' => $payment->amount,
            'status' => 'processing',
            'gateway_status' => 'processing',
            'metadata' => ['requested_by' => $request->user()->id],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Payment retry has been submitted for processing.',
            'payment_status' => 'processing',
            'payment_reference' => $referenceNumber,
        ]);
    }

    private function validateCheckoutItem(Request $request): array
    {
        return $request->validate([
            'product_id' => ['nullable', 'integer'],
            'product_slug' => ['nullable', 'string', 'max:180'],
            'product_name' => ['nullable', 'string', 'max:255'],
            'product_image' => ['nullable', 'string', 'max:1000'],
            'category_slug' => ['nullable', 'string', 'max:180'],
            'category_name' => ['nullable', 'string', 'max:180'],
            'unit_price' => ['nullable', 'numeric', 'min:0', 'max:9999999'],
            'unit' => ['nullable', 'string', 'max:50'],
            'quantity' => ['required', 'integer', 'min:1', 'max:999'],
        ]);
    }

    private function findCheckoutProduct(array $payload): Product
    {
        abort_if(empty($payload['product_id']) && empty($payload['product_slug']) && empty($payload['product_name']), 422, 'A product id, slug, or name is required.');

        $baseQuery = fn () => Product::query()
            ->active()
            ->with('supplier');

        $product = null;

        if (! empty($payload['product_id'])) {
            $product = $baseQuery()->where('id', $payload['product_id'])->first();
        }

        if (! $product && ! empty($payload['product_slug'])) {
            $product = $baseQuery()->where('slug', $payload['product_slug'])->first();
        }

        if (! $product && ! empty($payload['product_name'])) {
            $product = $baseQuery()
                ->whereRaw('LOWER(name) = ?', [Str::lower($payload['product_name'])])
                ->first();
        }

        if (! $product) {
            $product = $this->createCatalogProductFromCheckout($payload);
        }

        if (! $product->supplier || $product->supplier->status !== 'active') {
            $product->forceFill(['supplier_id' => $this->platformSupplier()->id])->save();
            $product->load('supplier');
        }

        return $product;
    }

    private function createCatalogProductFromCheckout(array $payload): Product
    {
        $name = trim((string) ($payload['product_name'] ?? ''));
        abort_if($name === '', 422, 'This product is not available for checkout. Please refresh the product page and try again.');

        $slug = $payload['product_slug'] ?? Str::slug($name);
        $price = (float) ($payload['unit_price'] ?? 0);
        abort_if($price <= 0, 422, 'This product is missing a valid checkout price. Please refresh the product page and try again.');

        $category = Category::firstOrCreate(
            ['slug' => $payload['category_slug'] ?? 'sl-beauty-catalog'],
            [
                'name' => $payload['category_name'] ?? 'SL Beauty Catalog',
                'description' => 'SL Beauty platform checkout catalog.',
                'sort_order' => 100,
                'status' => 'active',
            ],
        );

        $supplier = $this->platformSupplier();

        return Product::updateOrCreate(
            ['slug' => $slug],
            [
                'category_id' => $category->id,
                'supplier_id' => $supplier->id,
                'name' => $name,
                'short_description' => "{$name} from the SL Beauty platform catalog.",
                'description' => "{$name} is available through the SL Beauty platform catalog checkout.",
                'price' => $price,
                'moq' => 1,
                'unit' => $payload['unit'] ?? 'Item',
                'supply_ability' => 'In stock for SL Beauty checkout',
                'lead_time' => '2-5 business days',
                'packaging_details' => 'Retail-ready beauty packaging.',
                'featured_image' => $payload['product_image'] ?? null,
                'status' => 'active',
                'is_featured' => true,
                'views_count' => 0,
            ],
        )->load('supplier');
    }

    private function buildQuote(Product $product, int $quantity): array
    {
        $minimum = max(1, (int) ceil((float) $product->moq));
        abort_if($quantity < $minimum, 422, "Minimum quantity is {$minimum}.");

        $unitCents = $this->toCents($product->price);
        $subtotal = $unitCents * $quantity;
        $tax = 0;
        $discount = 0;
        $platformFee = 0;
        $total = $subtotal + self::SHIPPING_AMOUNT + $tax + $platformFee - $discount;

        return [
            'product' => [
                'id' => $product->id,
                'slug' => $product->slug,
                'name' => $product->name,
                'image' => $product->featured_image,
                'brandName' => $product->supplier?->company_name,
                'sellerName' => $product->supplier?->company_name,
                'supplier' => [
                    'id' => $product->supplier?->id,
                    'name' => $product->supplier?->company_name,
                    'verified' => $product->supplier?->verification_status === 'verified',
                ],
                'unit' => $product->unit ?: 'Item',
                'minimum_quantity' => $minimum,
            ],
            'quantity' => $quantity,
            'currency' => self::CURRENCY,
            'unit_price' => $this->fromCents($unitCents),
            'totals' => [
                'subtotal' => $this->fromCents($subtotal),
                'shipping' => $this->fromCents(self::SHIPPING_AMOUNT),
                'tax' => $this->fromCents($tax),
                'discount' => $this->fromCents($discount),
                'platform_fee' => $this->fromCents($platformFee),
                'total' => $this->fromCents($total),
            ],
        ];
    }

    private function paymentMethod(string $slug): array
    {
        return self::PAYMENT_METHODS[$slug];
    }

    private function paymentMethodsPayload(): array
    {
        return collect(self::PAYMENT_METHODS)
            ->map(fn ($method, $slug) => [
                'id' => $slug,
                'title' => $method['name'],
                'description' => $method['description'],
                'requires_manual_review' => $method['manual'],
            ])
            ->values()
            ->all();
    }

    private function orderPayload(Order $order): array
    {
        $payment = $order->payments->sortByDesc('created_at')->first();
        $shipment = $order->shipments->sortByDesc('created_at')->first();

        return [
            'id' => $order->id,
            'uuid' => $order->uuid,
            'order_number' => $order->order_number,
            'status' => $order->status,
            'payment_status' => $order->payment_status,
            'fulfillment_status' => $order->fulfillment_status,
            'currency' => $order->currency,
            'subtotal' => $order->subtotal,
            'shipping_amount' => $order->shipping_amount,
            'tax_amount' => $order->tax_amount,
            'discount_amount' => $order->discount_amount,
            'platform_fee_amount' => $order->platform_fee_amount,
            'total_amount' => $order->total_amount,
            'payment_method' => $order->payment_method_slug,
            'payment' => $payment ? [
                'id' => $payment->id,
                'payment_number' => $payment->payment_number,
                'status' => $payment->status,
                'payment_status' => $payment->payment_status,
                'amount' => $payment->amount,
                'method' => $payment->method?->name,
                'gateway_reference' => $payment->gateway_reference,
            ] : null,
            'supplier' => [
                'id' => $order->supplier?->id,
                'name' => $order->supplier?->company_name,
                'verified' => $order->supplier?->verification_status === 'verified',
            ],
            'customer' => $order->checkout_customer,
            'delivery_address' => $order->checkout_delivery_address,
            'items' => $order->items->map(fn ($item) => [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'product_name' => $item->product_name,
                'quantity' => $item->quantity,
                'unit' => $item->unit,
                'unit_price' => $item->unit_price,
                'amount' => $item->amount,
                'total_amount' => $item->total_amount ?: $item->amount,
                'image' => $item->metadata['image'] ?? $item->product?->featured_image,
                'slug' => $item->metadata['slug'] ?? $item->product?->slug,
            ])->values(),
            'shipment' => $shipment ? [
                'shipment_number' => $shipment->shipment_number,
                'carrier' => $shipment->carrier,
                'tracking_number' => $shipment->tracking_number,
                'shipping_method' => $shipment->shipping_method,
                'status' => $shipment->status,
                'estimated_ship_date' => optional($shipment->estimated_ship_date)->toDateString(),
                'estimated_delivery_date' => optional($shipment->estimated_delivery_date)->toDateString(),
                'shipped_at' => optional($shipment->shipped_at)->toISOString(),
                'delivered_at' => optional($shipment->delivered_at)->toISOString(),
            ] : null,
            'timeline' => $this->timelinePayload($order),
            'created_at' => optional($order->created_at)->toISOString(),
            'confirmed_at' => optional($order->confirmed_at)->toISOString(),
            'expected_delivery_date' => optional($order->expected_delivery_date)->toDateString(),
            'tracking_url' => "/orders/{$order->id}/tracking",
        ];
    }

    private function timelinePayload(Order $order): array
    {
        $events = $order->statusHistories
            ->sortBy('created_at')
            ->map(fn (OrderStatusHistory $history) => [
                'key' => $history->new_status,
                'title' => Str::headline($history->new_status),
                'description' => $history->notes,
                'status' => 'complete',
                'timestamp' => optional($history->created_at)->toISOString(),
            ])
            ->values()
            ->all();

        if ($order->payment_status) {
            $events[] = [
                'key' => 'payment_'.$order->payment_status,
                'title' => 'Payment '.Str::headline($order->payment_status),
                'description' => $order->payment_status === 'paid'
                    ? 'Payment has been received.'
                    : 'Payment is not marked as paid yet.',
                'status' => in_array($order->payment_status, ['paid', 'processing'], true) ? 'complete' : 'current',
                'timestamp' => optional($order->updated_at)->toISOString(),
            ];
        }

        $shipment = $order->shipments->sortByDesc('created_at')->first();
        if ($shipment) {
            $events[] = [
                'key' => 'shipment_'.$shipment->status,
                'title' => 'Shipment '.Str::headline($shipment->status),
                'description' => $shipment->tracking_number
                    ? "Tracking number {$shipment->tracking_number}"
                    : 'Shipment is being prepared by the platform logistics flow.',
                'status' => $shipment->status === 'delivered' ? 'complete' : 'current',
                'timestamp' => optional($shipment->updated_at)->toISOString(),
            ];
        }

        return $events;
    }

    private function toCents(mixed $amount): int
    {
        return (int) round(((float) $amount) * 100);
    }

    private function fromCents(int $amount): string
    {
        return number_format($amount / 100, 2, '.', '');
    }

    private function platformSupplier(): Supplier
    {
        $user = User::firstOrCreate(
            ['email' => 'catalog@slbeauty.platform'],
            [
                'name' => 'SL Beauty Catalog',
                'password' => Str::random(32),
                'role' => 'supplier',
                'phone' => '+94000000000',
                'company_name' => 'SL Beauty Platform',
                'country' => 'Sri Lanka',
                'status' => 'active',
            ],
        );

        return Supplier::updateOrCreate(
            ['slug' => 'sl-beauty-platform-catalog'],
            [
                'user_id' => $user->id,
                'company_name' => 'SL Beauty Platform Catalog',
                'description' => 'Verified platform catalog supplier for SL Beauty public products.',
                'country' => 'Sri Lanka',
                'city' => 'Colombo',
                'address' => 'SL Beauty Platform',
                'phone' => '+94000000000',
                'email' => 'catalog@slbeauty.platform',
                'business_type' => 'Platform Catalog',
                'verification_status' => 'verified',
                'is_featured' => true,
                'rating' => 4.8,
                'status' => 'active',
            ],
        );
    }

    private function nextNumber(string $model, string $column, string $prefix): string
    {
        $year = now()->format('Y');
        $count = $model::query()->where($column, 'like', "{$prefix}-{$year}-%")->count() + 1;

        return "{$prefix}-{$year}-".str_pad((string) $count, 6, '0', STR_PAD_LEFT);
    }
}
