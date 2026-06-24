<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendNotificationJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public int $userId,
        public string $type,
        public string $title,
        public string $message,
        public ?string $referenceType = null,
        public ?int $referenceId = null,
    ) {
        $this->onQueue('notifications');
    }

    public function handle(): void
    {
        User::query()->find($this->userId)?->notifyUser(
            $this->type,
            $this->title,
            $this->message,
            $this->referenceType,
            $this->referenceId,
        );
    }
}
