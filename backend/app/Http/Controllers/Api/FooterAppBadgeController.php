<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FooterAppBadge;
use Illuminate\Http\JsonResponse;

class FooterAppBadgeController extends Controller
{
    public function index(): JsonResponse
    {
        $badges = FooterAppBadge::query()
            ->where('enabled', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (FooterAppBadge $badge) => [
                'platform' => $badge->platform,
                'label' => $badge->label,
                'imageUrl' => $badge->image_path,
                'imageAlt' => $badge->image_alt,
                'storeUrl' => $badge->store_url,
            ]);

        return $this->successResponse(['appBadges' => $badges]);
    }
}
