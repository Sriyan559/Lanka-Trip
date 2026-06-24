<?php

namespace App\Policies;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;

class MessagePolicy
{
    public function send(User $user, Conversation $conversation): bool
    {
        return $conversation->hasParticipant($user);
    }

    public function view(User $user, Message $message): bool
    {
        return $message->conversation?->hasParticipant($user) ?? false;
    }

    public function markRead(User $user, Message $message): bool
    {
        return $this->view($user, $message) && $message->receiver_id === $user->id;
    }
}
