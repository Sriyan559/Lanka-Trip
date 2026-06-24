<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Wishlist\AddWishlistRequest;
use App\Http\Resources\WishlistResource;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WishlistController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return $this->wishlistResponse($request);
    }

    public function store(AddWishlistRequest $request): JsonResponse
    {
        $wishlist = Wishlist::firstOrCreate([
            'user_id' => $request->user()->id,
            'product_id' => $request->validated('product_id'),
        ]);

        $status = $wishlist->wasRecentlyCreated
            ? Response::HTTP_CREATED
            : Response::HTTP_OK;

        return $this->wishlistResponse(
            $request,
            $wishlist->wasRecentlyCreated
                ? 'Product added to wishlist.'
                : 'Product is already in the wishlist.',
            $status,
            $wishlist,
        );
    }

    public function destroy(Request $request, int $productId): JsonResponse
    {
        $deleted = Wishlist::query()
            ->where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->delete();

        return $this->wishlistResponse(
            $request,
            $deleted ? 'Product removed from wishlist.' : 'Product was not in the wishlist.',
        );
    }

    private function wishlistResponse(
        Request $request,
        ?string $message = null,
        int $status = Response::HTTP_OK,
        ?Wishlist $selectedItem = null,
    ): JsonResponse {
        $items = Wishlist::query()
            ->where('user_id', $request->user()->id)
            ->with(['product.supplier'])
            ->latest()
            ->get();

        $resourceItems = WishlistResource::collection($items)->resolve($request);

        $data = $items->map(function (Wishlist $wishlist): array {
            $product = $wishlist->product;

            return [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'featured_image' => $product->featured_image,
                'image' => $product->featured_image,
                'price' => (float) $product->price,
                'moq' => (float) $product->moq,
                'unit' => $product->unit,
                'moqUnit' => $product->unit,
                'supplier' => $product->supplier?->company_name,
                'wishlist_id' => $wishlist->id,
            ];
        })->values()->all();

        return $this->successResponse([
            'item' => $selectedItem
                ? WishlistResource::make(
                    $selectedItem->loadMissing('product.supplier'),
                )->resolve($request)
                : null,
            'items' => $resourceItems,
            'data' => $data,
            'items_count' => $items->count(),
        ], $message, $status);
    }
}
