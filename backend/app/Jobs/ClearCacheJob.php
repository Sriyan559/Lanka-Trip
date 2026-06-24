<?php

namespace App\Jobs;

use App\Support\CacheKeys;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ClearCacheJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public array $groups)
    {
        $this->onQueue('default');
    }

    public function handle(): void
    {
        CacheKeys::invalidate($this->groups);
    }
}
