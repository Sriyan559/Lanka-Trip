<?php

namespace App\Http\Resources;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Pagination\AbstractPaginator;
use Symfony\Component\HttpFoundation\Response;

class ProductCollection extends ResourceCollection
{
    use ApiResponse;

    public $collects = ProductResource::class;

    public function toResponse($request): Response
    {
        $data = [
            ...$this->additional,
            'data' => $this->collection
                ->map(fn (ProductResource $product) => $product->resolve($request))
                ->values()
                ->all(),
        ];

        if ($this->resource instanceof AbstractPaginator) {
            $pagination = $this->resource->toArray();
            unset($pagination['data']);

            $data = [...$data, ...$pagination];
        }

        return $this->successResponse($data);
    }
}
