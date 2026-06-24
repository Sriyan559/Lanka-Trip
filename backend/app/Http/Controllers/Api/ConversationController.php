<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Message\StoreConversationRequest;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\RFQ;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ConversationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $conversations = Conversation::query()
            ->forParticipant($user)
            ->with([
                'buyer',
                'supplier',
                'latestMessage.sender',
                'latestMessage.receiver',
            ])
            ->withCount([
                'messages as unread_count' => fn ($query) => $query
                    ->where('receiver_id', $user->id)
                    ->where('is_read', false),
            ])
            ->orderByRaw('COALESCE(last_message_at, updated_at) DESC')
            ->orderByDesc('id')
            ->get();

        return $this->successResponse([
            'data' => $conversations
                ->map(fn (Conversation $conversation): array => ConversationResource::make($conversation)->resolve($request))
                ->values()
                ->all(),
        ]);
    }

    public function store(StoreConversationRequest $request): JsonResponse
    {
        abort_unless($request->user()->role === 'buyer', Response::HTTP_FORBIDDEN);

        $validated = $request->validated();
        $rfqId = $validated['rfq_id'] ?? null;

        if ($rfqId !== null) {
            RFQ::query()
                ->where('user_id', $request->user()->id)
                ->findOrFail($rfqId);
        }

        $conversation = Conversation::query()
            ->where('buyer_id', $request->user()->id)
            ->where('supplier_id', $validated['supplier_id'])
            ->when(
                $rfqId,
                fn ($query) => $query->where('rfq_id', $rfqId),
                fn ($query) => $query->whereNull('rfq_id'),
            )
            ->first();

        if (! $conversation) {
            $conversation = Conversation::create([
                'buyer_id' => $request->user()->id,
                'supplier_id' => $validated['supplier_id'],
                'rfq_id' => $rfqId,
            ]);
        }

        $conversation->load(['buyer', 'supplier', 'latestMessage.sender', 'latestMessage.receiver', 'rfq', 'quotation'])
            ->loadCount([
                'messages as unread_count' => fn ($query) => $query
                    ->where('receiver_id', $request->user()->id)
                    ->where('is_read', false),
            ]);

        return $this->successResponse([
            'conversation' => ConversationResource::make($conversation)->resolve($request),
        ], $conversation->wasRecentlyCreated
            ? 'Conversation created successfully.'
            : 'Conversation already exists.', $conversation->wasRecentlyCreated
                ? Response::HTTP_CREATED
                : Response::HTTP_OK);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $user = $request->user();

        $conversation = Conversation::query()
            ->forParticipant($user)
            ->with(['buyer', 'supplier', 'latestMessage.sender', 'latestMessage.receiver', 'rfq.items', 'quotation.items'])
            ->withCount([
                'messages as unread_count' => fn ($query) => $query
                    ->where('receiver_id', $user->id)
                    ->where('is_read', false),
            ])
            ->findOrFail($id);

        $messages = $conversation->messages()
            ->with(['sender', 'receiver'])
            ->latest()
            ->paginate(20)
            ->withQueryString();

        $pagination = $messages->toArray();
        unset($pagination['data']);

        return $this->successResponse([
            'conversation' => ConversationResource::make($conversation)->resolve($request),
            'messages' => collect($messages->items())
                ->map(fn ($message): array => MessageResource::make($message)->resolve($request))
                ->values()
                ->all(),
            'messages_pagination' => $pagination,
        ]);
    }
}
