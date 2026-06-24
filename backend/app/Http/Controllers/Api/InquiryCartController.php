<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cart\AddToCartRequest;
use App\Http\Requests\Cart\UpdateCartItemRequest;
use App\Http\Resources\InquiryCartResource;
use App\Models\InquiryCart;
use App\Models\InquiryCartItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class InquiryCartController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        return $this->cartResponse(
            InquiryCart::firstOrCreate(['user_id' => $request->user()->id]),
        );
    }

    public function store(AddToCartRequest $request): JsonResponse
    {
        $cart = DB::transaction(function () use ($request): InquiryCart {
            $cart = InquiryCart::firstOrCreate([
                'user_id' => $request->user()->id,
            ]);

            $item = $cart->items()
                ->where('product_id', $request->validated('product_id'))
                ->lockForUpdate()
                ->first();

            if ($item) {
                $updates = [
                    'quantity' => $item->quantity + $request->validated('quantity'),
                ];

                if ($request->has('note')) {
                    $updates['note'] = $request->validated('note');
                }

                $item->update($updates);
            } else {
                $cart->items()->create($request->validated());
            }

            return $cart;
        });

        return $this->cartResponse(
            $cart,
            'Product added to inquiry basket.',
            Response::HTTP_CREATED,
        );
    }

    public function update(UpdateCartItemRequest $request, int $id): JsonResponse
    {
        $cart = $this->userCart($request);
        $item = $this->cartItem($cart, $id);

        $item->update($request->validated());

        return $this->cartResponse($cart, 'Inquiry basket item updated.');
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $cart = $this->userCart($request);
        $item = $this->cartItem($cart, $id);

        $item->delete();

        return $this->cartResponse($cart, 'Inquiry basket item removed.');
    }

    public function clear(Request $request): JsonResponse
    {
        $cart = $this->userCart($request);
        $cart->items()->delete();

        return $this->cartResponse($cart, 'Inquiry basket cleared.');
    }

    private function userCart(Request $request): InquiryCart
    {
        return InquiryCart::firstOrCreate([
            'user_id' => $request->user()->id,
        ]);
    }

    private function cartItem(InquiryCart $cart, int $id): InquiryCartItem
    {
        return $cart->items()->whereKey($id)->firstOrFail();
    }

    private function cartResponse(
        InquiryCart $cart,
        ?string $message = null,
        int $status = Response::HTTP_OK,
    ): JsonResponse {
        $cart->load([
            'items' => fn ($query) => $query
                ->with(['product.supplier'])
                ->oldest(),
        ]);

        return $this->successResponse(
            InquiryCartResource::make($cart)->resolve(request()),
            $message,
            $status,
        );
    }
}
