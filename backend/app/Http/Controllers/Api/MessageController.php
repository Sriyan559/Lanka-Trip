<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Message\StoreMessageRequest;
use App\Http\Resources\MessageResource;
use App\Jobs\SendNotificationJob;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class MessageController extends Controller
{
    public function store(StoreMessageRequest $request): JsonResponse
    {
        $conversation = Conversation::query()
            ->with(['buyer', 'supplier.user'])
            ->findOrFail($request->integer('conversation_id'));

        Gate::authorize('send', [Message::class, $conversation]);

        $message = DB::transaction(function () use ($conversation, $request): Message {
            $receiver = $conversation->receiverFor($request->user());

            $message = $conversation->messages()->create([
                'sender_id' => $request->user()->id,
                'receiver_id' => $receiver->id,
                'message' => $request->validated('message'),
                'is_read' => false,
            ]);

            $conversation->update(['last_message_at' => $message->created_at]);

            return $message;
        });

        SendNotificationJob::dispatch(
            $message->receiver_id,
            'new_message',
            'New message received',
            $request->user()->name.' sent you a message: '.Str::limit($message->message, 120),
            'message',
            $message->id,
        )->afterCommit();

        $message->load(['sender', 'receiver']);

        return $this->successResponse(
            MessageResource::make($message)->resolve($request),
            status: Response::HTTP_CREATED,
        );
    }

    public function markRead(Request $request, int $id): JsonResponse
    {
        $message = Message::query()
            ->with(['sender', 'receiver', 'conversation.supplier'])
            ->findOrFail($id);

        Gate::authorize('markRead', $message);

        $message->update(['is_read' => true]);

        return $this->successResponse(
            MessageResource::make($message->refresh()->load(['sender', 'receiver']))->resolve($request),
        );
    }
}
