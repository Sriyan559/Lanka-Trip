<?php

namespace App\Http\Resources;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Pagination\AbstractPaginator;
use Symfony\Component\HttpFoundation\Response;

class QuotationCollection extends ResourceCollection
{
    use ApiResponse;

    public $collects = QuotationResource::class;

    public function toResponse($request): Response
    {
        $data = [
            ...$this->additional,
            'data' => $this->collection
                ->map(fn (QuotationResource $quotation) => $quotation->resolve($request))
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
