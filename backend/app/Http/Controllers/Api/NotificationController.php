<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $paginator = $user->notifications()
            ->with('user:id,name,email,role')
            ->latest()
            ->orderByDesc('id')
            ->paginate(20)
            ->withQueryString();

        $pagination = $paginator->toArray();
        unset($pagination['data']);

        return $this->successResponse([
            'notifications' => NotificationResource::collection($paginator->getCollection())->resolve($request),
            'unread_count' => $user->notifications()->unread()->count(),
            ...$pagination,
        ]);
    }

    public function markRead(Request $request, int $id): JsonResponse
    {
        $notification = $request->user()
            ->notifications()
            ->findOrFail($id);

        $notification->update(['is_read' => true]);

        return $this->successResponse([
            'notification' => NotificationResource::make($notification->refresh())->resolve($request),
            'unread_count' => $request->user()->notifications()->unread()->count(),
        ]);
    }

    public function markAllRead(Request $request): JsonResponse
    {
        $updated = $request->user()
            ->notifications()
            ->unread()
            ->update(['is_read' => true]);

        return $this->successResponse([
            'updated_count' => $updated,
            'unread_count' => 0,
        ], 'All notifications marked as read.');
    }
}
