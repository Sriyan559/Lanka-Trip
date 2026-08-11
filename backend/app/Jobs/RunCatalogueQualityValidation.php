<?php

namespace App\Jobs;

use App\Models\CatalogueQualityValidationRun;
use App\Services\Admin\CatalogueQualityRuleService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Throwable;

class RunCatalogueQualityValidation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 2;

    public int $timeout = 600;

    public function __construct(public int $validationRunId) {}

    public function handle(CatalogueQualityRuleService $rules): void
    {
        $rules->execute(CatalogueQualityValidationRun::findOrFail($this->validationRunId));
    }

    public function failed(?Throwable $exception): void
    {
        CatalogueQualityValidationRun::whereKey($this->validationRunId)->update(['status' => 'failed', 'failure_message' => 'Catalogue validation failed. Review protected server logs.', 'completed_at' => now()]);
    }
}
