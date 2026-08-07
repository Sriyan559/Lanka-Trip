<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MarketplacePromotionsIndexRequest;
use App\Services\Admin\MarketplacePromotionService;

class MarketplacePromotionsController extends Controller
{
    public function __construct(private readonly MarketplacePromotionService $promotions) {}

    public function index(MarketplacePromotionsIndexRequest $request): array
    {
        return ['success' => true, 'data' => $this->promotions->index($request->filters())];
    }

    public function show(MarketplacePromotionsIndexRequest $request, int $promotion): never
    {
        abort(404, 'Promotion records are not available because the promotion domain has not been implemented.');
    }
}
