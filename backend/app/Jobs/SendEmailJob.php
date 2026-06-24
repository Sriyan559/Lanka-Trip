<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendEmailJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $to,
        public string $subject,
        public string $body,
    ) {
        $this->onQueue('emails');
    }

    public function handle(): void
    {
        Mail::raw($this->body, function ($message): void {
            $message->to($this->to)->subject($this->subject);
        });
    }
}
